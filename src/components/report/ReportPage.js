import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Print from 'material-ui/svg-icons/action/print';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem, makeSelectable} from 'material-ui/List';

import Moment from 'moment';

import CustomerTransactionReport from './CustomerTransactionReport';
import ExpenseTransactionReport from './ExpenseTransactionReport';
import PurchaseTransactionReport from './PurchaseTransactionReport';
import ExpenseDetailReport from './ExpenseDetailReport';

import jsPDF from 'jspdf';
require('jspdf-autotable');

import { loadCustomerTransaction, loadPurchaseItemTransaction, loadCustomerProductTransaction, loadProducts, loadItems } from '../../actions';

class ReportPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isBusy: false,
            fromDate: new Date(),
            toDate: new Date(),
            reportIndex: 1,
            productId: 0,
            itemId: 0
        };
        this.handleReportClick = this.handleReportClick.bind(this);
    }

    componentDidMount() {
        this.props.loadProducts();
        this.props.loadItems();
    }

    getCustomerTransactionData() {
        const { loadCustomerTransaction, company } = this.props;
        // report.fromDate.setHours(0,0,0);
        // report.toDate.setHours(23,59,0);
        const { fromDate, toDate } = this.state;
        this.setState({ isBusy: true });
        loadCustomerTransaction(fromDate, toDate)
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
                        // keywords: 'report, customer, transaction',
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
                        doc.text(`Dates between (${Moment(fromDate).format('DD/MM/YYYY')} ~ ${Moment(toDate).format('DD/MM/YYYY')})`, data.settings.margin.left + 300, doc.internal.pageSize.height - 20);
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

    getAmount(products) {
        let amount = 0;
        products.map((product, i) => {
            amount += product.price;
        });
        return amount.toFixed(3);
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

    getItemWisePurchase() {
        const params = { fromDate: this.state.fromDate, toDate: this.state.toDate, itemId: this.state.itemId };
        const { loadPurchaseItemTransaction, company, items } = this.props;
        const { fromDate, toDate, itemId } = this.state;
        this.setState({ isBusy: true });
        loadPurchaseItemTransaction(params)
            .then(data => {
                let item = items.filter(d => d._id === itemId);
                this.setState({ isBusy: false });
                if (data.status === 200) {
                    const columns = [
                        { 'title': 'SN.', 'dataKey': 'sr' },
                        { 'title': 'Bill No', 'dataKey': 'billNo' },
                        { 'title': 'Bill Date', 'dataKey': 'billDate' },
                        { 'title': 'Quantity', 'dataKey': 'qty' },
                        { 'title': 'Price', 'dataKey': 'price' }
                    ];
                    var doc = new jsPDF('p', 'pt');
                    var totalPagesExp = "{total_pages_count_string}";
                    var page = 1;
                    doc.setProperties({
                        title: company.displayName,
                        subject: 'Item Wise Purchase List - ' + itemId,		
                        author: 'Syed Rahman Bokhari',
                        // keywords: 'report, customer, transaction',
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
                        doc.text(`${company.displayName} - Item Purchase - ${item && item[0].name}`, data.settings.margin.left, 25);
                
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
                        doc.text(`Item (${item[0].name}) and Dates between (${Moment(fromDate).format('DD/MM/YYYY')} ~ ${Moment(toDate).format('DD/MM/YYYY')})`, data.settings.margin.left + 50, doc.internal.pageSize.height - 20);
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
                            'billNo': d.billNo,
                            'billDate': Moment(d.billDate).format('DD/MM/YYYY'),
                            'qty': d.items.qty,
                            'price': d.items && d.items.price && d.items.price.toFixed(3)
                        };
                    }) || [];
                    if (rows.length > 0) {
                        rows.push({
                            'sr': '',
                            'billNo': '',
                            'billDate': 'Totals : ',
                            'qty': this.getItemQty(data.data),
                            'price': this.getItemPrice(data.data)
                        });
                    
                        // Total page number plugin only available in jspdf v1.0+
                        if (typeof doc.putTotalPages === 'function') {
                            doc.putTotalPages(totalPagesExp);
                        }
                        console.info('rows', rows);
                        doc.autoTable(columns, rows, options);
                        //doc.autoPrint();
                        doc.save(`Item wise Purchase Transaction ${Moment().format('DD/MM/YYYY HH:mm')}.pdf`);
                    }
                }
            });
        }
    
    getItemQty(data) {
        let qty = 0;
        data.map(d => {
            qty += d.items.qty;
        });
        return qty;
    }

    getItemPrice(data) {
        let price = 0;
        data.map(d => {
            price += d.items.price;
        });
        return price.toFixed(3);
    }
        
    getProductWiseSale() {
        const params = { fromDate: this.state.fromDate, toDate: this.state.toDate, productId: this.state.productId };
        const { products, company } = this.props;
        const { fromDate, toDate, productId } = this.state;

        this.props.loadCustomerProductTransaction(params)
            .then(data => {
                let product = products.filter(d => d._id === params.productId);
                this.setState({ isBusy: false });
                if (data.status === 200) {
                    const columns = [
                        { 'title': 'SN.', 'dataKey': 'sr' },
                        { 'title': 'Bill No', 'dataKey': 'billNo' },
                        { 'title': 'Date', 'dataKey': 'date' },
                        { 'title': 'Category', 'dataKey': 'category' },
                        { 'title': 'Item', 'dataKey': 'item' },
                        { 'title': 'Qty', 'dataKey': 'qty' },
                        { 'title': 'Price', 'dataKey': 'price' }
                    ];
                    var doc = new jsPDF('p', 'pt');
                    var totalPagesExp = "{total_pages_count_string}";
                    var page = 1;
                    doc.setProperties({
                        title: company.displayName,
                        subject: 'Product wise Sale List',		
                        author: 'Syed Rahman Bokhari',
                        // keywords: 'report, customer, transaction',
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
                        doc.text(`${company.displayName} - Product Sale - ${product && product[0].name}`, data.settings.margin.left, 25);
                
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
                        doc.text(`Item (${product[0].name}) and Dates between (${Moment(fromDate).format('DD/MM/YYYY')} ~ ${Moment(toDate).format('DD/MM/YYYY')})`, data.settings.margin.left + 50, doc.internal.pageSize.height - 20);
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
                            'billNo': d.billNo,
                            'date': Moment(d.finished).format('DD/MM/YYYY'),
                            'category': d.products.categoryName,
                            'item': d.products.productName,
                            'qty': d.products.qty,
                            'unitPrice': d.products && d.products.unitPrice && d.products.unitPrice.toFixed(3),
                            'price': d.products && d.products.price && d.products.price.toFixed(3)
                        };
                    }) || [];
                    if (rows.length > 0) {
                        rows.push({
                            'sr': '',
                            'billNo': '',
                            'date': 'Totals : ',
                            'category': '',
                            'item': '',
                            'qty': 0,
                            'unitPrice': this.getProductQty(data.data),
                            'price': this.getProductPrice(data.data)
                        });
                    
                        // Total page number plugin only available in jspdf v1.0+
                        if (typeof doc.putTotalPages === 'function') {
                            doc.putTotalPages(totalPagesExp);
                        }
                        console.info('rows', rows);
                        doc.autoTable(columns, rows, options);
                        //doc.autoPrint();
                        doc.save(`Item wise Purchase Transaction ${Moment().format('DD/MM/YYYY HH:mm')}.pdf`);
                    }
                }
            });

    }

    getProductQty(data) {
        let qty = 0;
        data.map(d => {
            qty += d.products.qty;
        });
        return qty;
    }

    getProductPrice(data) {
        let price = 0;
        data.map(d => {
            price += d.products.price;
        });
        return price.toFixed(3);
    }


    handleReportClick() {
        const { loadPurchaseItemTransaction } = this.props;
        if (this.state.reportIndex === 1) {
            this.getCustomerTransactionData();
        }else if (this.state.reportIndex === 2) {
            
        }else if (this.state.reportIndex === 3) {
        }else if (this.state.reportIndex === 4) {
            this.getItemWisePurchase();
        }else if (this.state.reportIndex === 5) {
            this.getProductWiseSale();
            // loadPurchaseItemTransaction(this.state.fromDate, this.state.toDate)
            //     .then(res => console.info('report data', res));                        
        }else if (this.state.reportIndex === 6) {
            
        }
    }

    render() {
        const { items, products } = this.props;

        const selectedClassName = "backgroundColor: 'gray'";

        return (
            <div>
                {/* <CustomerTransactionReport></CustomerTransactionReport>
                <ExpenseTransactionReport></ExpenseTransactionReport>
                <PurchaseTransactionReport></PurchaseTransactionReport>
                <ExpenseDetailReport></ExpenseDetailReport> */}
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0', height: '90vh'}} width={200} >
                    <CardHeader title="Reports" subtitle="" showExpandableButton={false} />
                    <CardText expandable={false}>
                        <div style={{display: 'flex', flexFlow: 'col wrap'}}>
                            <div style={{flex: 1, marginRight: 50}}>
                            index : {this.state.reportIndex}
                                <List>
                                    <ListItem primaryText="Customer Transaction" leftIcon={<Print />} onClick={() => this.setState({reportIndex: 1})} className={ (this.state.reportIndex == 1 ? selectedClassName : '') } />
                                    <ListItem primaryText="Expense Transaction" leftIcon={<Print />} onClick={() => this.setState({reportIndex: 2})} />
                                    <ListItem primaryText="Purchase Order" leftIcon={<Print />} onClick={() => this.setState({reportIndex: 3})} />
                                    <ListItem primaryText="Item Wise Purchase" leftIcon={<Print />} onClick={() => this.setState({reportIndex: 4})} />
                                    <ListItem primaryText="Product Wise Sale" leftIcon={<Print />} onClick={() => this.setState({reportIndex: 5})} />
                                    <ListItem primaryText="Detail Excel" leftIcon={<Print />} onClick={() => this.setState({reportIndex: 6})} />
                                </List>
                            </div>
                            <div style={{flex: 1}}>
                                <DatePicker name='fromDate' floatingLabelText="From Date" autoOk={true} 
                                    container="inline" mode="landscape" onChange={(e,d) => this.setState({fromDate: d})} style={{display: 'inline-block'}} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <DatePicker name='toDate' floatingLabelText="To Date" autoOk={true} 
                                    container="inline" mode="landscape" onChange={(e,d) => this.setState({toDate: d})} style={{display: 'inline-block'}} />&nbsp;&nbsp;&nbsp;&nbsp;
                                {this.state.reportIndex == 4 && <SelectField name='itemId' floatingLabelText="Item" underlineShow={true} 
                                    value={this.state.itemId} onChange={(e,i,v) => this.setState({itemId: v})}>
                                    {items.map(item=>
                                        <MenuItem key={item._id} value={item._id} primaryText={item.name} />
                                    )}
                                </SelectField>}
                                {this.state.reportIndex === 5 && <SelectField name='productId' floatingLabelText="Product" 
                                    underlineShow={true} value={this.state.productId} onChange={(e,i,v) => this.setState({productId: v})}>
                                    {products && products.map(product=>
                                        <MenuItem key={product._id} value={product._id} primaryText={product.name} />
                                    )}
                                </SelectField>}
                                <RaisedButton type='button' disabled={this.state.isBusy} 
                                    icon={<Print />} label='Show Report' secondary={true} onClick={this.handleReportClick} />
                            </div>
                            <div style={{flex: 4}}>
                                <iframe id='output' ref='out1' style={{ width: '100%', height: '80vh'}}></iframe>
                            </div>
                        </div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        company: state.company,
        items: state.items,
        products: state.products.sort(p=>p.name)
    };
}

//export default ReportPage;
export default connect(mapStateToProps, { 
    loadCustomerTransaction, loadPurchaseItemTransaction, loadCustomerProductTransaction, 
    loadProducts, loadItems 
})(ReportPage);
//export default connect(mapStateToProps, mapDispatchToProps)(Report);