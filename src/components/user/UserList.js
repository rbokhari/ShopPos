import React from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import ActionNotInterested from 'material-ui/svg-icons/av/not-interested';
import ActionDone from 'material-ui/svg-icons/action/done';
import {red500, greenA700} from 'material-ui/styles/colors';

//import CategoryListRow from './CategoryListRow';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const UserList = ({users}) => {
    return (
        <Card style={cardStyle} >
            <CardHeader title="Users " subtitle="Listing" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Branch</TableHeaderColumn>
                            <TableHeaderColumn>Role</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map( user =>
                            <TableRow key={user.id}>
                                <TableRowColumn>{user.email}</TableRowColumn>
                                <TableRowColumn>{user.branch ? user.branch.name : ''}</TableRowColumn>
                                <TableRowColumn>{user.roleId}</TableRowColumn>
                                <TableRowColumn>{user.status ? <ActionDone color={greenA700} /> : <ActionNotInterested color={red500} />}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'category/'+user._id+'/edit'}> Edit</Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default UserList;