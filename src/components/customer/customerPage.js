import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import { loadDays, printDay, successNotification, errorNotification } from '../../actions';
import DayList from './DayList';

const style = {
    marginTop: 40
};

class CustomerPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.props.loadDays();

        this.printThisDay = this.printThisDay.bind(this);
    }

    printThisDay(id) {
        const { printDay, successNotification, errorNotification } = this.props;
        printDay(id)
            .then(res => {
                successNotification('Printing done !')
            })
            .catch(err => {
                errorNotification('Some error occured !');
            });
    }

    render() {
        const { days, user } = this.props;

        return (
            <div style={style}>
                <DayList days={days} user={user} onPrintDay={this.printThisDay} />
            </div>
        );
    }

}

CustomerPage.propTypes = {
    customers: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return { 
        days: state.day.all,
        user: state.auth.user
    };
}

export default connect(mapStateToProps, { loadDays, printDay, successNotification, errorNotification })(CustomerPage);