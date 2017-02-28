import React, { Component, PropTypes } from "react";
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { DatePicker } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

import { createExpenseMaster } from '../../actions';
import { materialTextField, materialCheckBox } from '../controls/index';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class ExpenseMasterNew extends Component {
    
    constructor( props, context ) {
        super( props, context );

        this.state = {
            //expense: Object.assign( {}, this.props.expense ),
            errors: {}
        };
    }

    saveExpenseMaster(props) {
        this.props.createExpenseMaster(props)
            .then(() => {
                this.context.router.push('/master');
            }, (error) => {
                console.info(error);
            });
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, touched, error, warning, created }  = this.props;

        return (
            <form onSubmit={handleSubmit(this.saveExpenseMaster.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                    <CardHeader title="Expense Master" subtitle={ this.props.master._id === '0' ? 'Add New' : 'Edit'} />
                    <CardText>
                        <div>
                            <Field name="name" component={materialTextField} floatingLabelText="Name"/>
                        </div>
                        <div>
                            <Field name="description" component={materialTextField} label="Description"/>
                        </div>
                    </CardText>
                    <CardActions>
                        <RaisedButton type='submit' icon={<ContentSave />} label={this.props.master._id === '0' ? 'Save' : 'Update'} primary={true} />
                        <RaisedButton icon={<ContentClear />} label="Cancel" containerElement={<Link to="/master" />}/>
                    </CardActions>
                </Card>
            </form>
        );
    }

}

ExpenseMasterNew.propTypes = {
    // category: PropTypes.object.isRequired,
    // createCategory: PropTypes.func.isRequired,
}

// Pull in the React Router context so router is available on this.context.router
ExpenseMasterNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getExpenseMasterById( expenseMasters, id ) {
    const master = expenseMasters.filter(master => master._id == id);
    if (master) return master[0];
    return null;
}

function validateForm(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Name required';
    }

    return errors;
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.params.id;

    let master = {
        _id: '0', description: '', name: ''
    };

    if (id && state.expenseMasters.length > 0 ) {
        master = getExpenseById(state.expenseMasters, id);
        master.created = new Date(master.created);
    }

    return {
        master: master,
        initialValues: master
    };
}

ExpenseMasterNew = reduxForm({
    form: 'expensemaster',
    validate: validateForm
})(ExpenseMasterNew);

ExpenseMasterNew = connect(
    mapStateToProps, 
    {
        createExpenseMaster: createExpenseMaster
    }
)(ExpenseMasterNew);


export default ExpenseMasterNew;