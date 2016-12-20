import React from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import ContentBlock from 'material-ui/svg-icons/content/block';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import {blueA700, red500, greenA700} from 'material-ui/styles/colors';

import ActionNotInterested from 'material-ui/svg-icons/av/not-interested';
import ActionDone from 'material-ui/svg-icons/action/done';

//import CategoryListRow from './CategoryListRow';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const SupplierList = ({suppliers}) => {
    return (
        <Card style={cardStyle} >
            <CardHeader title="Supplier " subtitle="Listing" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Person</TableHeaderColumn>
                            <TableHeaderColumn>Contact</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {suppliers.map( supplier =>
                            <TableRow key={supplier._id}>
                                <TableRowColumn>{supplier.name}</TableRowColumn>
                                <TableRowColumn>{supplier.person}</TableRowColumn>
                                <TableRowColumn>{supplier.contact}</TableRowColumn>
                                <TableRowColumn>{supplier.status ? <ActionDone color={greenA700} /> : <ActionNotInterested color={red500} />}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'/supplier/'+supplier._id+'/edit'}> <ImageEdit color={blueA700} /></Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default SupplierList;