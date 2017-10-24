import React from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';

import { CUSTOMER_STATUS } from '../../../shared/constants';
import { Icons } from '../theme';
import BusyIndicator from '../common/BusyIndicator';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};


const CustomerList = ({customers, day, onPrintCustomer}) => {
    if (typeof day === 'undefined') return (<div>Loading...</div>);
    return (
        <Card style={cardStyle}>
            <CardHeader title={`Customers of Day : ${Moment(day.today).format('DD/MM/YYYY, h:mm a')}`} subtitle="Listing" />
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Bill No</TableHeaderColumn>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Car No</TableHeaderColumn>
                            <TableHeaderColumn>Mobile</TableHeaderColumn>
                            <TableHeaderColumn>Items</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {customers.length == 0 && <TableRow key={0} ><TableRowColumn colSpan='8'><BusyIndicator /></TableRowColumn></TableRow>}
                        {customers.map( (customer, index) =>
                            <TableRow key={index}>
                                <TableRowColumn>
                                    {customer.billNo}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {Moment(customer.created).format('DD/MM/YYYY, h:mm a')} 
                                </TableRowColumn>
                                <TableRowColumn>{customer.carNumber}</TableRowColumn>
                                <TableRowColumn>{customer.mobileNumber}</TableRowColumn>
                                <TableRowColumn>{customer.products.length}</TableRowColumn>
                                <TableRowColumn>{customer.status == CUSTOMER_STATUS.DELIVERED ? 'DELIVERED' : ''}</TableRowColumn>
                                <TableRowColumn>
                                    {customer.status == 3 && <IconButton onClick={onPrintCustomer.bind(this, customer._id)} tooltip='Print Customer'>
                                        <Icons.ActionPrint />
                                    </IconButton>}
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default CustomerList;