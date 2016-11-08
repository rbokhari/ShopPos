import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';

import { USER_ROLE, USER_ROLE_LABEL } from '../../../shared/constants';
import * as actions from '../../actions';

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

class UserNew extends Component {

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
        const { handleSubmit, fields: { email, password, branchId, roleId, status }, loading, branches } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                    <CardHeader title="Users" subtitle="Add New" />
                    <CardText>
                        <TextField name="email" floatingLabelText="User Name" {...email} />
                        <br />
                        <TextField name="password" type="password" floatingLabelText="Password" {...password} />
                        <br />
                        <SelectField name='branchId' floatingLabelText="Branch" {...branchId} onChange={(e, i, v) => branchId.onChange(v)} >
                        {branches.map(branch=>
                            <MenuItem key={branch._id} value={branch._id} primaryText={branch.name} />
                        )}
                        </SelectField>
                        <br />
                        <SelectField name='roleId' floatingLabelText="Role" {...roleId} onChange={(e, i, v) => roleId.onChange(v)} >
                            <MenuItem key={USER_ROLE.BRANCH_MANAGER} value={USER_ROLE.BRANCH_MANAGER} primaryText={USER_ROLE_LABEL.BRANCH_MANAGER} />
                            <MenuItem key={USER_ROLE.BRANCH_SALES_PERSON} value={USER_ROLE.BRANCH_SALES_PERSON} primaryText={USER_ROLE_LABEL.BRANCH_SALES_PERSON} />
                        </SelectField>
                        <br />
                        <Checkbox name="status" label="Status" style={styles.checkbox} {...status} onCheck ={(e, v) => status.onChange(v)} />
                    </CardText>
                    <CardActions>
                        <RaisedButton label={loading ? 'Saving...' : 'Save'} primary={true} type="submit" />
                        <RaisedButton label="Cancel" linkButton containerElement={<Link to="/users" />} />
                    </CardActions>
                </Card>
            </form>
        );
    }
}

UserNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { 
        branches: state.branch.all,
        errorMessage: state.auth.error,
        loading: false
     };
}

function mapDispatchToProps(dispatch) {
    return {
        createUsers: bindActionCreators(actions.createUsers, dispatch)
    };
}

export default reduxForm({
    form: 'user',
    fields: ['email', 'password', 'branchId', 'roleId', 'status']
}, mapStateToProps, mapDispatchToProps)(UserNew);