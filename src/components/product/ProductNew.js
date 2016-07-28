import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import ProductForm from './ProductForm';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class ProductNew extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            product: Object.assign({}, this.props.product),
            categories: this.props.categories,
            errors: {}
        };

        this.updateProductState = this.updateProductState.bind(this);
        this.updateProductCategory = this.updateProductCategory.bind(this);
        this.updateProductStatus = this.updateProductStatus.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.product._id != nextProps.product._id) {
            this.setState({product: Object.assign({}. nextProps.product)});
        }
    }

    updateProductState(event) {
        const field = event.target.name;
        const product = this.state.product;
        product[field] = event.target.value;
        this.setState({
            product: product
        });
    }

    updateProductCategory(event, index, value) {
        const product = this.state.product;
        product.categoryId = value;
        this.setState({
            product: product
        });
    }

    updateProductStatus(event, value) {
        const product = this.state.product;
        product.status = value;
        this.setState({
            product: product
        });
    }

    saveProduct(event) {
        event.preventDefault();
        //console.log(`new value is ${this.state.item}`);
        const product = this.state.product;
        this.props.createProduct(this.state.product);
        // if (product._id) {
        //     this.props.createProduct(this.state.product);
        // }else {
        //     this.props.createProduct(this.state.product);
        // }
        this.context.router.push('/product');
    }

    render() {
        return (
            <ProductForm onChange={this.updateProductState} onSelectChange={this.updateProductCategory} onCheckCheck={this.updateProductStatus} onSave={this.saveProduct}
                product={this.state.product} categories={this.state.categories} errors={this.state.errors} />
        );
    }

}

ProductNew.propTypes = {
    product: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    createProduct: PropTypes.func.isRequired
}

// Pull in the React Router context so router is available on this.context.router
ProductNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getProductById(products, id) {
    const product = products.filter(product => product._id == id);
    if (product) return product[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const productId = ownProps.params.id;

    let categories = [];
    let product = {
        companyId:'', officeId:'', code: '', name: '', nameAr: '', categoryId: '', price: 0, status: 1
    };

    if (productId && state.products.length > 0 ) {
        product = getProductById(state.products, productId);
    }

    return {
        product: product,
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProduct: bindActionCreators(actions.createProduct, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductNew);
