import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import BranchList from './BranchList';

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

class BranchPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.props.loadBranches();
    }

    render() {
        const { branches } = this.props;

        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} onTouchTap={() => browserHistory.push('/branch/new')} >
                    <ContentAdd />
                </FloatingActionButton>
                <BranchList branches={branches} />
            </div>
        );
    }

}

BranchPage.propTypes = {
    branches: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    console.info("branches", state.branch);
    return { 
        branches: state.branch.all,
        branch: state.branch.current
    };
}

export default connect(mapStateToProps, actions)(BranchPage);