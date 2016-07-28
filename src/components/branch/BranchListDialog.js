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
        
        this.state = {
            open: false
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    componentWillUpdate(nextProps) {
        //console.log("componentWillUpdate", nextProps);
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose} />,
            <FlatButton label="OK" primary={true} keyboardFocused={true} onTouchTap={this.handleClose} />,
        ];

    const radios = [
        <RadioButton key={1} value={'1'} label={'First'} style={styles.radioButton}/>,
        <RadioButton key={2} value={'2'} label={'Second'} style={styles.radioButton}/>,
        <RadioButton key={3} value={'3'} label={'Third'} style={styles.radioButton}/>
    ];
        return (
            <div>
                <Dialog
                    title="Select Branch"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true} >
                    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                        {radios}
                    </RadioButtonGroup>
                </Dialog>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return { open : state.isLoad };
}

export default connect(mapStateToProps, actions)(BranchListDialog);