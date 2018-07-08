import React from 'react';
import {blue500, teal500, yellow50} from 'material-ui/styles/colors';
import {Card, CardHeader } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Divider } from 'material-ui';
import Moment from 'moment';

const totalAmount = (accumulator, currentValue) => accumulator + currentValue.price;

const CustomerDetail = ({customer}) => (
    <Card style={{ flex: 1, margin: '-25px 32px 1px 0'}}>
        {customer && <CardHeader style={{width:400}}
            title={
                <span style={{fontWeight: 'bold', color: yellow50}}>
                    Bill : {customer.billNo} @ {Moment(customer.created).format('dddd h:mm')}&nbsp;
                    {customer.option==='1' && <span style={{backgroundColor:teal500, padding:2, color:yellow50}}>TAKE AWAY </span>}
                    {customer.option==='2' && <span style={{backgroundColor:teal500, padding:2, color:yellow50}}>DINE IN </span>}
                    {customer.option==='3' && <span style={{backgroundColor:teal500, padding:2, color:yellow50}}>DELIVERY </span>}
                    </span>
            } 
            subtitle={
                <span>
                    <p>{customer.option==='1' ? 'Car/Mobile' : 'Table'} : {customer.carNumber == '' || undefined ? customer.mobileNumber : customer.carNumber}</p>
                    <p>Total Items : {customer.products.length}</p>
                </span>
                } />}
            <Divider />
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        {/* <TableHeaderColumn>Category</TableHeaderColumn> */}
                        <TableHeaderColumn width={'40%'}>Item</TableHeaderColumn>
                        <TableHeaderColumn>Price</TableHeaderColumn>
                        <TableHeaderColumn>Qty</TableHeaderColumn>
                        <TableHeaderColumn>Total</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {customer.products.map((product,index) => 
                        <TableRow key={index}>
                            {/* <TableRowColumn>{product.categoryName}</TableRowColumn> */}
                            <TableRowColumn width={'40%'}>{product.productName}</TableRowColumn>
                            <TableRowColumn>{product.price.toFixed(3)}</TableRowColumn>
                            <TableRowColumn>{product.qty}</TableRowColumn>
                            <TableRowColumn>{(product.price * product.qty).toFixed(3)}</TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter adjustForCheckbox={false}>
                    <TableRow>
                        {/* <TableRowColumn></TableRowColumn> */}
                        <TableRowColumn ></TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn>Total :</TableRowColumn>
                        <TableRowColumn>
                            {(customer.products.reduce(totalAmount, 0)).toFixed(3) }
                        </TableRowColumn>
                    </TableRow>
                </TableFooter>
            </Table>
        </Card>
);
export default CustomerDetail;