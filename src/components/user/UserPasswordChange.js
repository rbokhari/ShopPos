import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { materialTextField, materialCheckBox } from '../controls/index';
import { closePasswordChangeDialog } from '../../actions';

class UserPasswordChange extends Component {

    handleFormSubmit ( {name, displayName, location, officeNo, mobileNo, status} ) {
        //this.props.createBranch({name, displayName, location, officeNo, mobileNo, status});
    }

    handleClose() {
        //this.props.changeBranch();
        this.props.closePasswordChangeDialog();
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
            <RaisedButton type="submit" label="Change Password" primary={true} />
        ];

        const {handleSubmit, pristine, reset, submitting, touched, error, warning }  = this.props;

        return (
            
            <Dialog
                    title="Change Password" actions={dialogActions}
                    modal={true} open={this.props.open}
                    autoScrollBodyContent={true} >
                    
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <div>
                            <Field name="oldPassword" type='password' component={materialTextField} label="Old Password" autoFocus />
                        </div>
                        <div>
                            <Field name="newPassword" type='password' component={materialTextField} label="New Password" />
                        </div>
                        <div>
                            <Field name="confirmPassword" type='password' component={materialTextField} label="Confirm Password" />
                        </div>
                    </form>
            </Dialog>
            
        );
    }
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error,
        open: state.isLoadPasswordDialog 
    };
}

// export default reduxForm({
//     form: 'branch',
//     fields: ['name', 'displayName', 'location', 'officeNo', 'mobileNo', 'status']
// }, mapStateToProps, actions)(BranchNew);

UserPasswordChange = reduxForm({
    form: 'passwordChange',
})(UserPasswordChange);

UserPasswordChange = connect(
    mapStateToProps, 
    { closePasswordChangeDialog: closePasswordChangeDialog }
)(UserPasswordChange);


export default UserPasswordChange;
