import React, { Component, PropTypes } from 'react';

import CustomerTransactionReport from './CustomerTransactionReport';
import ExpenseTransactionReport from './ExpenseTransactionReport';
import PurchaseTransactionReport from './PurchaseTransactionReport';

class ReportPage extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <CustomerTransactionReport></CustomerTransactionReport>
                <ExpenseTransactionReport></ExpenseTransactionReport>
                <PurchaseTransactionReport></PurchaseTransactionReport>
            </div>
        );
    }
}

export default ReportPage;

//export default connect(mapStateToProps, mapDispatchToProps)(Report);