import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FindReplace from 'material-ui/svg-icons/action/find-replace';
import DatePicker from 'material-ui/DatePicker';

import Moment from 'moment';

import { connect } from 'react-redux';
import { loadCustomerTransaction,loadCustomerDetailDialog  } from '../../actions';

import jsPDF from 'jspdf';
require('jspdf-autotable');

//import * as actions from '../../actions';

class CustomerTransactionReport extends Component {
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            isBusy: false
        };

        //this.getData = this.getData.bind(this);
        this.getAmount = this.getAmount.bind(this);
        this.handleFromDate = this.handleFromDate.bind(this);
        this.handleToDate = this.handleToDate.bind(this);
        //this.showCustomerDetail = this.showCustomerDetail.bind(this);
    }

    componentWillMount() {
        //this.props.report.fromDate = new Date();
        //this.props.report.toDate = new Date();
    }

    handleFromDate(event, date) {
        const { report } = this.props;
        report.fromDate = date;
    }

    handleToDate(event, date) {
        const { report } = this.props;
        report.toDate = date;
    }

    // generatePdf() {
    //     var columns = [
    //         {'title': 'ID', 'dataKey': 'id'},
    //         {'title': 'Country', 'dataKey': 'country'},
    //         {'title': 'Rank', 'dataKey': 'rank'},
    //         {'title': 'Capital', 'dataKey': 'capital'},
    //     ];
    //     var data = [
    //         {'id': 1, 'country': 'Denmark', 'rank': 7, 'capital': 'Copenhagen'},
    //         {'id': 2, 'country': "Switzerland", 'rank': 7.509, 'capital': "Bern"},
    //         {'id': 3, 'country': "Switzerland", 'rank': 7.509, 'capital': "Bern"},
    //         {'id': 4, 'country': "Switzerland", 'rank': 7.509, 'capital': "Bern"}
    //     ];

    //     var doc = new jsPDF('l', 'pt'); //(orientation (e.g. p, l), unit, format, compress)
        
    //     doc.autoTable(columns, data);
    //     // doc.save("table.pdf");
    //      const pdfData = doc.output("datauristring");

    //      var iframe = '<iframe width="100%" height="100%" src="' + pdfData + '"></iframe>';
    //      var x = window.open();
    //      x.document.open();
    //      x.document.write(iframe);
    //      x.document.close();

    //     this.refs.out1.src = pdfData;
    // }

    getData() {
        const { report, loadCustomerTransaction, company } = this.props;
        report.fromDate.setHours(0,0,0);
        report.toDate.setHours(23,59,0);
        this.setState({ isBusy: true });
        loadCustomerTransaction(report.fromDate, report.toDate)
            .then(data => {
                this.setState({ isBusy: false });
                if (data.status === 200) {
                    const columns = [
                        { 'title': 'SN.', 'dataKey': 'sr' },
                        { 'title': 'Date', 'dataKey': 'created', 'format': 'dd/MM' },
                        { 'title': 'Bill No', 'dataKey': 'billNo' },
                        { 'title': 'Customer', 'dataKey': 'carNumber' },
                        { 'title': 'Items', 'dataKey': 'items' },
                        // {'title': 'Items', 'dataKey': 'products', parse: function(d) { console.info('d', d); return d.length; }},
                        { 'title': 'Amount', 'dataKey': 'amount' }
                    ];
                    var doc = new jsPDF('p', 'pt');
                    var totalPagesExp = "{total_pages_count_string}";
                    var page = 1;
                    doc.setProperties({
                        title: company.displayName,
                        subject: 'Customer Transaction List',		
                        author: 'Syed Rahman Bokhari',
                        keywords: 'report, customer, transaction',
                        creator: 'Syed Rahman Bokhari'
                    });
                    var pageContent = function (data) {
                        //console.log(data.pageCount);
                        // HEADER
                        doc.setFontSize(20);
                        //doc.setTextColor(40);
                        doc.setTextColor(36, 113, 163);
                        doc.setFontStyle('normal');
                        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 15, 10, 10);
                        doc.text(`${company.displayName} - Customer Transaction Report`, data.settings.margin.left, 25);
                
                        // FOOTER
                        var str = "Page " + data.pageCount;
                        //console.info(data);
                        // Total page number plugin only available in jspdf v1.0+
                        if (typeof doc.putTotalPages === 'function') {
                            str = str; // + " of " + totalPagesExp;;
                        }
                        doc.setFontSize(10);
                        doc.setTextColor(40);
                        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 20);
                        doc.text(`Dates between (${Moment(report.fromDate).format('DD/MM/YYYY')} ~ ${Moment(report.toDate).format('DD/MM/YYYY')})`, data.settings.margin.left + 300, doc.internal.pageSize.height - 20);
                    };

                    const options = {
                        // Styling 
                        theme: 'striped', // 'striped', 'grid' or 'plain' 
                        styles: {
                            overflow: 'linebreak'   // visible, hidden, ellipsize or linebreak
                        },
                        headerStyles: {},
                        bodyStyles: {},
                        alternateRowStyles: {},
                        columnStyles: {},
                    
                        // Properties 
                        startY: 75, // false (indicates margin top value) or a number 
                        margin: 40,  //a number, array or object
                        pageBreak: 'auto', // 'auto', 'avoid' or 'always' 
                        tableWidth: 'auto', // 'auto', 'wrap' or a number,  
                    
                        // Hooks 
                        createdHeaderCell: function (cell, data) {},
                        createdCell: function (cell, data) {},
                        drawHeaderRow: function (row, data) {
                            row.height = 30;
                        },
                        drawHeaderCell: function (cell, data) {},
                        drawCell: function (cell, data) {},
                        drawRow: function (row, data) {
                            if (row.index === data.table.rows.length - 1) {
                                doc.setTextColor(36, 113, 163);
                                doc.setFontStyle('bold');
                                doc.setFontSize(50);
                            }
                        },
                        addPageContent: pageContent
                    };
                    let rows = data.data.constructor === Array && data.data.map((d,i) => {
                        return {
                            'sr': i+1,
                            'created': Moment(d.created).format('DD/MM/YYYY HH:mm'),
                            'billNo': d.billNo,
                            'carNumber': d.carNumber,
                            'items': d.products.length, // + ':' + this.getProductDetail(d.products),
                            'amount': this.getAmount(d.products)
                        };
                    }) || [];
                    if (rows.length > 0) {
                        rows.push({
                            'sr': '',
                            'created': '',
                            'billNo': '',
                            'carNumber': 'Grand Total',
                            'items': this.getTotalItems(data.data),
                            'amount': this.getTotalPrice(data.data)
                        });
                    
                        // Total page number plugin only available in jspdf v1.0+
                        if (typeof doc.putTotalPages === 'function') {
                            doc.putTotalPages(totalPagesExp);
                        }
                        doc.autoTable(columns, rows, options);
                        //doc.autoPrint();
                        doc.save(`Customer Transaction ${Moment().format('DD/MM/YYYY HH:mm')}.pdf`);
                        // let pdfData = doc.output('datauristring');
                        // console.info('pdfdata', pdfData);
                        // this.refs.out1.src = pdfData; // doc.output('datauristring');
                        // const iframe = '<iframe width="100%" height="100%" src="' + pdfData + '"></iframe>';
                        // let x = window.open();
                        // x.document.open();
                        // x.document.write(iframe);
                        // x.document.close();
                    }
                }
            });
    }

    showCustomerDetail(customer) {
        this.props.loadCustomerDetailDialog(customer);
    }

    getAmount(products) {
        let amount = 0;
        products.map((product, i) => {
            amount += product.price;
        });
        return amount.toFixed(3);
    }

    getProductDetail(products) {
        let data = products.map((product, i) => {
            return `<div>${product.productName}</div>`;
        });
        return data;
    }

    getTotalPrice(customers=[]) {
        let amount = 0;
        if (typeof customers !== undefined) {
            customers.constructor === Array && customers.map((customer, i) => {
                customer.products.map((product, index) => {
                    amount += product.price;
                });
            });
        }
        return amount.toFixed(3);
    }
    
    getTotalItems(customers=[]) {
        let count = 0;
        if (typeof customers !== undefined) {
            customers.constructor === Array && customers.map((customer, i) => {
                customer.products.map((product, index) => {
                    count += product.qty;
                });
            });
        }
        return count;
    }

    render() {
        //const { customers } = this.props;
        return (
            
            <form>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} width={200} >
                    <CardHeader title="Customer" subtitle="Transaction" showExpandableButton={true} />
                    <CardText expandable={true}>
                        <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                            <div style={{flex: 2}}>
                                <DatePicker name='fromDate' floatingLabelText="From Date" autoOk={true} 
                                    container="inline" mode="landscape" onChange={this.handleFromDate} style={{display: 'inline-block'}} />
                                <DatePicker name='toDate' floatingLabelText="To Date" autoOk={true} 
                                    container="inline" mode="landscape" onChange={this.handleToDate} style={{display: 'inline-block'}} />
                                <RaisedButton type='button' disabled={this.state.isBusy} 
                                    icon={<FindReplace />} label='Search' secondary={true} onClick={this.getData.bind(this)} />
                            </div>
                            {/* <div style={{flex: 3, border: '0px'}}>
                                <iframe id='output' ref='out1' style={{ width: '100%', height: '100%'}}></iframe>
                            </div> */}
                        </div>
                        
                        {/* <Table height={'400px'} fixedHeader={true} fixedFooter={true} style={{ width: 1000 }} selectable={false}>
                            <TableHeader displaySelectAll={false} multiSelectable={false} enableSelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn style={{width: 5}}>Sr.</TableHeaderColumn>
                                    <TableHeaderColumn>Date</TableHeaderColumn>
                                    <TableHeaderColumn>Bill No </TableHeaderColumn>
                                    <TableHeaderColumn>Customer</TableHeaderColumn>
                                    <TableHeaderColumn>Items</TableHeaderColumn>
                                    <TableHeaderColumn>Bill</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody  displayRowCheckbox={false}>
                                {customers && customers.map((customer, i) =>
                                    <TableRow key={i} >
                                        <TableRowColumn style={{width: 5}}>{i+1}</TableRowColumn>
                                        <TableRowColumn>{Moment(customer.created).format('DD/MM/YYYY, h:mm a')}</TableRowColumn>
                                        <TableRowColumn>
                                            <MenuItem primaryText={customer.billNo} onTouchTap={this.showCustomerDetail.bind(this, customer)}  />
                                        </TableRowColumn>
                                        <TableRowColumn>{customer.carNumber} </TableRowColumn>
                                        <TableRowColumn>{customer.products.length}</TableRowColumn>
                                        <TableRowColumn>{this.getAmount(customer.products).toFixed(3)}</TableRowColumn>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn>Total : </TableRowColumn>
                                    <TableRowColumn>{this.props.amount}</TableRowColumn>
                                </TableRow>
                            </TableFooter>
                    </Table> */}
                    </CardText>
                </Card>
            </form>
        );
    }
}

function formatAmount(amount) {
    return parseFloat(amount).toFixed(3);
}

function mapStateToProps(state, ownProps) {
    let report = {
        fromDate: new Date(), // Moment().format('DD/MM/YYYY'),
        toDate: new Date() // Moment().format('DD/MM/YYYY')
    };
    return {
        report: report,
        company: state.company
        //customers: state.reportCustomerData,
        //amount: getTotalPrice(state.reportCustomerData)
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         loadCustomerTransaction: loadCustomerTransaction,
//         loadCustomerDetailDialog: loadCustomerDetailDialog
//     };
// }

export default connect(mapStateToProps, { loadCustomerTransaction, loadCustomerDetailDialog })(CustomerTransactionReport);