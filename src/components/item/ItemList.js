import React from 'react';
import {Link} from 'react-router';

import ContentBlock from 'material-ui/svg-icons/content/block';
import ImageEdit from 'material-ui/svg-icons/image/edit';

import ActionDone from 'material-ui/svg-icons/action/done';
import {blueA700, red500, greenA700} from 'material-ui/styles/colors';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

//import ItemListRow from './ItemListRow';

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
                            <TableHeaderColumn>Code</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Stock</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map(item => 
                            <TableRow key={item._id} >
                                <TableRowColumn>{item.code} , {item._id}</TableRowColumn>
                                <TableRowColumn>{item.name}</TableRowColumn>
                                <TableRowColumn>{item.stock}</TableRowColumn>
                                <TableRowColumn>{item.status ? <ActionDone color={greenA700} /> : <ContentBlock color={red500} />}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'item/'+item._id+'/edit'}> <ImageEdit color={blueA700} /></Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default ItemList;