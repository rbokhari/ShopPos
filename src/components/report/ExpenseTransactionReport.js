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
import { loadExpenseTransaction } from '../../actions';
//import * as actions from '../../actions';

class ExpenseTransactionReport extends Component {

    constructor(props, context) {
        super(props, context);

        //this.getData = this.getData.bind(this);
        this.getAmount = this.getAmount.bind(this);
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
        const { report } = this.props;
        report.fromDate.setHours(0,0,0);
        report.toDate.setHours(23,59,0);
        this.props.loadExpenseTransaction(report.fromDate, report.toDate);
            // .then(data => {
            //     console.info(data);
            // })
            // .catch( error => {
            //     console.info("error", error);
            // });
    }

    getAmount(products) {
        let amount = 0;
        products.map((product, i) => {
            amount += product.price;
        });
        return amount;
    }

    render() {
        return (
            
            <form>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} width={200} >
                    <CardHeader title="Expense" subtitle="Transaction" showExpandableButton={true} />
                    <CardText expandable={true}>
                        <div>
                            <DatePicker name='fromDate' floatingLabelText="From Date" autoOk={true} defaultDate={this.props.report.fromDate} 
                                mode="landscape" onChange={this.handleFromDate} style={{display: 'inline-block'}} />
                            <DatePicker name='toDate' floatingLabelText="To Date" autoOk={true} defaultDate={this.props.report.toDate} 
                                mode="landscape" onChange={this.handleToDate} style={{display: 'inline-block'}} minDate={this.props.report.fromDate} />
                            <RaisedButton type='button' icon={<FindReplace />} label='Search' secondary={true} onClick={this.getData.bind(this)} />
                        </div>
                        <h3>Expenses</h3>
                        <Table height={'400px'} fixedHeader={true} fixedFooter={true} style={{ width: 1000 }} selectable={false}>
                            <TableHeader displaySelectAll={false} multiSelectable={false} enableSelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn style={{width: 5}}>Sr.</TableHeaderColumn>
                                    <TableHeaderColumn>Code</TableHeaderColumn>
                                    <TableHeaderColumn>Date</TableHeaderColumn>
                                    <TableHeaderColumn>Category</TableHeaderColumn>
                                    <TableHeaderColumn>Amount</TableHeaderColumn>
                                    <TableHeaderColumn>Description</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody  displayRowCheckbox={false}>
                                {this.props.expenses && this.props.expenses.map((expense, i) =>
                                    <TableRow key={i} >
                                        <TableRowColumn style={{width: 5}}>
                                            {i+1}
                                        </TableRowColumn>
                                        <TableRowColumn style={{width: 20}}>{expense.code}</TableRowColumn>
                                        <TableRowColumn>
                                            {Moment(expense.created).format('DD/MM/YYYY')}
                                        </TableRowColumn>
                                        <TableRowColumn>{expense.categoryName}</TableRowColumn>
                                        <TableRowColumn>{expense.amount}</TableRowColumn>
                                        <TableRowColumn>{expense.description}</TableRowColumn>
                                    </TableRow>
                                )}
                                
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn>Total : </TableRowColumn>
                                    <TableRowColumn>{this.props.amount}</TableRowColumn>
                                </TableRow>
                            </TableFooter>
                    </Table>
                    </CardText>
                </Card>
            </form>
        );
    }
}

function getTotalPrice(expenses = []) {
    let amount = 0;
    if (typeof expenses !== undefined) {
        expenses.map((expense, i) => {
            amount += expense.amount;
        });
    }
    return amount;
}


function mapStateToProps(state, ownProps) {
    let report = {
        fromDate: new Date(), // Moment().format('DD/MM/YYYY'),
        toDate: new Date() // Moment().format('DD/MM/YYYY')
    };

    return {
        report: report,
        expenses: state.reportExpenseData,
        amount: getTotalPrice(state.reportExpenseData)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadExpenseTransaction: bindActionCreators(loadExpenseTransaction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTransactionReport);