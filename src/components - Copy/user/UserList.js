import React from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import ActionNotInterested from 'material-ui/svg-icons/av/not-interested';
import ActionDone from 'material-ui/svg-icons/action/done';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import {blueA700, red500, greenA700} from 'material-ui/styles/colors';

import { USER_ROLE, USER_ROLE_LABEL } from '../../../shared/constants';

//import CategoryListRow from './CategoryListRow';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const roleName = (id) => {
    if (USER_ROLE.ADMIN == id){
        return USER_ROLE_LABEL.ADMIN;
    }else if (USER_ROLE.BRANCH_MANAGER == id) {
        return USER_ROLE_LABEL.BRANCH_MANAGER;
    }else if (USER_ROLE.BRANCH_SALES_PERSON == id) {
        return USER_ROLE_LABEL.BRANCH_SALES_PERSON;
    }
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
                                <TableRowColumn>{roleName(user.roleId)}</TableRowColumn>
                                <TableRowColumn>{user.status ? <ActionDone color={greenA700} /> : <ActionNotInterested color={red500} />}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'users/'+user.id+'/edit'}> <ImageEdit color={blueA700} /></Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

export default UserList;