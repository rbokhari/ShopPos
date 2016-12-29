import React from 'react';
import {Link} from 'react-router';

import Moment from 'moment';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import {blueA700, red500, greenA700} from 'material-ui/styles/colors';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const PurchaseList = ({purchases, suppliers}) => {

    const supplierName = (supplierId) => {
        const data = suppliers.filter((supplier, i) => {
            return supplier._id === supplierId;
        });
        return data.length > 0 ? data[0].name : '-';
    };

    return (
        <Card style={cardStyle} >
            <CardHeader title="Purchase Order " subtitle="Listing" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Bill No</TableHeaderColumn>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Supplier</TableHeaderColumn>
                            <TableHeaderColumn>Total</TableHeaderColumn>
                            <TableHeaderColumn>Notes</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {purchases.map(purchase => 
                            <TableRow key={purchase._id} >
                                <TableRowColumn>{purchase.billNo}</TableRowColumn>
                                <TableRowColumn>
                                    {Moment(purchase.created).format('DD/MM/YYYY')}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {supplierName(purchase.supplierId)}
                                </TableRowColumn>
                                <TableRowColumn>{purchase.total}</TableRowColumn>
                                <TableRowColumn>{purchase.notes}</TableRowColumn>
                                <TableRowColumn>
                                    <Link to={'purchase/'+purchase._id+'/edit'}> <ImageEdit color={blueA700} /></Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
        </Card>
    );
}

PurchaseList.propTypes = {
    purchases: React.PropTypes.array.isRequired,
    suppliers: React.PropTypes.array.isRequired
}

export default PurchaseList;