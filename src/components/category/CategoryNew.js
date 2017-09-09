import React, { Component, PropTypes } from "react";
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {blue500, red500, greenA200, grey500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import { createCategory } from '../../actions';
import { materialTextField, materialCheckBox } from '../controls/index';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class CategoryNew extends Component {

    constructor( props, context ) {
        super( props, context );

        this.state = {
            category: Object.assign( {}, this.props.category ),
            errors: {}
        };
    }

    componentWillReceiveProps( nextProps ) {
        // if ( this.props.category.id != nextProps.category.id ) {
        //     this.setState( { category: Object.assign( {}. nextProps.category ) } );
        // }
    }

    saveCategory(props) {
        this.props.createCategory(props)
            .then(() => {
                this.context.router.push('/category');
            }, (error) => {
                console.info(error);
            });
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, touched, error, warning }  = this.props;
        
        const renderAddons = ({fields}) => (
            <div>
                <RaisedButton type="button" secondary={true} onClick={()=> fields.push()} label='Add Addons' />
                <ol>
                    {fields.map((addon, index) => (
                        <li key={index}>
                            <Field name={`${addon}.name`} component={materialTextField} label="Addon Name" />
                            <Field name={`${addon}.price`} component={materialTextField} label="Addon Price" />
                            <IconButton tooltip="Delete" onClick={()=> fields.remove(index)}>
                                <ActionDelete color={red500} />
                            </IconButton>
                        </li>
                        )
                    )}
                </ol>
            </div>
        )

        return (
            <form onSubmit={handleSubmit(this.saveCategory.bind(this))}>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Category" subtitle={ this.props.category._id == '0' ? 'Add New' : 'Edit'} />
                <CardText>
                    <div>
                        <Field name="name" component={materialTextField} label="Category Name" />
                    </div>
                    <div>
                        <Field name="description" component={materialTextField} label="Description"/>
                    </div>
                    <div>
                        <Field name="status" component={materialCheckBox} style={styles.checkbox} label="Status"/>
                    </div>
                    <div>&nbsp;</div>
                    <div>
                        <FieldArray name="addons" component={renderAddons}/>
                    </div>
                </CardText>
                <CardActions>
                    <RaisedButton type='submit' icon={<ContentSave />} label={ this.props.category._id == '0' ? 'Save' : 'Update'} primary={true} />
                    <RaisedButton icon={<ContentClear />} label="Cancel" secondary={true} containerElement={<Link to="/category" />}/>
                </CardActions>
            </Card>
        </form>
        );
    }

}

CategoryNew.propTypes = {
    // category: PropTypes.object.isRequired,
    // createCategory: PropTypes.func.isRequired,
}

// Pull in the React Router context so router is available on this.context.router
CategoryNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getCategoryById( categories, id ) {
    const category = categories.filter(category => category._id == id);
    if (category) return category[0];
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
    const categoryId = ownProps.params.id;
    
    let category = {
        _id: '0', name: '', description: '', status:1, addons: []
    };

    if (categoryId && state.categories.length > 0 ) {
        category = getCategoryById(state.categories, categoryId);
    }

    return {
        category: category,
        initialValues: category
    };
}

CategoryNew = reduxForm({
    form: 'category',
    validate: validateForm
})(CategoryNew);

CategoryNew = connect(
    mapStateToProps, 
    {createCategory: createCategory}
)(CategoryNew);

export default CategoryNew;

// export default reduxForm({
//     form: 'category',
//     fields: ['_id', 'name', 'description', 'addons', 'status' ],
//     validate: validateForm
// }, mapStateToProps, { createCategory: createCategory } )(CategoryNew);

// function mapDispatchToProps(dispatch) {
//     return {
//         createCategory: bindActionCreators(actions.createCategory, dispatch)
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CategoryNew);