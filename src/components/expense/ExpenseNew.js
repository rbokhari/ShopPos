import React, { Component, PropTypes } from "react";
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
//import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { DatePicker, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

import { loadExpenseMasters, createExpense } from '../../actions';
import { materialTextField, materialCheckBox } from '../controls/index';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class ExpenseNew extends Component {

    
    constructor( props, context ) {
        super( props, context );

        this.props.loadExpenseMasters();

        this.state = {
            //expense: Object.assign( {}, this.props.expense ),
            errors: {}
        };
    }

    saveExpense(props) {
        props.categoryName = this.props.masters.filter(master => master._id == props.categoryId)[0].name;
        this.props.createExpense(props)
            .then(() => {
                this.context.router.push('/expense');
            }, (error) => {
                console.info(error);
            });
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, touched, error, warning, masters }  = this.props;

        return (
            <form onSubmit={handleSubmit(this.saveExpense.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                    <CardHeader title="Expense" subtitle={ this.props.expense._id === '0' ? 'Add New' : 'Edit'} />
                    <CardText>
                        <Field name="created" component={DatePicker} 
                            formatDate={date => date.getDate() + '/' + (date.getMonth() +1) + '/' + date.getFullYear()} 
                            floatingLabelText="Date"/>
                        <div>
                            <Field name="categoryId" component={SelectField} hintText="master" floatingLabelText="Select Category">
                                {masters.map(master => 
                                    <MenuItem key={master._id} value={master._id} primaryText={master.name} />
                                )}
                            </Field>
                        </div>
                        <div>
                            <Field name="amount" component={materialTextField} label="Amount"/>
                        </div>
                        <div>
                            <Field name="description" component={materialTextField} label="Description"/>
                        </div>
                    </CardText>
                    <CardActions>
                        <RaisedButton type='submit' icon={<ContentSave />} label={this.props.expense._id === '0' ? 'Save' : 'Update'} primary={true} />
                        <RaisedButton icon={<ContentClear />} label="Cancel" containerElement={<Link to="/expense" />}/>
                    </CardActions>
                </Card>
            </form>
        );
    }

}

ExpenseNew.propTypes = {
    // category: PropTypes.object.isRequired,
    // createCategory: PropTypes.func.isRequired,
}

// Pull in the React Router context so router is available on this.context.router
ExpenseNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getExpenseById( expenses, id ) {
    const expense = expenses.filter(expense => expense._id == id);
    if (expense) return expense[0];
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
    const expenseId = ownProps.params.id;

    let expense = {
        _id: '0', description: '', amount: 0, created: '', categoryId: 0, categoryName: ''
    };

    if (expenseId && state.expenses.length > 0 ) {
        expense = getExpenseById(state.expenses, expenseId);
        expense.created = new Date(expense.created);
    }
    console.info(state);

    return {
        expense: expense,
        masters: state.expenseMasters,
        initialValues: expense
    };
}

ExpenseNew = reduxForm({
    form: 'expense',
})(ExpenseNew);

ExpenseNew = connect(
    mapStateToProps, 
    {
        loadExpenseMasters: loadExpenseMasters,
        createExpense: createExpense
    }
)(ExpenseNew);

export default ExpenseNew;