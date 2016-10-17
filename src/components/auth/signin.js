import React, { Component } from 'react';
import {reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../actions';

class SignIn extends Component {

    handleFormSubmit ( {email, password} ) {
        this.props.signinUser({ email, password});
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
        const { handleSubmit, fields: {email, password}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div>Signin</div>
                <div>
                    <TextField name="name" floatingLabelText="Email" {...email} />
                </div>
                <div>
                    <TextField type="password" name="password" floatingLabelText="Password" {...password} />
                </div>
                    {this.renderAlert()}
                <div>
                    <RaisedButton type="submit" primary={true} label='Sigin' ></RaisedButton>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

function mapDispatchToProps(dispatch) {
    return {
        signinUser: bindActionCreators(actions.signinUser, dispatch)
    };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, mapDispatchToProps)(SignIn);