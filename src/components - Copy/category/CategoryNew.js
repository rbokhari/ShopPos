import React, { Component, PropTypes } from "react";
import { Link } from 'react-router';
import { reduxForm, Field, FieldArray } from 'redux-form';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

import { createCategory } from '../../actions';

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
        const {handleSubmit, fields: { _id, name, description, addons, status } }  = this.props;
        const arrayData = [{name: '', price: ''}];
// const renderAddons = (fields) => (
//     fields.map((addon, index) => (
//         <div key={index}>
//             <input type='text' />
//         </div>
//         )
//     )
// )

        return (
            <form onSubmit={handleSubmit(this.saveCategory.bind(this))}>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Category" subtitle={ _id.value === '0' ? 'Add New' : 'Edit'} />
                <CardText>
                    <div>
                        <TextField name="name" 
                            floatingLabelText="Category Name" {...name} errorText={name.touched && name.error} />
                    </div>
                    <div>
                        <TextField name="description" floatingLabelText="Description" {...description} />
                    </div>
                    <div>
                        <Checkbox name="status" label="Status" {...status} style={styles.checkbox} checked={status.value} onCheck={(e, checked) => status.onChange(checked)} />
                    </div>
                    <div>
                        <FieldArray name="addons" component={addons => 
                            addons.fields.map((addon, index) => 
                                <h4>Yes</h4>
                            )
                        } />
                    </div>
                </CardText>
                <CardActions>
                    <RaisedButton type='submit' icon={<ContentSave />} label={_id.value === '0' ? 'Save' : 'Update'} primary={true} />
                    <RaisedButton icon={<ContentClear />} label="Cancel" linkButton containerElement={<Link to="/category" />}/>
                </CardActions>
            </Card>
        </form>
            // <CategoryForm onChange={this.updateCategoryState} onSave={this.saveCategory}
            //     category={this.state.category} errors={this.state.errors} />
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
        _id: '0', name: '', description: '', addons: [{name:'', price:0}], status:1
    };

    if (categoryId && state.categories.length > 0 ) {
        category = getCategoryById(state.categories, categoryId);
    }

    return {
        category: category,
        initialValues: category
    };
}

export default reduxForm({
    form: 'category',
    fields: ['_id', 'name', 'description', 'addons', 'status' ],
    validate: validateForm
}, mapStateToProps, { createCategory: createCategory } )(CategoryNew);

// function mapDispatchToProps(dispatch) {
//     return {
//         createCategory: bindActionCreators(actions.createCategory, dispatch)
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CategoryNew);