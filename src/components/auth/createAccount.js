import React, {Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CreateAccount extends Component {

    handleFormSubmit(formProps) {
        this.props.accountCreate(formProps);
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <strong>Oops !</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {

        const { handleSubmit, fields: { name, displayName, location, contactNo, email, password, passwordConfirm }} = this.props;

        return (            
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                    <CardHeader title="Create Account" />
                    <CardText>
                        <TextField floatingLabelText="Company Name" {...name} errorText={name.touched && name.error} />
                        <br />
                        <TextField floatingLabelText="Display Name" {...displayName} />
                        <br />
                        <TextField floatingLabelText="Location" {...location} />
                        <br />
                        <TextField floatingLabelText="Contact No" {...contactNo} />
                        <br />
                        <TextField floatingLabelText="UserName (Admin User)" {...email} errorText={email.touched && email.error} />
                        <br />
                        <TextField floatingLabelText="Password" type="password" {...password} errorText={password.touched && password.error} />
                        <br />
                        <TextField floatingLabelText="Confirm Password" type="password" {...passwordConfirm} />
                        <br />
                    </CardText>
                    <CardActions>
                        {this.renderError()}
                        <RaisedButton type="submit" primary={true} label='Create Account' ></RaisedButton>
                    </CardActions>
                </Card>
        </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.name) {
        errors.name = 'Please enter Company Name';
    }

    if (!formProps.email) {
        errors.email = 'Please enter UserName';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

function mapDispatchToProps(dispatch) {
    return {
        accountCreate: bindActionCreators(actions.AccountCreate, dispatch),
        //companyExists: bindActionCreators(actions.CompanyExists, dispatch)
    };

}

export default reduxForm({
    form: 'account',
    fields: ['name', 'displayName', 'location', 'contactNo', 'email', 'password', 'passwordConfirm'],
    validate: validate,
    //asyncValidate: this.props.companyExists
}, mapStateToProps, mapDispatchToProps)(CreateAccount);