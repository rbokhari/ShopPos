import React from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import CategoryListRow from './CategoryListRow';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const CategoryList = ({categories}) => {
    return (
        <Card style={cardStyle} >
            <CardHeader title="Category " subtitle="Listing" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map( category =>
                            <TableRow key={category._id}>
                                <TableRowColumn>{category.name}</TableRowColumn>
                                <TableRowColumn>{category.status}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'category/'+category._id+'/edit'}> Edit</Link>&nbsp;&nbsp;
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default CategoryList;