import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ItemForm from './ItemForm';

class ItemNew extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            item: Object.assign({}, this.props.item),
            errors: {}
        };

        this.updateItemState = this.updateItemState.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.item.id != nextProps.item.id) {
            this.setState({item: Object.assign({}. nextProps.item)});
        }
    }

    updateItemState(event) {
        const field = event.target.name;
        const item = this.state.item;
        item[field] = event.target.value;
        this.setState({
            item: item
        });
    }

    saveItem(event) {
        event.preventDefault();
        //console.log(`new value is ${this.state.item}`);
        this.props.createItem(this.state.item);
        this.context.router.push('/item');
    }

    render() {
        return (
            <ItemForm onChange={this.updateItemState} onSave={this.saveItem}
                item={this.state.item} errors={this.state.errors} />
        );
    }

}

ItemNew.propTypes = {
    item: PropTypes.object.isRequired,
    createItem: PropTypes.func.isRequired,
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

function mapStateToProps(state, ownProps) {
    const itemId = ownProps.params.id;

    let item = {
        companyId: '', officeId: '', code: '', name: '', description: '', stock: 0, status: 1
    };

    if (itemId && state.items.length > 0 ) {
        item = getItemById(state.items, itemId);
    }

    return {
        item: item
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createItem: bindActionCreators(actions.createItem, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemNew);