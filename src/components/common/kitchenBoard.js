import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import Customers from './Customers';

class KitchenBoard extends Component {

    render() {
        return (
            <div style={{
                    maxwidth: 1200,
                    width: '100%',
            }}>
                <h1>Kitchen Board</h1>
                <div style={{
                    display: 'flex',
                    flexFlow: 'row wrap'                 
                }}>
                    <Customers customers={this.props.customers} status={0} />
                </div>
            </div>
        );
    }

}

KitchenBoard.propTypes = {
    // categories: React.PropTypes.array.isRequired,
    // products: React.PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        customers: state.customers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createCustomer: bindActionCreators(actions.createCustomer, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(KitchenBoard);