import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import StockForm from './StockForm';

class StockNew extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            //stock: Object.assign({}, this.props.stock),
            errors: {}
        };

        this.props.loadItems();
        this.props.loadSuppliers();

        this.updateStockState = this.updateStockState.bind(this);
        this.onUpdateStockItem = this.onUpdateStockItem.bind(this);
        this.onUpdateStockQty = this.onUpdateStockQty.bind(this);
        this.saveStock = this.saveStock.bind(this);
        this.onAddNewItem = this.onAddNewItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.onUpdateSupplier = this.onUpdateSupplier.bind(this);
        this.onUpdateStockPrice = this.onUpdateStockPrice.bind(this);
        this.onUpdateBillDate = this.onUpdateBillDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.branch.current.branchId !== localStorage.getItem('officeId')) {
        //     this.props.loadItems();
        // }
    }

    updateStockState(event) {
        const field = event.target.name;
        const stock = this.props.stock;
        stock[field] = event.target.value;
        this.setState({
            stock: stock
        });
    }

    onUpdateSupplier(event, index, value) {
        const stock = this.props.stock;
        stock.supplierId = value;
        this.setState({
            stock: stock
        });
    }

    onUpdateBillDate(event, index, value) {
        const stock = this.props.stock;
        stock.billDate = value;
        this.setState({
            stock: stock
        });
    }

    onUpdateStockItem(row, event, index, value) {
        const stock = this.props.stock;
        stock.items[row].itemId = value;
        this.setState({
            stock: stock
        });
    }

    onUpdateStockQty(row, event) {
        const stock = this.props.stock;
        stock.items[row].qty = event.target.value;
        this.setState({
            stock: stock
        });
    }

    onUpdateStockPrice(row, event) {
        const stock = this.props.stock;
        stock.items[row].price = event.target.value;
        this.setState({
            stock: stock
        });
    }

    onAddNewItem(event) {
        const stock = this.props.stock;
        stock.items.push({
            itemId: '',
            qty: 0
        });
        this.setState({ stock: stock });
    }

    onRemoveItem(index, event) {
        const stock = this.props.stock;
        stock.items.splice(index, 1);
        this.setState({ stock: stock });
    }

    saveStock(event) {
        event.preventDefault();
        this.props.createPurchaseOrder(this.props.stock)
            .then(res => {
                this.context.router.push('/purchase');
            });
        
        //this.context.router.push('/item');
    }

    render() {
        return (
            <StockForm onChange={this.updateStockState} onSave={this.saveStock} onBillDateChange={this.onUpdateBillDate}
                onAddStock={this.onAddNewItem} onRemoveStock={this.onRemoveItem} onUpdateSupplier={this.onUpdateSupplier}
                onItemSelect={this.onUpdateStockItem} onQuantityChange={this.onUpdateStockQty} onStockPriceChange={this.onUpdateStockPrice}
                stock={this.props.stock} items={this.props.items} suppliers={this.props.suppliers} errors={this.state.errors} />
        );
    }

}

StockNew.propTypes = {
    stock: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired
}

// Pull in the React Router context so router is available on this.context.router
StockNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getStockById(stocks, id) {
    const stock = stocks.filter(stock => stock._id == id);
    if (stock) return stock[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const stockId = ownProps.params.id;

    let stock = {
        billNo: '', 
        billDate: '',
        amount: 0,
        notes: '', 
        items: [{
            itemId: '',
            qty: 0,
            price: 0
        }]
    };
    if (stockId && state.purchaseOrders.length > 0 ) {
        stock = getStockById(state.purchaseOrders, stockId);
    }
    return {
        day: stock.day,
        stock: stock,
        items: state.items,
        suppliers: state.suppliers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createPurchaseOrder: bindActionCreators(actions.createPurchaseOrder, dispatch),
        loadItems: bindActionCreators(actions.loadItems, dispatch),
        loadSuppliers: bindActionCreators(actions.loadSuppliers, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockNew);
//export default reduxForm(formConfig, mapStateToProps, mapDispatchToProps)(StockNew);

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: first is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps