import React from 'react';
import {Card, CardHeader } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableFooter, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';

import { CUSTOMER_STATUS } from '../../../shared/constants';
import { Icons } from '../theme';
import BusyIndicator from '../common/BusyIndicator';
import CustomerDetail from './customerDetail';

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
//   flexGrow: 1
    flex: 2
};

class CustomerList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            customer: undefined,
            total: 0
        };

        this.onRowSelect = this.onRowSelect.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    onRowSelect(i) {
        const { customers } = this.props;
        this.setState({
            customer: customers[i]
        });
    }

    calculateTotal() {
        const { customers } = this.props;
        const amounts = customers.map((customer, i) => {
            const prices = customer.products.reduce((acc,cur) => acc + cur.price, 0);
            return prices;
        });
        //console.info('amounts', amounts);
        const totalAmount = amounts.reduce((acc, cur) => acc + cur, 0);
        // this.setState(prevState => ({ total: totalAmount })
        // );
        console.info('totalAmount', totalAmount);
    }

    render() {
        const {customers, day, onPrintCustomer} = this.props;
        if (typeof day === 'undefined') return (<div>Loading...</div>);
        this.calculateTotal();
        return (
            <div id="dSalesboard" style={{width: '100%'}}>
                <div style={{
                        display: 'flex',
                        flexFlow: 'row wrap'
                    }}>
                    <Card style={cardStyle}>
                        <CardHeader title={`Customers of Day: ${Moment(day.today).format('DD/MM/YYYY, h:mm a')}`} subtitle={`Total Amount ${this.state.total.toFixed(3)}`} />
                        
                        <Table selectable={true} onRowSelection={index => this.onRowSelect(index)}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn width={'30px'}>SN.</TableHeaderColumn>
                                    <TableHeaderColumn width={'60px'}>Bill No</TableHeaderColumn>
                                    <TableHeaderColumn>Date</TableHeaderColumn>
                                    <TableHeaderColumn>Car No / Mobile</TableHeaderColumn>
                                    <TableHeaderColumn>Items</TableHeaderColumn>
                                    <TableHeaderColumn>Status</TableHeaderColumn>
                                    <TableHeaderColumn>Action</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {customers.length == 0 && <TableRow key={0} ><TableRowColumn colSpan='8'><BusyIndicator /></TableRowColumn></TableRow>}
                                {customers.map( (customer, index) =>
                                    <TableRow key={index}>
                                        <TableRowColumn width={'30px'}>{index+1}.</TableRowColumn>
                                        <TableRowColumn width={'60px'}>
                                            {customer.billNo}
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            {Moment(customer.created).format('DD/MM/YYYY, h:mm a')} 
                                        </TableRowColumn>
                                        <TableRowColumn>{customer.carNumber} / {customer.mobileNumber}</TableRowColumn>
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
                            <TableFooter>
                                <TableRow>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn></TableRowColumn>
                                </TableRow>
                            </TableFooter>
                        </Table>                
                    </Card>
                    {this.state.customer && <CustomerDetail customer={this.state.customer}  />}
                </div>
            </div>
        );
    }
}

export default CustomerList;