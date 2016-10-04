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
                                <TableRowColumn>{category.status ? <ActionDone color={greenA700} /> : <ActionNotInterested color={red500} />}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'/category/'+category._id+'/edit'}> <ImageEdit color={blueA700} /></Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default CategoryList;