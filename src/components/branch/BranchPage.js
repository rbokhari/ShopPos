import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { loadBranches } from '../../actions';
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
        const { branches, company, muiTheme } = this.props;
        return (
                <div style={{
                    width: '100%'
                }}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text={`Company Detail - (Name : ${company.name}), (Display Name : ${company.displayName} )`} />
                        </ToolbarGroup>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarSeparator />
                            <RaisedButton label="Edit" primary={true} />
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{
                        display: 'flex',
                        flexFlow: 'row wrap'                 
                    }}>
                        <BranchList branches={branches} />
                    </div>
                </div>                
        );
    }

}

BranchPage.propTypes = {
    branches: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return { 
        branches: state.branch.all,
        branch: state.branch.current,
        company: state.company
    };
}

export default connect(mapStateToProps, { loadBranches})(BranchPage);