import React, { Component } from 'react';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import * as actions from '../../actions';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

class BranchListDialog extends Component {

    constructor(props) {
        super(props);
        
        this.handleClose = this.handleClose.bind(this);
        this.props.loadBranches();
    }

    componentWillUpdate(nextProps) {
        //console.log("componentWillUpdate", nextProps);
    }

    handleClose() {
        const branchId = this.refs.branch.getSelectedValue();
        const currentBranch = this.props.branches.filter(item=> item._id === branchId)[0];
        this.props.changeBranch(currentBranch);
    }

    render() {
        const actions = [
            <FlatButton label="OK" primary={true} onTouchTap={this.handleClose} />
        ];

        const radios = [
            <RadioButton key={1} value={'1'} label={'First'} style={styles.radioButton} />
        ];
        return (
            <Dialog
                title="Select Branch" actions={actions}
                modal={true} open={this.props.open}
                onRequestClose={this.handleClose} autoScrollBodyContent={true} >
                <RadioButtonGroup name="branch" ref="branch">
                    {this.props.branches.map(branch => 
                        <RadioButton key={branch._id} value={branch._id} 
                            label={branch.name + ' [ ' + branch.displayName + ' ]'}  
                            style={styles.radioButton} />
                    )}                    
                </RadioButtonGroup>
            </Dialog>
        );
    }

}

function mapStateToProps(state) {
    return { 
        open : state.branch.isLoad,
        branches: state.branch.all 
    };
}

export default connect(mapStateToProps, actions)(BranchListDialog);