import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import { loadDays, loadCustomerByDayId, printCustomer, successNotification, errorNotification } from '../../actions';
import CustomerList from './CustomerList';

const style = {
    marginTop: 40
};

class CustomerPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.printThisCustomer = this.printThisCustomer.bind(this);
    }

    componentWillMount() {
        const { dayId, day, loadDays, loadCustomerByDayId } = this.props;
        
        if (typeof day === 'undefined') {
            loadDays();
        } 
        loadCustomerByDayId(dayId);
    }

    printThisCustomer(id) {
        const { printCustomer, successNotification, errorNotification } = this.props;
        printCustomer(id, 3)    // 3 = customerstatus.delivered
            .then(res => {
                successNotification('Printing Send !');
            })
            .catch(err => {
                errorNotification('Some error occured !');
            });
    }

    render() {
        const { customers, day, user } = this.props;

        return (
            <div style={style}>
                <CustomerList customers={customers} day={day} onPrintCustomer={this.printThisCustomer } />
            </div>
        );
    }

}

CustomerPage.propTypes = {
    customers: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    const dayId = ownProps.params.dayId;
    const day = state.days.all.filter(d=> d._id == dayId)[0];
    return { 
        dayId: ownProps.params.dayId,
        day: day,
        customers: state.days.customers,
        user: state.auth.user
    };
}

export default connect(mapStateToProps, { loadDays, loadCustomerByDayId, printCustomer, successNotification, errorNotification })(CustomerPage);