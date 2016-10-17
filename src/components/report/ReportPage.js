import React, { Component, PropTypes } from 'react';

import CustomerTransactionReport from './CustomerTransactionReport';
import ExpenseTransactionReport from './ExpenseTransactionReport';

class ReportPage extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <CustomerTransactionReport></CustomerTransactionReport>
                <ExpenseTransactionReport></ExpenseTransactionReport>
            </div>
        );
    }
}

export default ReportPage;

//export default connect(mapStateToProps, mapDispatchToProps)(Report);