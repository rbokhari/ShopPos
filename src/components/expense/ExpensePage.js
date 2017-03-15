import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import ExpenseList from './ExpenseList';

const cardHeight = 400;

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const fabStyle = {
    marginTop: 10,
    marginLeft: '90%'
};

class ExpensePage extends Component {

    constructor(props, context) {
        super(props, context);

        this.props.loadExpenses();
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.branch.branchId !== localStorage.getItem('officeId')) {
        //     this.props.loadCategories();
        // }
    }

    render() {
        const {expenses, day} = this.props;

        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} onTouchTap={() => browserHistory.push('/expense/new')} 
                    disabled={day==null} >
                    <ContentAdd />
                </FloatingActionButton>
                <ExpenseList expenses={expenses} />
            </div>
        );
    }

}

ExpensePage.propTypes = {
    expenses: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    //var day = { _id:'0', today: '' };
    console.info('day', state.day);
    return { 
        day: state.day,
        expenses: state.expenses
    };
}

export default connect(mapStateToProps, actions)(ExpensePage);