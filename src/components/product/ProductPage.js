import React, { Component, PropTypes } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import ProductList from './ProductList';
import { PRODUCT_TYPE, PRODUCT_TYPE_LABEL } from '../../../shared/constants';

const fabStyle = {
    marginTop: 10,
    marginLeft: '90%'
}

class ProductPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.props.loadProducts();
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.branch.branchId !== localStorage.getItem('officeId')) {
        //     this.props.loadProducts();
        // }
    }

    getCategoryNameById(id) {
    }

    getTypeName(value) {
        if (value == PRODUCT_TYPE.KITCHEN) {
            return PRODUCT_TYPE_LABEL.KITCHEN;
        } else if (value == PRODUCT_TYPE.DIRECT) {
            return PRODUCT_TYPE_LABEL.DIRECT;
        }
        return '';
    }

    render() {
        const {products} = this.props;

        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} containerElement={<Link to="/product/new" />}>
                    <ContentAdd />
                </FloatingActionButton>
                <ProductList products={products} showName={this.getTypeName} />
            </div>
        );
    }
}

ProductPage.propTypes = {
    products: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return { 
        products: state.products,
        branch: state.branch.current,
        categories: state.categories 
    };
}

export default connect(mapStateToProps, actions)(ProductPage);