import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import PurchaseList from './PurchaseList';

const fabStyle = {
    marginTop: 10,
    marginLeft: '90%'
};

class PurchasePage extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.loadPurchaseOrders();
        this.props.loadSuppliers();
    }

    render() {
        const { purchases, suppliers } = this.props;
        if (!purchases) {
            return (<div>Loading....</div>);
        }

        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} containerElement={<Link to={'/purchase/new'} />}>
                    <ContentAdd />
                </FloatingActionButton>
                <PurchaseList purchases={purchases} suppliers={suppliers} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { 
        purchases: state.purchaseOrders,
        suppliers: state.suppliers 
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadPurchaseOrders: bindActionCreators(actions.loadPurchaseOrders, dispatch),
        loadSuppliers: bindActionCreators(actions.loadSuppliers, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePage);