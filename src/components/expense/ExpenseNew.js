import React, { Component, PropTypes } from "react";
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

import { createExpense } from '../../actions';

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

        this.state = {
            //expense: Object.assign( {}, this.props.expense ),
            errors: {}
        };
    }

    saveExpense(props) {
        this.props.createExpense(props)
            .then(() => {
                this.context.router.push('/expense');
            }, (error) => {
                console.info(error);
            });
    }

    render() {
        const {handleSubmit, fields: { _id, created, description, amount } }  = this.props;

        return (
            <form onSubmit={handleSubmit(this.saveExpense.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                    <CardHeader title="Expense" subtitle={ _id.value === '0' ? 'Add New' : 'Edit'} />
                    <CardText>
                        <DatePicker name='created' floatingLabelText="Date" value={created.value != ''? new Date(created.value) : null}  
                            mode="landscape" {...created} onChange={(e, val) => {return created.onChange(val)}} />
                        <div>{created.value}
                            <TextField name="amount" 
                                floatingLabelText="Amount" {...amount} errorText={amount.touched && amount.error} />
                        </div>
                        <div>
                            <TextField name="description" 
                                floatingLabelText="Description" {...description} />
                        </div>
                    </CardText>
                    <CardActions>
                        <RaisedButton type='submit' icon={<ContentSave />} label={_id.value === '0' ? 'Save' : 'Update'} primary={true} />
                        <RaisedButton icon={<ContentClear />} label="Cancel" linkButton containerElement={<Link to="/expense" />}/>
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
        _id: '0', description: '', amount: 0, created: ''
    };

    if (expenseId && state.expenses.length > 0 ) {
        expense = getExpenseById(state.expenses, expenseId);
    }
    console.info(expense);

    return {
        expense: expense,
        initialValues: expense
    };
}

export default reduxForm({
    form: 'expense',
    fields: ['_id', 'created', 'amount', 'description' ],
    validate: validateForm
}, mapStateToProps, { createExpense: createExpense } )(ExpenseNew);
