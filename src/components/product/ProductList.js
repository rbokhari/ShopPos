import React from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import ProductListRow from './ProductListRow';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const ProductList = ({products}) => {

    return (
        <Card style={cardStyle} >
            <CardHeader title="Product " subtitle="Listing" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Category</TableHeaderColumn>
                            <TableHeaderColumn>Price</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map(product =>
                            <TableRow key={product._id} >
                                <TableRowColumn>{product.name}</TableRowColumn>
                                <TableRowColumn>{product.categoryName}</TableRowColumn>
                                <TableRowColumn>{product.price}</TableRowColumn>
                                <TableRowColumn>{product.status}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'product/'+product._id+'/edit'}> Edit</Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default ProductList;