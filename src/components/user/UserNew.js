import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

//import { bindActionCreators } from 'redux';
//import TextField from 'material-ui/TextField';
//import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
//import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';

import { USER_ROLE, USER_ROLE_LABEL } from '../../../shared/constants';
import { createUsers, loadUsers } from '../../actions';
import { materialTextField, materialCheckBox, materialSelectField } from '../controls/index';


const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

class UserNew extends Component {

    constructor( props, context ) {
        super( props, context );
        //this.props.loadUsers();

        this.state = {
            //expense: Object.assign( {}, this.props.expense ),
            errors: {}
        };
    }

    handleFormSubmit ( {email, password, branchId, roleId, status } ) {
        this.props.createUsers({ email, password, branchId, roleId, status })
            .then(() => {
                this.context.router.push('/users');
            }, (error) => {
                console.info(error);
            });
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
        //const { handleSubmit, fields: { email, password, branchId, roleId, status }, loading, branches } = this.props;
        const {handleSubmit, pristine, reset, submitting, touched, error, warning, branches, loading }  = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                    <CardHeader title="Users" subtitle={ this.props.user.id == '0' ? 'Add New' : 'Edit' } />
                    <CardText>
                        <div>
                            <Field name="email" component={materialTextField} label="User Name"/>
                        </div>
                        {this.props.user.id == '0' && <div>
                            <Field name="password" component={materialTextField} label="Password" type="password"/>
                        </div>}
                        <div>
                            <Field name="branchId" component={materialSelectField} label="Branch">
                                {branches.map(branch=>
                                    <MenuItem key={branch._id} value={branch._id} primaryText={branch.name} />
                                )}                            
                            </Field>
                        </div>
                        <div>
                            <Field name="roleId" component={materialSelectField} label="Role">
                                <MenuItem key={USER_ROLE.BRANCH_MANAGER} value={USER_ROLE.BRANCH_MANAGER} primaryText={USER_ROLE_LABEL.BRANCH_MANAGER} />
                                <MenuItem key={USER_ROLE.BRANCH_SALES_PERSON} value={USER_ROLE.BRANCH_SALES_PERSON} primaryText={USER_ROLE_LABEL.BRANCH_SALES_PERSON} />
                            </Field>
                        </div>
                        <div>
                            <Field name="status" component={materialCheckBox} label="Status"/>
                        </div>
                    </CardText>
                    <CardActions>
                        <RaisedButton label={loading ? 'Saving...' : this.props.user.id == '0' ? 'Save' : 'Update' } primary={true} type="submit" />
                        <RaisedButton label="Cancel" secondary={true} containerElement={<Link to="/users" />} />
                    </CardActions>
                </Card>
            </form>
        );
    }
}

UserNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getUserById( users, id ) {
    const user = users.filter(user => { 
        return user.id == id 
    });
    if (user) return user[0];
    return null;
}

function validateForm(values) {
    const errors = {};

    // if (!values.code) {
    //     errors.name = 'Name required';
    // }
    return errors;
}


function mapStateToProps(state, ownProps) {
    const userId = ownProps.params.id;

    let user = {
        id: '0', email: '', password: '', roleId: 0, status: 1
    };
    if (userId && state.users.length > 0 ) {
        user = getUserById(state.users, userId);
    }

    return {
        user: user,
        branches: state.branch.all,
        loading: false,
        initialValues: user
    };

    // return { 
    //     branches: state.branch.all,
    //     errorMessage: state.auth.error,
    //     loading: false
    //  };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         createUsers: bindActionCreators(actions.createUsers, dispatch)
//     };
// }

// export default reduxForm({
//     form: 'user',
//     fields: ['email', 'password', 'branchId', 'roleId', 'status']
// }, mapStateToProps, mapDispatchToProps)(UserNew);


UserNew = reduxForm({
    form: 'user',
    //validate: validateForm
})(UserNew);

UserNew = connect(
    mapStateToProps, 
    { createUsers: createUsers, loadUsers: loadUsers }
)(UserNew);

export default UserNew;
