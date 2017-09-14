import React from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';

import { USER_ROLE } from '../../../shared/constants';
import { Icons } from '../theme';
import BusyIndicator from '../common/BusyIndicator';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};


const DayList = ({days, user, onPrintDay}) => {
    return (
        <Card style={cardStyle} >
            <CardHeader title="Days " subtitle="Listing" />
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Start</TableHeaderColumn>
                            <TableHeaderColumn>Close</TableHeaderColumn>
                            {user && (user.roleId === USER_ROLE.ADMIN) && <TableHeaderColumn>M.Sale</TableHeaderColumn>}
                            {user && (user.roleId === USER_ROLE.ADMIN) && <TableHeaderColumn>E.Sale</TableHeaderColumn>}
                            {user && (user.roleId === USER_ROLE.ADMIN) && <TableHeaderColumn>Net Sale</TableHeaderColumn>}
                            {user && (user.roleId === USER_ROLE.ADMIN) && <TableHeaderColumn>Expense</TableHeaderColumn>}
                            {user && (user.roleId === USER_ROLE.ADMIN) && <TableHeaderColumn>Purchase</TableHeaderColumn>}
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {days && days.length == 0 && <TableRow key={0} ><TableRowColumn colSpan='8'><BusyIndicator /></TableRowColumn></TableRow>}
                        {days && days.map( (day, index) =>
                            <TableRow key={index}>
                                <TableRowColumn>
                                    {Moment(day.today).format('DD/MM/YYYY, h:mm a')} 
                                </TableRowColumn>
                                <TableRowColumn>
                                    {day.status == 0 ? 'Active ' :  Moment(day.close).format('DD/MM/YYYY, h:mm a')} 
                                </TableRowColumn>
                                {user && (user.roleId === USER_ROLE.ADMIN) && <TableRowColumn>{day.morningSale && day.morningSale.toFixed(3)}</TableRowColumn>}
                                {user && (user.roleId === USER_ROLE.ADMIN) && <TableRowColumn>{day.eveningSale && day.eveningSale.toFixed(3)}</TableRowColumn>}
                                {user && (user.roleId === USER_ROLE.ADMIN) && <TableRowColumn>{day.netSale && day.netSale.toFixed(3)}</TableRowColumn>}
                                {user && (user.roleId === USER_ROLE.ADMIN) && <TableRowColumn>{day.netExpense && day.netExpense.toFixed(3)}</TableRowColumn>}
                                {user && (user.roleId === USER_ROLE.ADMIN) && <TableRowColumn>{day.netPurchase && day.netPurchase.toFixed(3)}</TableRowColumn>}
                                <TableRowColumn>
                                    {day.status == 1 && <IconButton onClick={onPrintDay.bind(this, day._id)}>
                                        <Icons.ActionPrint />
                                    </IconButton>}
                                    <IconButton>
                                        <Icons.PersonPin />
                                    </IconButton>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default DayList;