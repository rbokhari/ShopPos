import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { materialTextField, materialCheckBox } from '../controls/index';
import { closePasswordChangeDialog, changePassword, successNotification, errorNotification } from '../../actions';

class UserPasswordChange extends Component {

    constructor(props) { super(props); }

    handleFormSubmit(props) {
        const { changePassword, closePasswordChangeDialog, successNotification, errorNotification } = this.props;  
        changePassword(props)
            .then(res=> {
                successNotification('Password change successfully !');
                closePasswordChangeDialog();
            })
            .catch(err=> {
                console.error('UserPasswordChange Error', err);
                errorNotification('Something went wrong !');
            });
        //this.props.createBranch({name, displayName, location, officeNo, mobileNo, status});
    }

    handleClose() {
        const { closePasswordChangeDialog } = this.props;  
        closePasswordChangeDialog();
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
        const {handleSubmit, pristine, reset, submitting, touched, error, warning }  = this.props;

        const dialogActions = [
            <RaisedButton type="submit" label="Change Password" primary={true} onTouchTap={handleSubmit(this.handleFormSubmit.bind(this))} />,
            <RaisedButton label="Cancel" secondary={true} style={{marginLeft: 10}} onTouchTap={this.handleClose.bind(this)} />
        ];

        return (
            <form >
                <Dialog title="Change Password" actions={dialogActions}
                        modal={true} open={this.props.open}
                        autoScrollBodyContent={true} >
                        
                    <div>
                        <Field name="password" type='password' component={materialTextField} label="Old Password" />
                    </div>
                    <div>
                        <Field name="newPassword" type='password' component={materialTextField} label="New Password" />
                    </div>
                    <div>
                        <Field name="confirmPassword" type='password' component={materialTextField} label="Confirm Password" />
                    </div>
                </Dialog>
            </form>
            
        );
    }
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error,
        open: state.isLoadPasswordDialog,
        initialValues: { 
            email: state.auth.user.name, password: '', oldPassword: '', confirmPassword: '' 
        }
    };
}

function validateForm(values) {
    const errors = {};
    if (!values.oldPassword) {
        errors.oldPassword = 'Old password is required !';
    }
    if (!values.newPassword) {
        errors.newPassword = 'New password is required !';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required !';
    }
    if (values.newPassword !== values.confirmPassword) {
        errors.confirmPassword = 'Confirm password not match !';
    }
    return errors;
}

UserPasswordChange = reduxForm({
    form: 'passwordChange',
    validate: validateForm
})(UserPasswordChange);

UserPasswordChange = connect(
    mapStateToProps, 
    { closePasswordChangeDialog, changePassword, successNotification, errorNotification }
)(UserPasswordChange);

export default UserPasswordChange;