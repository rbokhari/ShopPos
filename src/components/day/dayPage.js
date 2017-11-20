import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import { loadDays, printDay, successNotification, errorNotification } from '../../actions';
import DayList from './dayList';

const style = {
    marginTop: 40
};

class DayPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.printThisDay = this.printThisDay.bind(this);
    }

    componentDidMount() {
        this.props.loadDays();
    }

    printThisDay(id) {
        const { printDay, successNotification, errorNotification } = this.props;
        printDay(id)
            .then(res => {
                successNotification('Printing Send !');
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

DayPage.propTypes = {
    days: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return { 
        days: state.days.all,
        user: state.auth.user
    };
}

export default connect(mapStateToProps, { loadDays, printDay, successNotification, errorNotification })(DayPage);