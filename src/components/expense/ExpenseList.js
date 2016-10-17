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

const ExpenseList = ({expenses}) => {
    return (
        <Card style={cardStyle} >
            <CardHeader title="Expense " subtitle="Listing" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Amount</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.map( expense =>
                            <TableRow key={expense._id}>
                                <TableRowColumn>
                                    {Moment(expense.created).format('DD/MM/YYYY')}
                                </TableRowColumn>
                                <TableRowColumn>{expense.amount}</TableRowColumn>
                                <TableRowColumn>{expense.description}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'/expense/'+expense._id+'/edit'}> <ImageEdit color={blueA700} /></Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default ExpenseList;