import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import Customer from './Customer';
import { closeCustomerDetailDialog } from '../../actions';

const style = {
    card: {
        // width: 300,
        // maxWidth: 300,
        marginTop: 10,
        marginRight: 10,
        display: 'inline-block'
    },
    div: {
        width: 1000,
        maxWidth: 1000
    }
};

class CustomerDetailDialog extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { customer, customerDialog, closeCustomerDetailDialog } = this.props;
        const actions = [
            <FlatButton label="Close" primary={true} onTouchTap={()=> {closeCustomerDetailDialog()}} />,
        ];

         const listItem = (product, index) => {
            return (
                <ListItem key={index} leftCheckbox={<Checkbox />} initiallyOpen={true}
                    rightIcon={<Badge badgeContent={product.qty} primary={true} />}
                    primaryText={<span>{product.productName} <span style={{color: lightBlack}} >[{product.categoryName}]</span></span>} 
                    nestedItems={product.addons.length > 0 && [
                        product.addons.map((addon, i) => {
                            return <ListItem key={i+index} style={{margin:-1}} secondaryText={addon.name} leftIcon={<ContentAddCircle />} />
                        })
                  ]} >
                </ListItem>
            );
        }

        return (<Dialog
            title="Customer Detail" actions={actions} onRequestClose={()=>{ }}
            modal={true} open={customerDialog}
            autoScrollBodyContent={false} >
                    <Customer customer={customer} />
            </Dialog>);
    }
}

// CustomerDetailDialog.propTypes = {
//     customer: PropTypes.object.isRequired
// };

function mapStateToProps(state, ownProps) {
    return {
        customerDialog: state.dialog.isCustomerDetailDialog,
        customer: state.dialog.customer
    };
}

export default connect(mapStateToProps, { closeCustomerDetailDialog })(CustomerDetailDialog);
