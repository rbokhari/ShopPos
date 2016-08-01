import React from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const PurchaseList = ({purchases}) => {
    return (
        <Card style={cardStyle} >
            <CardHeader title="Purchase Order " subtitle="Listing" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Bill No</TableHeaderColumn>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Total</TableHeaderColumn>
                            <TableHeaderColumn>Notes</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {purchases.map(purchase => 
                            <TableRow key={purchase._id} >
                                <TableRowColumn>{purchase.billNo}</TableRowColumn>
                                <TableRowColumn>{purchase.billDate}</TableRowColumn>
                                <TableRowColumn>{purchase.total}</TableRowColumn>
                                <TableRowColumn>{purchase.notes}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'purchase/'+purchase._id+'/edit'}> Edit</Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

PurchaseList.propTypes = {
    purchases: React.PropTypes.array.isRequired
}

export default PurchaseList;