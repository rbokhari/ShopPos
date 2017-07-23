import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

import { createItem } from '../../actions';
import { materialTextField, materialCheckBox, materialSelectField } from '../controls/index';

import { ITEM_UOM, ITEM_UOM_LABEL } from '../../../shared/constants.js';

class ItemNew extends Component {

    // static contextTypes = {
    //     router: PropTypes.object
    // };

    constructor(props, context) {
        super(props, context);

        this.state = {
            item: Object.assign({}, this.props.item),
            errors: {}
        };

        //this.updateItemState = this.updateItemState.bind(this);
        //this.saveItem = this.saveItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.item.id != nextProps.item.id) {
        //     this.setState({item: Object.assign({}. nextProps.item)});
        // }
    }

    saveItem(props) {
        console.log(props);
        this.props.createItem(props)
            .then(() => {
                this.context.router.push('/item');
            }, (error) => {
                console.info(error);
            });
    }

    render() {
        //const {handleSubmit, fields: { _id, code, name, uom, uomCount, description, status } }  = this.props;
        const {handleSubmit, pristine, reset, submitting, touched, error, warning }  = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.saveItem.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                    <CardHeader title="Item"  />
                    <CardText>
                        <div>
                            <Field name="code" component={materialTextField} label="Item Code"/>
                        </div>
                        <div>
                            <Field name="name" component={materialTextField} label="Item Name"/>
                        </div>
                        
                        <div>
                            <Field name="uom" component={materialSelectField} value={this.props.item.uom} label="UOM">
                                <MenuItem key={ITEM_UOM.NUMBER} value={ITEM_UOM.NUMBER} primaryText={ITEM_UOM_LABEL.NUMBER} />
                                <MenuItem key={ITEM_UOM.KG} value={ITEM_UOM.KG} primaryText={ITEM_UOM_LABEL.KG} />
                                <MenuItem key={ITEM_UOM.CARTON} value={ITEM_UOM.CARTON} primaryText={ITEM_UOM_LABEL.CARTON} />
                            </Field>
                        </div>
                        
                        {this.props.user && this.props.user.roleId == 1 && <div>
                            <Field name="uomCount" component={materialTextField} label="Count"/>
                        </div>}
                        <div>
                            <Field name="description" component={materialTextField} label="Description" multiLine={true} rows={2} rowsMax={4}  />
                        </div>
                        <div>
                            <Field name="status" component={materialCheckBox} label="Status"/>
                        </div>
                    </CardText>
                    <CardActions>
                        <RaisedButton type='submit' icon={<ContentSave />} label={this.props.item._id.value === 0 ? 'Save' : 'Update'} primary={true} ></RaisedButton>
                        <RaisedButton icon={<ContentClear />} label="Cancel" containerElement={<Link to="/item" />} />
                    </CardActions>
                </Card>
            </form>
        );
    }
}
            // <ItemForm onChange={this.updateItemState} onSave={this.saveItem}
            //     item={this.state.item} errors={this.state.errors} />

ItemNew.propTypes = {
    //item: PropTypes.object.isRequired,
    //createItem: PropTypes.func.isRequired,
}

// Pull in the React Router context so router is available on this.context.router
ItemNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getItemById(items, id) {
    const item = items.filter(item => item._id == id);
    if (item) return item[0];
    return null;
}

function validateForm(values) {
    const errors = {};
    
    if (!values.name) {
        errors.name = 'Name required';
    }

    if (!values.uom) {
        errors.uom = 'UOM required';
    }

    if (!values.uomCount) {
        errors.uomCount = 'Count required';
    }

    return errors;
}

function mapStateToProps(state, ownProps) {
    const itemId = ownProps.params.id;

    let item = {
        _id: 0, code: '', name: '', uom: 0, uomCount: 1, description: '', stock: 0, status: true
    };

    if (itemId && state.items.length > 0 ) {
        item = getItemById(state.items, itemId);
    }
console.info('user', item);
    return {
        user: state.auth.user,
        item: item,
        initialValues: item
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         createItem: bindActionCreators(actions.createItem, dispatch)
//     };
// }

// export default reduxForm({
//     form: 'item',
//     fields: ['_id', 'code', 'name', 'uom', 'uomCount', 'description', 'status' ],
//     validate: validateForm
// }, mapStateToProps, { createItem: createItem } )(ItemNew);


ItemNew = reduxForm({
    form: 'item',
    //validate: validateForm
})(ItemNew);

ItemNew = connect(
    mapStateToProps, 
    {createItem: createItem}
)(ItemNew);

export default ItemNew;

//export default connect(mapStateToProps, mapDispatchToProps)(ItemNew);