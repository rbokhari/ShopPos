import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ArrowUp from 'material-ui/svg-icons/image/exposure-plus-1';
import ArrowDown from 'material-ui/svg-icons/image/exposure-neg-1';


import * as actions from '../../actions';

import CategoryGrid from '../category/CategoryGrid';
import ProductGrid from '../product/ProductGrid';

// class CustomerItems extends Component {

//     constructor(props, context) {
//         super(props, context);

//         this.state = {
//             items: [],
//             errors: {}
//         };
        
//     }

//     componentWillReceiveProps(nextProps) {
//         console.log("customerItems Log from componentWillReceiveProps", nextProps);
//         this.setState({ items: nextProps.items });
//     }
const CustomerItems = ( { products, onHandleIncrease, onHandleDecrease, onHandleDelete, errors } ) => {
    
        return (
            <Table height={'400px'} fixedHeader={true} fixedFooter={true} style={{ width: 750 }} selectable={false}>
                <TableHeader  displaySelectAll={false} multiSelectable={false} enableSelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={{width: 5}}>Sr</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 200}}>Name</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 100}}>Category</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 50}}>QTY</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 50}}>Price</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 150}}>Action</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {products.map((item, index) =>
                        <TableRow key={index} >
                            <TableRowColumn style={{width: 5}}>{index+1}</TableRowColumn>
                            <TableRowColumn style={{width: 200}}>{item.productName}</TableRowColumn>
                            <TableRowColumn style={{width: 100}}>{item.categoryName}</TableRowColumn>
                            <TableRowColumn style={{width: 50}}>
                                <Badge badgeContent={item.qty} secondary={true} style={{marginTop: 10}} />
                            </TableRowColumn>
                            <TableRowColumn style={{width: 50}}>{item.price}</TableRowColumn>
                            <TableRowColumn style={{width: 150}}>
                                <IconButton onClick={onHandleDelete.bind(this, index)}><ActionDelete /></IconButton>
                                <IconButton onClick={onHandleIncrease.bind(this, index)}><ArrowUp color={greenA200} /></IconButton>
                                <IconButton onClick={onHandleDecrease.bind(this, index)}><ArrowDown color={red500} /></IconButton>
                            </TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableRowColumn colSpan="6" style={{textAlign: 'center'}}>
                            Total Bill
                        </TableRowColumn>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    
}

CustomerItems.propTypes = {
    products: React.PropTypes.array.isRequired,
    errors: React.PropTypes.object,
    onHandleIncrease: React.PropTypes.func.isRequired,
    onHandleDecrease: React.PropTypes.func.isRequired,
    onHandleDelete: React.PropTypes.func.isRequired
};

export default CustomerItems;
