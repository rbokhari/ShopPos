import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import List from './masterList';

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

class ExpenseMasterPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.props.loadExpenseMasters();
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.branch.branchId !== localStorage.getItem('officeId')) {
        //     this.props.loadCategories();
        // }
    }

    render() {
        const {expenseMasters} = this.props;

        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} containerElement={<Link to="/master/new" />}>
                    <ContentAdd />
                </FloatingActionButton>
                <List masters={expenseMasters} />
            </div>
        );
    }

}

ExpenseMasterPage.propTypes = {
    expenseMasters: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return { 
        expenseMasters: state.expenseMasters
    };
}

export default connect(mapStateToProps, actions)(ExpenseMasterPage);