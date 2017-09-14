import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { signinUser } from '../../actions';
import { materialTextField } from '../controls/index';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';


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
                <strong>
                    Username or Password wrong !
                    {/* {this.props.errorMessage} */}
                </strong> 
            );
        }
    }

    render() {
        //const { handleSubmit, fields: {email, password}} = this.props;
        const {handleSubmit, pristine, reset, submitting, touched, error, warning }  = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Card style={{ margin: '0 auto', height: 350, width: 300}} >
                    <CardHeader title="Sign In" />
                    <CardText>
                        <div>
                            <Field name="email" component={materialTextField} label="User Name" autoFocus />
                        </div>
                        <div>
                            <Field name="password" component={materialTextField} label="Password" type="password" />
                        </div>
                            {this.renderAlert()}
                    </CardText>
                    <CardActions>
                        <RaisedButton type="submit" primary={true} label='Sigin' ></RaisedButton>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

SignIn.contextTypes = {
    router: PropTypes.object.isRequired
}

function validateForm(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'Username cannot be blank';
    }
    if (!values.password) {
        errors.password = 'Password cannot be blank !';
    }
    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}


SignIn = reduxForm({
    form: 'signin',
    validate: validateForm
})(SignIn);

SignIn = connect(mapStateToProps, { signinUser })(SignIn);

export default SignIn;