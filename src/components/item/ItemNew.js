import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

import { createItem } from '../../actions';

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
        const {handleSubmit, fields: { _id, code, name, uom, uomCount, description, status } }  = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.saveItem.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                    <CardHeader title="Item" subtitle={ _id.value === 0 ?  'Add New' : 'Edit'} />
                    <CardText>
                        <div>
                            <TextField name='code' floatingLabelText="Item Code" {...code} disabled={true} defaultValue="Auto Number" />
                        </div>
                        <div>
                            <TextField name='name' floatingLabelText="Item Name" {...name} errorText={name.touched && name.error} autoFocus  />
                        </div>
                        
                        <div>
                            <SelectField name='uom' floatingLabelText="UOM" {...uom} value={uom.value} errorText={uom.touched && uom.error} onChange={(event, index, value) => uom.onChange(value)} >
                                <MenuItem key={ITEM_UOM.NUMBER} value={ITEM_UOM.NUMBER} primaryText={ITEM_UOM_LABEL.NUMBER} />
                                <MenuItem key={ITEM_UOM.CARTON} value={ITEM_UOM.CARTON} primaryText={ITEM_UOM_LABEL.CARTON} />
                            </SelectField>
                        </div>
                        <div>
                            <TextField name='uomCount' floatingLabelText="Count" {...uomCount} errorText={uomCount.touched && uomCount.error} />
                        </div>
                        <div>
                            <TextField name='description' multiLine={true} rows={2} rowsMax={4} 
                                floatingLabelText="Description" {...description} />
                        </div>
                        <div>
                            <Checkbox label="Status" {...status} checked={status.value} onCheck={(e, checked) => status.onChange(checked)}  />
                        </div>
                    </CardText>
                    <CardActions>
                        <RaisedButton type='submit' icon={<ContentSave />} label={_id.value === 0 ? 'Save' : 'Update'} primary={true} ></RaisedButton>
                        <RaisedButton icon={<ContentClear />} label="Cancel" linkButton containerElement={<Link to="/item" />} />
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
    console.log(values);

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

    return {
        item: item,
        initialValues: item
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         createItem: bindActionCreators(actions.createItem, dispatch)
//     };
// }

export default reduxForm({
    form: 'item',
    fields: ['_id', 'code', 'name', 'uom', 'uomCount', 'description', 'status' ],
    validate: validateForm
}, mapStateToProps, { createItem: createItem } )(ItemNew);

//export default connect(mapStateToProps, mapDispatchToProps)(ItemNew);