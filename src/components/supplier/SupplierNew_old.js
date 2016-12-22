// import React, { Component, PropTypes } from "react";
// import { Link } from 'react-router';
// import { reduxForm } from 'redux-form';

// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import TextField from 'material-ui/TextField';
// import Checkbox from 'material-ui/Checkbox';
// import RaisedButton from 'material-ui/RaisedButton';

// import ContentSave from 'material-ui/svg-icons/content/save';
// import ContentClear from 'material-ui/svg-icons/content/clear';

// import { createSupplier } from '../../actions';

// const styles = {
//   block: {
//     maxWidth: 250,
//   },
//   checkbox: {
//     marginBottom: 16,
//   },
// };

// class SupplierNew extends Component {

//     constructor( props, context ) {
//         super( props, context );

//         this.state = {
//             supplier: Object.assign( {}, this.props.supplier ),
//             errors: {}
//         };
//     }

//     componentWillReceiveProps( nextProps ) {
//         // if ( this.props.category.id != nextProps.category.id ) {
//         //     this.setState( { category: Object.assign( {}. nextProps.category ) } );
//         // }
//     }

//     saveSupplier(props) {
//         this.props.createSupplier(props)
//             .then(() => {
//                 this.context.router.push('/supplier');
//             }, (error) => {
//                 console.info(error);
//             });
//     }

//     render() {
//         const {handleSubmit, pristine, reset, submitting, fields: { _id, name, person, contact, description, status }, meta: { touched, error, warning } }  = this.props;

//         return (
//             <form onSubmit={handleSubmit(this.saveSupplier.bind(this))}>
//             <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
//                 <CardHeader title="Supplier"  />
//                 <CardText>
//                     <div>
//                         <TextField name="name" 
//                             floatingLabelText="Supplier Name" {...name} errorText={name.touched && name.error} />
//                     </div>
//                     <div>
//                         <TextField name="person" 
//                             floatingLabelText="Person Name" {...person} errorText={person.touched && person.error} />
//                     </div>
//                     <div>
//                         <TextField name="contact" 
//                             floatingLabelText="Contact No" {...contact} errorText={contact.touched && contact.error} />
//                     </div>
//                     <div>
//                         <TextField name="description" 
//                             floatingLabelText="Description" {...description} />
//                     </div>
//                     <div>
//                         <Checkbox name="status" label="Status" {...status} style={styles.checkbox} checked={status.value} onCheck={(e, checked) => status.onChange(checked)} />
//                     </div>
//                 </CardText>
//                 <CardActions>
//                     <RaisedButton type='submit' icon={<ContentSave />} label={_id.value === '0' ? 'Save' : 'Update'} primary={true} />
//                     <RaisedButton icon={<ContentClear />} label="Cancel" linkButton containerElement={<Link to="/supplier" />}/>
//                 </CardActions>
//             </Card>
//         </form>
//             // <CategoryForm onChange={this.updateCategoryState} onSave={this.saveCategory}
//             //     category={this.state.category} errors={this.state.errors} />
//         );
//     }

// }

// SupplierNew.propTypes = {
//     // category: PropTypes.object.isRequired,
//     // createCategory: PropTypes.func.isRequired,
// }

// // Pull in the React Router context so router is available on this.context.router
// SupplierNew.contextTypes = {
//     router: PropTypes.object.isRequired
// }

// function getSupplierById( suppliers, id ) {
//     const supplier = suppliers.filter(supplier => supplier._id == id);
//     if (supplier) return supplier[0];
//     return null;
// }

// function validateForm(values) {
//     const errors = {};
 
//     if (!values.name) {
//         errors.name = 'Name required';
//     }

//     return errors;
// }

// function mapStateToProps(state, ownProps) {
//     const supplierId = ownProps.params.id;
    
//     let supplier = {
//         _id: '0', name: '', person: '', contact: '', description: '', status:1
//     };

//     if (supplierId && state.suppliers.length > 0 ) {
//         supplier = getSupplierById(state.suppliers, supplierId);
//     }

//     return {
//         supplier: supplier,
//         initialValues: supplier
//     };
// }

// export default reduxForm({
//     form: 'supplier',
//     fields: ['_id', 'name', 'person', 'contact', 'description', 'status' ],
//     validate: validateForm
// }, mapStateToProps, { createSupplier: createSupplier } )(SupplierNew);
