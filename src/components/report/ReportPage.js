import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Print from 'material-ui/svg-icons/action/print';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem, makeSelectable} from 'material-ui/List';

import CustomerTransactionReport from './CustomerTransactionReport';
import ExpenseTransactionReport from './ExpenseTransactionReport';
import PurchaseTransactionReport from './PurchaseTransactionReport';
import ExpenseDetailReport from './ExpenseDetailReport';

import { loadPurchaseItemTransaction, loadCustomerTransactionByProductAndDate, loadProducts } from '../../actions';

class ReportPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isBusy: false,
            fromDate: new Date(),
            toDate: new Date(),
            reportIndex: 1,
            productId: 0,
            itemId: 0
        };

        this.handleFromDate = this.handleFromDate.bind(this);
        this.handleToDate = this.handleToDate.bind(this);
        this.handlePurchaseItemReport = this.handlePurchaseItemReport.bind(this);
        this.handleProductId = this.handleProductId.bind(this);
        this.handleItemId = this.handleItemId.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    componentDidMount() {
        this.props.loadProducts();
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

    handleProductId(event, index, value) {
        this.setState({ productId: value });
    }
    
    handleItemId(event, index, value) {
        this.setState({ itemId: value });
    }

    handleCategoryChange(event, index, value) {
        const product = this.props.product;
        product.categoryId = value;
        this.setState({
            product: product
        });
    }

    handlePurchaseItemReport() {
        console.info(this.state);
        // const { loadPurchaseItemTransaction } = this.props;
        // loadPurchaseItemTransaction(this.state.fromDate, this.state.toDate)
        //     .then(res => console.info('report data', res));
    }

    handleListClick(index) {
        this.setState({ reportIndex: index});
    }

    render() {
        const { items, products } = this.props;

        const selectedClassName = "backgroundColor: 'gray'";

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
                            <div style={{flex: 1, marginRight: 50}}>
                                <List>
                                    <ListItem primaryText="Customer Transaction" leftIcon={<Print />} onClick={this.handleListClick} className={ (this.state.reportIndex == 1 ? selectedClassName : '') } />
                                    <ListItem primaryText="Expense Transaction" leftIcon={<Print />} onClick={this.handleListClick} />
                                    <ListItem primaryText="Purchase Order" leftIcon={<Print />} onClick={this.handleListClick} />
                                    <ListItem primaryText="Item Wise Purchase" leftIcon={<Print />} onClick={this.handleListClick} />
                                    <ListItem primaryText="Product Wise Sale" leftIcon={<Print />} onClick={this.handleListClick} />
                                    <ListItem primaryText="Detail Excel" leftIcon={<Print />} onClick={this.handleListClick} />
                                </List>
                            </div>
                            <div style={{flex: 1}}>
                                <DatePicker name='fromDate' floatingLabelText="From Date" autoOk={true} 
                                    container="inline" mode="landscape" onChange={this.handleFromDate} style={{display: 'inline-block'}} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <DatePicker name='toDate' floatingLabelText="To Date" autoOk={true} 
                                    container="inline" mode="landscape" onChange={this.handleToDate} style={{display: 'inline-block'}} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <SelectField name='itemId' floatingLabelText="Item" underlineShow={true} value={this.state.itemId} onChange={this.handleItemId}>
                                    {items.map(item=>
                                        <MenuItem key={item._id} value={item._id} primaryText={item.name} />
                                    )}
                                </SelectField>
                                    &nbsp;&nbsp;
                                <SelectField name='productId' floatingLabelText="Product" underlineShow={true} value={this.state.productId} onChange={this.handleProductId}>
                                    {products && products.map(product=>
                                        <MenuItem key={product._id} value={product._id} primaryText={product.name} />
                                    )}
                                </SelectField>
                                &nbsp;&nbsp;
                                <RaisedButton type='button' disabled={this.state.isBusy} 
                                    icon={<Print />} label='Show Report' secondary={true} onClick={this.handlePurchaseItemReport} />
                            </div>
                            <div style={{flex: 4}}>
                                <iframe id='output' ref='out1' style={{ width: '100%', height: '100%'}}></iframe>
                            </div>
                        </div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        items: [],
        products: state.products.sort(p=>p.name)
        //initialValues: product
    };
}

//export default ReportPage;
export default connect(mapStateToProps, { loadPurchaseItemTransaction, loadProducts } )(ReportPage);
//export default connect(mapStateToProps, mapDispatchToProps)(Report);