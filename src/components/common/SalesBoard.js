import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import * as actions from '../../actions';

import CategoryGrid from '../category/CategoryGrid';
import ProductGrid from '../product/ProductGrid';
import CustomerItems from './CustomerItems';
import CustomerForm from './CustomerForm';

class SalesBoard extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            // categories: this.props.categories,
            // products: this.props.products,
            filterProducts: [],
            //customerProducts: [],
            customer: {
                carNumber: '',
                mobileNumber: '',
                status: 0,
                products: []   
            },
            errors: {}
        };
        
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.handleProductSelect = this.handleProductSelect.bind(this);
        this.handleIncreaseQty = this.handleIncreaseQty.bind(this);
        this.handleDecreaseQty = this.handleDecreaseQty.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);  
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
    }

    initialize() {
        if (this.props.categories) {
            const category = this.props.categories[0];
            //console.log(category[0]);
            //this.filterProducts(category._id);
        }
    }

    clearCustomer() {
        const customer = {
            carNumber: '',
            mobileNumber: '',
            status: 0,
            products: [] 
        };
        this.setState({ customer: customer });
    }

    handleCategorySelect(id) {
        //console.info(id);
        this.filterProducts(id);
    }

    handleIncreaseQty(index) {
        const customer = this.state.customer;
        customer.products[index].qty +=1;
        this.setState({ customer: customer });
    }

    handleDecreaseQty(index) {
        var customer = this.state.customer;
        customer.products[index].qty -=1;
        if (customer.products[index].qty == 0){
            customer.products = customer.products.splice(index, 1);
        }
        this.setState({ customer: customer });
    }

    handleDeleteItem(index) {
        console.log(index);
        const beforeItems = this.state.customer.products;
        console.log("before",beforeItems);
        const afterItems = beforeItems.splice(index, 1);
        console.log("after", afterItems);
        this.setState({ customer: afterItems });
    }

    handleProductSelect(id, productName, categoryId, categoryName, qty, price) {
        //const itemsCount = this.state.customerItems.length;
        const product = {
            //id: itemsCount + 1,
            productId: id,
            productName: productName,
            categoryId: categoryId,
            categoryName: categoryName,
            qty: qty,
            price: price
        };
        const customer = this.state.customer;

        customer.products = [...this.state.customer.products, product];
        this.setState({ customer: customer });
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
        this.props.createCustomer( this.state.customer );
        this.clearCustomer();
    }

    handleCustomerFormCancel() {
        this.clearCustomer();
    }

    render() {
        return (
            <div>
                <div style={{
                        display: 'flex',
                        flexFlow: 'row wrap'   
                    }}>
                    <Card style={{
                            flexGrow: 1,
                        }} >
                        <CardHeader title="Customer"  />
                        
                        <CustomerItems products={this.state.customer.products} 
                            onHandleIncrease={this.handleIncreaseQty} onHandleDecrease={this.handleDecreaseQty} onHandleDelete={this.handleDeleteItem}
                            errors={this.state.errors} />

                    </Card>
                    <Card style={{
                            flexGrow: 1,
                            marginLeft: 10
                        }} >
                        <CardHeader title="Categories"  />

                        <CategoryGrid categories={this.props.categories} 
                            loading={false} errors={this.state.errors}
                            onCategorySelect={this.handleCategorySelect} />
                        
                        <Divider />

                        <ProductGrid products={this.state.filterProducts} 
                            loading={false} errors={this.state.errors}
                            onProductSelect={this.handleProductSelect} />
                            
                    </Card>
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
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createCustomer: bindActionCreators(actions.createCustomer, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesBoard);
