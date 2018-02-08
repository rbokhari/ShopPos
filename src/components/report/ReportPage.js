import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FindReplace from 'material-ui/svg-icons/action/find-replace';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import CustomerTransactionReport from './CustomerTransactionReport';
import ExpenseTransactionReport from './ExpenseTransactionReport';
import PurchaseTransactionReport from './PurchaseTransactionReport';
import ExpenseDetailReport from './ExpenseDetailReport';

import { loadPurchaseItemTransaction } from '../../actions';

class ReportPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isBusy: false,
            fromDate: new Date(),
            toDate: new Date()
        };

        this.handleFromDate = this.handleFromDate.bind(this);
        this.handleToDate = this.handleToDate.bind(this);
        this.handlePurchaseItemReport = this.handlePurchaseItemReport.bind(this);
    }

    handleFromDate(event, date) {
        // const { report } = this.props;
        // report.fromDate = date;
        this.setState({ fromDate : date });
    }

    handleToDate(event, date) {
        // const { report } = this.props;
        // report.toDate = date;
        this.setState({ toDate : date });
    }

    handleCategoryChange(event, index, value) {
        const product = this.props.product;
        product.categoryId = value;
        this.setState({
            product: product
        });
    }

    handlePurchaseItemReport() {
        const { loadPurchaseItemTransaction } = this.props;
        loadPurchaseItemTransaction(this.state.fromDate, this.state.toDate)
            .then(res => console.info('report data', res));
    }

    render() {
        const { categories, items, loadPurchaseItemTransaction } = this.props;

        return (
            <div>
                <CustomerTransactionReport></CustomerTransactionReport>
                <ExpenseTransactionReport></ExpenseTransactionReport>
                <PurchaseTransactionReport></PurchaseTransactionReport>
                <ExpenseDetailReport></ExpenseDetailReport>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} width={200} >
                    <CardHeader title="Reports" subtitle="" showExpandableButton={false} />
                    <CardText expandable={false}>
                        <div style={{display: 'flex', flexFlow: 'col wrap'}}>
                            <div style={{flex: 2}}>
                                <DatePicker name='fromDate' floatingLabelText="From Date" autoOk={true} 
                                    container="inline" mode="landscape" onChange={this.handleFromDate} style={{display: 'inline-block'}} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <DatePicker name='toDate' floatingLabelText="To Date" autoOk={true} 
                                    container="inline" mode="landscape" onChange={this.handleToDate} style={{display: 'inline-block'}} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <SelectField name='categoryId' floatingLabelText="Category" onChange={this.handleCategoryChange.bind(this)}  >
                                    {categories.map(category=>
                                        <MenuItem key={category._id} value={category._id} primaryText={category.name} />
                                    )}
                                </SelectField>
                                <SelectField name='itemId' hintText="select item" underlineShow={false}>
                                    {items.map(item=>
                                        <MenuItem key={item._id} value={item._id} primaryText={item.name} />
                                    )}
                                </SelectField>
                                <RaisedButton type='button' disabled={this.state.isBusy} 
                                    icon={<FindReplace />} label='Item wise Sales Report' secondary={true} onClick={this.handlePurchaseItemReport} />
                            </div>
                        </div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let categories = [];
    return {
        categories: state.categories,
        items: []
        //initialValues: product
    };
}

//export default ReportPage;
export default connect(mapStateToProps, { loadPurchaseItemTransaction } )(ReportPage);
//export default connect(mapStateToProps, mapDispatchToProps)(Report);