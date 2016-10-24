import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

import { createProduct, loadItems, loadCategories } from '../../actions';

import renderItems from './ProductItems';
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

        this.props.loadItems();
        this.props.loadCategories();

        this.state = {
            // product: Object.assign({}, this.props.product),
            // categories: this.props.categories,
            // items: this.props.items,
            errors: {}
        };

        this.updateProductState = this.updateProductState.bind(this);
        this.updateProductCategory = this.updateProductCategory.bind(this);
        this.updateProductStatus = this.updateProductStatus.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.onUpdateProductItem = this.onUpdateProductItem.bind(this);
        this.onUpdateProductQty = this.onUpdateProductQty.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.product._id != nextProps.product._id) {
        //     this.setState({product: Object.assign({}. nextProps.product)});
        // }
    }

    updateProductState(event) {
        const field = event.target.name;
        const product = this.props.product;
        product[field] = event.target.value;
        this.setState({
            product: product
        });
    }

    updateProductCategory(event, index, value) {
        const product = this.props.product;
        product.categoryId = value;
        this.setState({
            product: product
        });
    }

    updateProductStatus(event, value) {
        const product = this.props.product;
        product.status = value;
        this.setState({
            product: product
        });
    }

    onUpdateProductItem(row, event, index, value) {
        const product = this.props.product;
        product.items[row].itemId = value;
        this.setState({
            product: product
        });
    }

    onUpdateProductQty(row, event) {
        const product = this.props.product;
        product.items[row].qty = event.target.value;
        this.setState({
            product: product
        });
    }

    addItem(event) {
        const product = this.props.product;
        console.info(product);
        product.items.push({
            itemId: '',
            qty: 0
        });
        this.setState({ product: product });
    }

    removeItem(index, value) {
        const product = this.props.product;
        product.items.splice(index, 1);
        this.setState({ product: product });
    }

    saveProduct(props) {
        //console.log(`new value is ${this.state.item}`);
        const product = this.props.product;
        this.props.createProduct(this.state.product)
            .then(()=> {
                this.context.router.push('/product');
            }, (error) => {
                console.error("Product", error);
            });
        // if (product._id) {
        //     this.props.createProduct(this.state.product);
        // }else {
        //     this.props.createProduct(this.state.product);
        // }
        
    }

    render() {
        //const {handleSubmit, fields: { _id, code, name, nameAr, description, categoryId, price, status, items }, categories }  = this.props;

        return (
            // <form onSubmit={handleSubmit(this.saveProduct.bind(this))}>
            //     <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
            //         <CardHeader title="Product" subtitle={_id.value == '0' ? 'Add New' : 'Edit'} />
            //         <CardText>
            //             <div>
            //                 <TextField name='code' floatingLabelText="Product Code" {...code} />
            //             </div>
            //             <div>
            //                 <TextField name='name' floatingLabelText="Product Name" {...name} />
            //             </div>
            //                 <TextField name='nameAr' floatingLabelText="Name Arabic" {...nameAr} />
            //             <div>
            //                 <SelectField name='categoryId' floatingLabelText="Category" {...categoryId} >
            //                 {categories.map(category=>
            //                     <MenuItem key={category._id} value={category._id} primaryText={category.name} />
            //                 )}
            //                 </SelectField>
            //             </div>
            //             <div>
            //                 <TextField name='price' floatingLabelText="Price" {...price} />
            //             </div>
            //             <Checkbox label="Status" {...status} checked={status.value} onCheck={(e, checked) => status.onChange(checked)} style={styles.checkbox}  />
            //             <h4>Items</h4>
            //             <button type='button' onClick={()=> push('items', {})}>Add</button>
                        
            //         </CardText>
            //         <CardActions>
            //             <FlatButton type='submit' label={'Save'} primary={true} ></FlatButton>
            //             <FlatButton label="Cancel" linkButton containerElement={<Link to="/product" />} />
            //         </CardActions>
            //     </Card>
            // </form>  

            <ProductForm onChange={this.updateProductState} onSelectChange={this.updateProductCategory} 
                    onCheckCheck={this.updateProductStatus} onSave={this.saveProduct}
                    onItemSelect={this.onUpdateProductItem} onUpdateProductQty={this.onUpdateProductQty}
                    onItemRemove={this.removeItem} onItemAdd={this.addItem}
                product={this.props.product} categories={this.props.categories} items={this.props.items} errors={this.state.errors} />
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

function validateForm(props) {

}

function mapStateToProps(state, ownProps) {
    const productId = ownProps.params.id;

    let categories = [];
    let items = [];
    let product = {
        _id: '0', 
        code: '', 
        name: '', 
        nameAr: '', 
        price: 0, 
        status: true, 
        categoryId: 0,
        items: [
            { 
                itemId: '', 
                qty: 0
            }
        ]
    };

    if (productId && state.products.length > 0 ) {
        product = getProductById(state.products, productId);
    }
    return {
        product: product,
        categories: state.categories,
        items: state.items,
        //initialValues: product
    };
}

// export default reduxForm({
//     form: 'product',
//     fields: ['_id', 'code', 'name', 'nameAr', 'description', 'price', 'status', 'items' ],
//     validate: validateForm
// }, mapStateToProps, { createProduct: createProduct } )(ProductNew);


function mapDispatchToProps(dispatch) {
     return {
         createProduct: bindActionCreators(createProduct, dispatch),
         loadItems: bindActionCreators(loadItems, dispatch),
         loadCategories: bindActionCreators(loadCategories, dispatch)
     };
}

 export default connect(mapStateToProps, mapDispatchToProps )(ProductNew);
