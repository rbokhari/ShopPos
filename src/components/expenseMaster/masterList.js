import React from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import ContentBlock from 'material-ui/svg-icons/content/block';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import {blueA700, red500, greenA700} from 'material-ui/styles/colors';

import ActionNotInterested from 'material-ui/svg-icons/av/not-interested';
import ActionDone from 'material-ui/svg-icons/action/done';

import Moment from 'moment';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const ExpenseMasterList = ({masters}) => {
    return (
        <Card style={cardStyle} >
            <CardHeader title="Expense Master " subtitle="Listing" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>SN.</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {masters.map( (master,i) =>
                            <TableRow key={i}>
                                <TableRowColumn>{i+1}</TableRowColumn>
                                <TableRowColumn>{master.name}</TableRowColumn>
                                <TableRowColumn>{master.description}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'/expensemaster/'+ master._id+'/edit'}> <ImageEdit color={blueA700} /></Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default ExpenseMasterList;