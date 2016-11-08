import React, { Component, PropTypes } from 'react';
import {reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../actions';

class SignIn extends Component {

    handleFormSubmit ( {email, password} ) {
        this.props.signinUser({ email, password});
            // .then(res => {
            //     alert("yes");
            //     this.context.router.push('/');
            // }, err => {

            // });
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
                <h2>Sign In</h2>
                <div>
                    <TextField name="name" floatingLabelText="Email" {...email} autoFocus />
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

SignIn.contextTypes = {
    router: PropTypes.object.isRequired
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