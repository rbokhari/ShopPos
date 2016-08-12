import React, { Component } from 'react';
import {reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import * as actions from '../../actions';

class SignIn extends Component {

    handleFormSubmit ( {email, password} ) {
        console.log(email, password);
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
                <TextField name="name" hintText="Name"
                        floatingLabelText="Email" {...email}
                        underlineShow={false} />
                    <Divider />
                    <TextField name="password" hintText="password"
                        floatingLabelText="Password" {...password}
                        underlineShow={false} />
                    <Divider />
                    {this.renderAlert()}
                    <button action="submit"  >Sign in</button>
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