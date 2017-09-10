import React, { Component, PropTypes } from "react";
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

import { createSupplier, successNotification, errorNotification } from '../../actions';

import { materialTextField, materialCheckBox } from '../controls/index';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class SupplierNew extends Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
            supplier: Object.assign( {}, this.props.supplier ),
            errors: {}
        };
    }

    saveSupplier(props) {
        const { createSupplier, successNotification, errorNotification } = this.props;
        createSupplier(props)
            .then(() => {
                successNotification('Supplier added successfully !');
                this.context.router.push('/supplier');
            }, (error) => {
                console.info(error);
                errorNotification('Something went wrong !');
            });
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, touched, error, warning }  = this.props;

        return (
            <form onSubmit={handleSubmit(this.saveSupplier.bind(this))}>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0'}} >
                <CardHeader title="Supplier" subtitle={ this.props.supplier._id == '0' ? 'Add New' : 'Modify'}  />
                <CardText>
                    <div>
                        <Field name="name" component={materialTextField} label="Name"/>
                    </div>
                    <div>
                        <Field name="person" component={materialTextField} label="Person Name"/>
                    </div>
                    <div>
                        <Field name="contact" component={materialTextField} label="Contact No"/>
                    </div>
                    <div>
                        <Field name="description" component={materialTextField} label="Description"/>
                    </div>
                    <div>
                        <Field name="status" component={materialCheckBox} label="Status"/>
                    </div>
                </CardText>
                <CardActions>
                    <RaisedButton type='submit' icon={<ContentSave />} label={ this.props.supplier._id == '0' ? 'Save' : 'Update' } primary={true} />
                    <RaisedButton icon={<ContentClear />} label="Cancel" secondary={true} containerElement={<Link to="/supplier" />}/>
                </CardActions>
            </Card>
        </form>
        );
    }

}

SupplierNew.propTypes = {
    // category: PropTypes.object.isRequired,
    // createCategory: PropTypes.func.isRequired,
}

// Pull in the React Router context so router is available on this.context.router
SupplierNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getSupplierById( suppliers, id ) {
    const supplier = suppliers.filter(supplier => supplier._id == id);
    if (supplier) return supplier[0];
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
    const supplierId = ownProps.params.id;
    
    let supplier = {
        _id: '0', name: '', person: '', contact: '', description: '', status:1
    };

    if (supplierId && state.suppliers.length > 0 ) {
        supplier = getSupplierById(state.suppliers, supplierId);
    }

    return {
        supplier: supplier,
        initialValues: supplier
    };
}

function validateForm(values) {
    const errors = {};
    if (!values.name) {
        errors.name = 'Name is required';
    }
    return errors;
}

SupplierNew = reduxForm({
    form: 'supplier',
    validate: validateForm
})(SupplierNew);

SupplierNew = connect(
    mapStateToProps, 
    {createSupplier, successNotification, errorNotification}
)(SupplierNew);

export default SupplierNew;