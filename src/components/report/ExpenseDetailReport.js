import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FindReplace from 'material-ui/svg-icons/action/find-replace';
import DatePicker from 'material-ui/DatePicker';

import Moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadExpenseDetailDownload, successNotification, errorNotification } from '../../actions';
//import * as actions from '../../actions';

class ExpenseDetailReport extends Component {

    constructor(props, context) {
        super(props, context);

        //this.getData = this.getData.bind(this);
        this.handleFromDate = this.handleFromDate.bind(this);
        this.handleToDate = this.handleToDate.bind(this);
    }

    componentWillMount() {
        //this.props.report.fromDate = new Date();
        //this.props.report.toDate = new Date();
    }

    handleFromDate(event, date) {
        const { report } = this.props;
        report.fromDate = date;
    }

    handleToDate(event, date) {
        const { report } = this.props;
        report.toDate = date;
    }

    getData() {
        const { report, loadExpenseDetailDownload, successNotification, errorNotification } = this.props;
        report.fromDate.setHours(0,0,0);
        report.toDate.setHours(23,59,0);
        loadExpenseDetailDownload(report.fromDate, report.toDate)
            .then(res => {
                //console.info('data', res);
                successNotification('File Created Successfully !');
                // let blob = new Blob([res.data], { type:   'application/xlsx' } );
                // let link = document.createElement('a');
                // link.href = window.URL.createObjectURL(blob);
                // link.download = 'Report.xlsx';
                // link.click();
                // var blob = new Blob([data.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                // console.log('blob length', blob.length);
                // var csvURL = window.URL.createObjectURL(blob);
                // var tempLink = document.createElement('a');
                // tempLink.href = csvURL;
                // tempLink.setAttribute('download', 'filename.xlsx');
                // tempLink.click();
                // var blob = new Blob([data.data], {type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                // var downloadUrl = URL.createObjectURL(blob);
                // var a = document.createElement("a");
                // a.href = downloadUrl;
                // a.download = "data.xls";
                // document.body.appendChild(a);
                // a.click();
            })
            .catch( error => {
                console.info("error", error);
                errorNotification('Something went wrong !');
            });
    }

    render() {
        return (            
            <form>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} width={200} >
                    <CardHeader title="Expense Detail" subtitle="Excel Download" showExpandableButton={true} />
                    <CardText expandable={true}>
                        <div>
                            <DatePicker name='fromDate' floatingLabelText="From Date" autoOk={true} defaultDate={this.props.report.fromDate} 
                                mode="landscape" onChange={this.handleFromDate} style={{display: 'inline-block'}} />
                            <DatePicker name='toDate' floatingLabelText="To Date" autoOk={true} defaultDate={this.props.report.toDate} 
                                mode="landscape" onChange={this.handleToDate} style={{display: 'inline-block'}} minDate={this.props.report.fromDate} />
                            <RaisedButton type='button' icon={<FindReplace />} label='Generate Excel' secondary={true} onClick={this.getData.bind(this)} />
                        </div>
                    </CardText>
                </Card>
            </form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let report = {
        fromDate: new Date(), // Moment().format('DD/MM/YYYY'),
        toDate: new Date() // Moment().format('DD/MM/YYYY')
    };

    return {
        report: report,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadExpenseDetailDownload: bindActionCreators(loadExpenseDetailDownload, dispatch),
        successNotification: bindActionCreators(successNotification, dispatch), 
        errorNotification: bindActionCreators(errorNotification, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDetailReport);