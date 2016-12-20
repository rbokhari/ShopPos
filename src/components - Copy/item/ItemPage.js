import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import ItemList from './ItemList';

const fabStyle = {
    marginTop: 10,
    marginLeft: '90%'
};

class ItemPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.props.loadItems();
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.branch.branchId !== localStorage.getItem('officeId')) {
        //     this.props.loadItems();
        // }
    }

    render() {
        const {items} = this.props;
        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} linkButton containerElement={<Link to={'/item/new'} />}>
                    <ContentAdd />
                </FloatingActionButton>
                <ItemList items={items} />
            </div>
        );
    }
}

ItemPage.propTypes = {
    items: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return { 
        items: state.items,
        branch: state.branch.current  
    };
}

export default connect(mapStateToProps, actions)(ItemPage);