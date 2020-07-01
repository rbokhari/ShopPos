import React, {Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { accountCreate } from '../../actions';
//import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
//import TextField from 'material-ui/TextField';
import { materialTextField } from '../controls/index';
import RaisedButton from 'material-ui/RaisedButton';

class CreateAccount extends Component {

    handleFormSubmit(formProps) {
        this.props.accountCreate(formProps)
            .then(response=> {

            }, error => {

            });
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
        //const { handleSubmit, fields: { name, displayName, location, contactNo, email, password, passwordConfirm }} = this.props;
        const {handleSubmit, pristine, reset, submitting, touched, error, warning }  = this.props;

        return (            
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '0 auto',}} >
                    <CardHeader title="Create Account 123" />
                    <CardText>
                        <div>
                            <Field name="name" component={materialTextField} label="Company Name" autoFocus />
                        </div>
                        <div>
                            <Field name="displayName" component={materialTextField} label="Display Name"  />
                        </div>
                        <div>
                            <Field name="location" component={materialTextField} label="Location"  />
                        </div>
                        <div>
                            <Field name="contactNo" component={materialTextField} label="Contact No"  />
                        </div>
                        <div>
                            <Field name="email" component={materialTextField} label="User Name (Admin User)"  />
                        </div>
                        <div>
                            <Field name="password" component={materialTextField} label="Password" type="password"  />
                        </div>
                        <div>
                            <Field name="passwordConfirm" component={materialTextField} label="Confirm Password" type="password"  />
                        </div>
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

function validateForm(formProps) {
    const errors = {};

    if (!formProps.name) {
        errors.name = 'Please enter Company Name !';
    }

    if (!formProps.displayName) {
        errors.displayName = 'Please enter Display Name !';
    }

    if (!formProps.email) {
        errors.email = 'Please enter UserName !';
    }

    if (!formProps.password) {
        errors.password = 'Please enter Password !';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         accountCreate: bindActionCreators(actions.AccountCreate, dispatch),
//         //companyExists: bindActionCreators(actions.CompanyExists, dispatch)
//     };

// }

// export default reduxForm({
//     form: 'account',
//     fields: ['name', 'displayName', 'location', 'contactNo', 'email', 'password', 'passwordConfirm'],
//     validate: validate,
//     //asyncValidate: this.props.companyExists
// }, mapStateToProps, mapDispatchToProps)(CreateAccount);

CreateAccount = reduxForm({
    form: 'signin',
    validate: validateForm
})(CreateAccount);

CreateAccount = connect(
    mapStateToProps, 
    { accountCreate: accountCreate }
)(CreateAccount);


export default CreateAccount;