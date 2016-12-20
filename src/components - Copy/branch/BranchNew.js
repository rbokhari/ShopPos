import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../actions';

class BranchNew extends Component {

    handleFormSubmit ( {name, displayName, location, officeNo, mobileNo, status} ) {
        console.error("submit");

        this.props.createBranch({name, displayName, location, officeNo, mobileNo, status});
    }

    handleClose() {
        //this.props.changeBranch();
        this.props.closeBranchDialog();
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <strong>
                        Oops ! 
                    </strong> 
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    

    render() {
        const dialogActions = [
            <RaisedButton label="Cancel" secondary={true} onTouchTap={this.handleClose.bind(this)} />,
            <RaisedButton type="submit" label="Create" primary={true} />
        ];

        const { handleSubmit, fields: {name, displayName, location, officeNo, mobileNo, status}} = this.props;
        return (
            
            <Dialog
                    title="Create Branch" actions={dialogActions}
                    modal={true} open={this.props.open}
                    autoScrollBodyContent={true} >
                    
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <div>
                            <TextField name="name" floatingLabelText="Name" {...name} />
                        </div>
                        <div>
                            <TextField name="displayName" floatingLabelText="Display Name" {...displayName} />
                        </div>
                        <div>
                            <TextField name="location" floatingLabelText="Location" {...location} />
                        </div>
                        <div>
                            <TextField name="officeNo" floatingLabelText="Office No" {...officeNo} />
                        </div>
                        <div>
                            <TextField name="mobileNo" floatingLabelText="Mobile No" {...mobileNo} />
                        </div>
                        <div>
                            <TextField name="status" floatingLabelText="Status" {...status} />
                        </div>
                        <div>
                            <RaisedButton type="submit" label="Create" primary={true} />
                        </div>
                    </form>
            </Dialog>
            
        );
    }
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error,
        open: state.branch.isCreateLoad 
    };
}

export default reduxForm({
    form: 'branch',
    fields: ['name', 'displayName', 'location', 'officeNo', 'mobileNo', 'status']
}, mapStateToProps, actions)(BranchNew);