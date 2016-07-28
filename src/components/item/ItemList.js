import React from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import ItemListRow from './ItemListRow';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const ItemList = ({items}) => {
    return (
        <Card style={cardStyle} >
            <CardHeader title="Item " subtitle="Listing" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Stock</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map(item => 
                            <TableRow key={item._id} >
                                <TableRowColumn>{item.name}</TableRowColumn>
                                <TableRowColumn>{item.stock}</TableRowColumn>
                                <TableRowColumn>{item.status}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'item/'+item._id+'/edit'}> Edit</Link>&nbsp;&nbsp;
                                    <Link to={'item/'+item._id+'/stock'}> Add Stock</Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default ItemList;