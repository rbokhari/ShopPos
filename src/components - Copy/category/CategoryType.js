import React, { Component } from 'react';
import { Link } from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const cardHeight = 400;

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
  flexGrow: 1
};

const fabStyle = {
    marginTop: -10,
    marginLeft: '100px'
}

class CategoryType extends Component {

    render() {
        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} linkButton containerElement={<Link to="itemnew" />}>
                    <ContentAdd />
                </FloatingActionButton>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0', height:cardHeight}} >
                    <CardHeader title="Category " subtitle="Types" />
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Type Name</TableHeaderColumn>
                                    <TableHeaderColumn>Status</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableRowColumn>Burger</TableRowColumn>
                                    <TableRowColumn>active</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>Sauce</TableRowColumn>
                                    <TableRowColumn>active</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>                
                </Card>
            </div>
        );
    }

}

export default CategoryType;