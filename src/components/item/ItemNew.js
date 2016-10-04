import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

import { createItem } from '../../actions';
import ItemForm from './ItemForm';

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
        if (this.props.item.id != nextProps.item.id) {
            this.setState({item: Object.assign({}. nextProps.item)});
        }
    }

    saveItem(props) {
        this.props.createItem(props)
            .then(() => {
                this.context.router.push('/item');
            }, (error) => {
                console.info(error);
            });
    }

    render() {
        const {handleSubmit, fields: { _id, code, name, description, status } }  = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.saveItem.bind(this))}>
                <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                    <CardHeader title="Item" subtitle={ _id.value === 0 ?  'Add New' : 'Edit'} />
                    <CardText>
                        <div>
                            <TextField name='code' floatingLabelText="Item Code" {...code} errorText={code.touched && code.error} />
                        </div>
                        <div>
                            <TextField name='name' floatingLabelText="Item Name" {...name} errorText={name.touched && name.error} />
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
                        <RaisedButton icon={<ContentClear />} label="Cancel" secondary={true} linkButton containerElement={<Link to="/item" />} />
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

    if (!values.code) {
        errors.code = 'Code required';
    }

    if (!values.name) {
        errors.name = 'Name required';
    }

    return errors;
}

function mapStateToProps(state, ownProps) {
    const itemId = ownProps.params.id;

    let item = {
        _id: 0, code: '', name: '', description: '', stock: 0, status: 1
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
    fields: ['_id', 'code', 'name', 'description', 'status' ],
    validate: validateForm
}, mapStateToProps, { createItem: createItem } )(ItemNew);

//export default connect(mapStateToProps, mapDispatchToProps)(ItemNew);