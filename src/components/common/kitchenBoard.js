import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

import { loadCustomers } from '../../actions';
import { CUSTOMER_STATUS } from '../../../shared/constants';
import Customers from './Customers';

class KitchenBoard extends Component {

    render() {
        return (
            <div style={{
                    width: '98%',
            }}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Kitchen Board" />
                    </ToolbarGroup>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarSeparator />
                        <RaisedButton label="Refresh" primary={true} onClick={()=> this.props.loadCustomers()} />
                    </ToolbarGroup>
                </Toolbar>
                <div style={{
                    display: 'flex',
                    flexFlow: 'row wrap'                 
                }}>
                    <Customers customers={this.props.customers} status={CUSTOMER_STATUS.ISSUED} />
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

// function mapDispatchToProps(dispatch) {
//     return {
//         loadCustomers: bindActionCreators(loadCustomers, dispatch)
//     };
// }

export default connect(mapStateToProps, {loadCustomers: loadCustomers})(KitchenBoard);