import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as actions from '../../actions';

import CategoryGrid from '../category/CategoryGrid';
import CategoryAddOnGrid from '../category/CategoryAddOnGrid';
import ProductGrid from '../product/ProductGrid';
import CustomerItems from './CustomerItems';
import CustomerForm from './CustomerForm';
import CustomerAddonSelected from './CustomerSelectedAddon';
import { PRODUCT_TYPE, PRODUCT_TYPE_LABEL } from '../../../shared/constants';

class SalesBoard extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            // categories: this.props.categories,
            // products: this.props.products,
            filterProducts: [],
            snakbarStatus: false,
            openNote: false,
            openQuantity: false,
            itemIndexNote: -1,
            itemIndexQty: -1,
            isCustom: false,
            categoryId: '0',
            //customerProducts: [],
            customer: {
                carNumber: '',
                mobileNumber: '',
                option: '1',
                status: 0,
                total: 0,
                products: []   
            },
            errors: {}
        };

        this.props.loadCategories();
        this.props.loadProducts();
        
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.handleProductSelect = this.handleProductSelect.bind(this);
        this.handleIncreaseQty = this.handleIncreaseQty.bind(this);
        this.handleDecreaseQty = this.handleDecreaseQty.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);  
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleOpenQuantity = this.handleOpenQuantity.bind(this);
        this.handleCloseQuantity = this.handleCloseQuantity.bind(this);
        this.handleKeyQuantity = this.handleKeyQuantity.bind(this);
        this.handleCloseNote = this.handleCloseNote.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleAddOnAdd = this.handleAddOnAdd.bind(this);
        this.handleAddOnDelete = this.handleAddOnDelete.bind(this);

        //this.calculateTotal = this.calculateTotal.bind(this);
        this.handleCustomerFormChange = this.handleCustomerFormChange.bind(this);
        this.handleCustomerFormSubmit = this.handleCustomerFormSubmit.bind(this);
        this.handleCustomerFormCancel = this.handleCustomerFormCancel.bind(this);

    }

    filterProducts(id) {
        var filter = this.props.products.filter(function(product, i) {
            return product.categoryId === id;
        });
        this.setState({ filterProducts: filter });
    }

    componentWillReceiveProps(nextProps) {
        this.initialize();
        // if (this.props.branch.branchId !== localStorage.getItem('officeId')) {
        //     this.props.loadCategories();
        //     this.props.loadProducts();
        // }        
    }

    initialize() {
        if (this.props.categories) {
            const category = this.props.categories[0];
            //this.filterProducts(category._id);
        }
    }

    clearCustomer() {
        const customer = {
            carNumber: '',
            mobileNumber: '',
            option: '1',
            status: 0,
            total: 0,
            products: [] 
        };
        this.setState({ 
            customer: customer, 
            itemIndexNote: -1, 
            itemIndexQty: -1,
            categoryId: '0' 
        });
    }

    calculateTotal() {
        const items = this.state.customer.products;
        var total = 0;
        _.each(items, (item, index) => {
            total += parseFloat(item.price);
            _.each(item.addons, (addon, index) => {
                total += parseFloat(addon.price);
            });
        });
        var customer = this.state.customer;
        customer.total = parseFloat(Math.round(total * 100) / 100).toFixed(3);
        this.setState({ customer: customer });
    }

    handleCategorySelect(id) {
        this.filterProducts(id);
    }

    handleIncreaseQty(index) {
        const customer = this.state.customer;
        customer.products[index].qty +=1;
        customer.products[index].price = parseFloat((customer.products[index].qty * customer.products[index].unitPrice)*100/100).toFixed(3) ;
        this.setState({ customer: customer });
        this.calculateTotal();
    }

    handleDecreaseQty(index) {
        var customer = this.state.customer;
        customer.products[index].qty -=1;
        customer.products[index].price = customer.products[index].qty * customer.products[index].unitPrice;
        if (customer.products[index].qty === 0) {
            customer.products.splice(index, 1);
        }
        this.setState({ customer: customer });
        this.calculateTotal();
    }

    handleDeleteItem(index) {
        const beforeItems = this.state.customer;
        beforeItems.products.splice(index, 1);
        this.setState({ customer: beforeItems });
        this.calculateTotal();
    }

    handleRowSelection(data) {
        const catId = data.length > 0 ? this.state.customer.products[data[0]].categoryId : '0';
        this.setState({ 
            itemIndexNote: data.length > 0 ? data[0] : -1,
            categoryId: catId
        });
    }

    handleAddOnAdd(id, name, price) {
        const customer = this.state.customer;
        const index = this.state.itemIndexNote;
        const addon = {
            _id: id,
            name: name,
            price: price
        };
        customer.products[index].addons = [...customer.products[index].addons, addon];
        this.setState({ customer: customer});
        this.calculateTotal();
    }

    handleAddOnDelete(id) {
        const customer = this.state.customer;
        const productIndex = this.state.itemIndexNote;
        customer.products[productIndex].addons.splice(id, 1);
        this.setState({ customer: customer });
        this.calculateTotal();
    }

    handleOpenQuantity(index) {
        this.setState({ 
            openQuantity: true,
            itemIndexQty: index
        });
    }

    handleCloseQuantity() {
        const qty = this.refs.tQuantity;
        const customer = this.state.customer;
        
        customer.products[this.state.itemIndexQty].qty = qty.value;
        customer.products[this.state.itemIndexQty].price = customer.products[this.state.itemIndexQty].unitPrice * qty.value;
        this.setState({ 
            openQuantity: false,
            itemIndexQty: -1,
            customer: customer
        });
        this.calculateTotal();
    }

    handleKeyQuantity(event) {
        if (event.key == 'Enter') {
            this.handleCloseQuantity();
        }
    }

    handleAddNote(index) {
        this.setState({
            openNote: true,
            itemIndexNote: index
        });
        const cust = this.state.customer;
        if (cust.products[index].note !== '') {
            const note = this.refs.tNote;
            console.error('note', note);
            //note.value = cust.products[index].note;
        }
    }

    handleCloseNote() {
        const note = this.refs.tNote;
        const beforeItems = this.state.customer;
        beforeItems.products[this.state.itemIndexNote].note = note.value;
        this.setState({
            openNote: false,
            itemIndexNote: -1,
            customer: beforeItems
        });
    }

    handleProductSelect(id, productName, categoryId, categoryName, qty, price, type, items) {
        //const itemsCount = this.state.customerItems.length;
        const product = {
            //id: itemsCount + 1,
            productId: id,
            productName: productName,
            categoryId: categoryId,
            categoryName: categoryName,
            qty: qty,
            unitPrice: price,
            price: price,
            type: type,
            note: '',
            addons: [],
            items: items
        };
        const customer = this.state.customer;
        customer.products = [...this.state.customer.products, product];
        this.setState({ customer: customer });
        this.calculateTotal();
    }

    handleCustomerFormChange(event) {
        const field = event.target.name;
        const customer = this.state.customer;
        customer[field] = event.target.value;
        this.setState({
            customer: customer
        });
    }

    handleCustomerFormSubmit() {
        var customer = this.state.customer;
        this.props.createCustomer( customer )
            .then(res => {
                this.setState({
                    snakbarStatus: true
                });
                this.clearCustomer();
            }, err => {
                console.error(err);
            });
    }

    handleCustomerFormCancel() {
        this.clearCustomer();
    }

    render() {
        const actions = [
            <FlatButton label="OK" primary={true} onTouchTap={this.handleCloseNote} />,
            <FlatButton label="Cancel" primary={false} onTouchTap={()=> this.setState({ openNote: false})} />
        ];
         const actionsQuantity = [
            <FlatButton label="OK" primary={true} onTouchTap={this.handleCloseQuantity} />,
            <FlatButton label="Cancel" primary={false} onTouchTap={()=> this.setState({ openQuantity: false})} />
        ];

        return (
            <div id="dSalesboard" style={{width: '100%'}}>
                <div style={{
                        //width: '100%',
                        display: 'flex',
                        flexFlow: 'row wrap'
                    }}>
                    <Card style={{
                            flex: 3,
                        }} >
                        <CardHeader title="Customer Order" style={{fontStyle: 'italic', fontWeight: 'bold', color: 'blue'}}/>
                        
                        <CustomerItems products={this.state.customer.products} totalBill={this.state.customer.total} rowSelectIndex={this.state.itemIndexNote}
                            onHandleIncrease={this.handleIncreaseQty} onHandleDecrease={this.handleDecreaseQty} onHandleDelete={this.handleDeleteItem}
                            onHandleNote={this.handleAddNote} onHandleRowSelection={this.handleRowSelection} onHandleQuantity={this.handleOpenQuantity} 
                            errors={this.state.errors} />

                        <Dialog
                            title="Add Customization" actions={actions} onRequestClose={this.handleCloseNote}
                            modal={true} open={this.state.openNote}
                            autoScrollBodyContent={true} >

                                <textarea ref='tNote' style={{}} rows={3}></textarea>
                        </Dialog>
                        <Dialog
                            title="Quantity" actions={actionsQuantity} onRequestClose={this.handleCloseQuantity}
                            modal={true} open={this.state.openQuantity}
                            autoScrollBodyContent={true} contentStyle={{width:250, maxWidth:'none'}}>

                                <input type="text" ref='tQuantity' style={{margin:5, fontSize: 18, width: 50}} onKeyDown={this.handleKeyQuantity} autoFocus />
                        </Dialog>
                    </Card>
                    <Card style={{
                            //flexGrow: 1,
                            marginLeft: 10,
                            //width: 450,
                            //minWidth: 300,
                            flex: 2,
                            display: this.state.itemIndexNote > -1 ? 'none' : 'block'
                        }} >
                        <CardHeader title="Menu" style={{fontStyle: 'italic', fontWeight: 'bold', color: 'blue'}}> 
                            
                        </CardHeader>

                        <CategoryGrid categories={this.props.categories} 
                            loading={false} errors={this.state.errors}
                            onCategorySelect={this.handleCategorySelect} />
                        
                        <Divider />

                        <ProductGrid products={this.state.filterProducts} 
                            loading={false} errors={this.state.errors}
                            onProductSelect={this.handleProductSelect} />
                            
                    </Card>

                    <div style={{
                            //flexGrow: 1,
                            flex: 2,
                            display:'block',
                            marginLeft: 10,
                            //width: 400,
                            //minWidth: 300,
                            display: this.state.itemIndexNote > -1 ? 'block' : 'none'
                        }}>
                            <Card style={{height: 290}}>
                                <CardHeader title="Add On" style={{fontStyle: 'bold'}} style={{fontStyle: 'italic', fontWeight: 'bold', color: 'blue'}}> 
                                </CardHeader>

                                <CategoryAddOnGrid categories={this.props.categories} loading={false} errors={this.state.errors}
                                    onAddOnSelect={this.handleAddOnAdd} categoryId={this.state.categoryId} />

                            </Card>
                            <br />
                            <Card style={{height: 250}}>
                                <CardHeader title="Selected AddOns" style={{fontStyle: 'italic', fontWeight: 'bold', color: 'blue'}}> 
                                </CardHeader>

                                <CustomerAddonSelected customer={this.state.customer} productIndex={this.state.itemIndexNote}
                                    onAddOnDelete={this.handleAddOnDelete} />
                            </Card>

                    </div>
                    
                    <Snackbar open={this.state.snakbarStatus}
                        message="New Customer Added !"
                        autoHideDuration={2000}
                        onRequestClose={()=> this.setState({snakbarStatus: false})} />
                </div>
                <CustomerForm customer={this.state.customer} 
                    onChange={this.handleCustomerFormChange} 
                    onSubmit={this.handleCustomerFormSubmit}
                    onCancel={this.handleCustomerFormCancel} />

            </div>
        );
    }
}

SalesBoard.propTypes = {
    // categories: React.PropTypes.array.isRequired,
    // products: React.PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        products: state.products,
        categories: state.categories,
        branch: state.branch.current,
        //openNote: false
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createCustomer: bindActionCreators(actions.createCustomer, dispatch),
        loadCategories: bindActionCreators(actions.loadCategories, dispatch),
        loadProducts: bindActionCreators(actions.loadProducts, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesBoard);
