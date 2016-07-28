import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';

const style = {
    card: {
        width: 270,
        maxWidth: 270,
        marginTop: 10,
        marginRight: 10,
        display: 'inline-block'
    },
    div: {
        width: 1400,
        maxWidth: 1400
    }
};

class Customers extends React.Component {

    constructor(props, context){
        super(props, context);
    }

    handleUpdate(customer, status) {
        console.log(customer._id);
        this.props.updateCustomerStatus( customer );
    }

    render() {
        return (
            <div style={style.div}>
                {this.props.customers.filter(customer=> customer.status === this.props.status).map(customer=>
                    <Card key={customer._id} style={style.card}>
                        <CardHeader
                            title={customer.carNumber} subtitle={customer.mobileNumber} />
                        <List>
                            <Subheader>Order List</Subheader>
                            {customer.products.map((product,index)=> 
                                <ListItem key={index}
                                    leftCheckbox={<Checkbox />}
                                    rightIcon={<Badge badgeContent={product.qty} secondary={true} />}
                                    primaryText={product.productName} secondaryText={product.categoryName} >
                                </ListItem>
                            )}
                        </List>
                        <CardActions>
                            { customer.status ===0 && <RaisedButton label="Finished" primary={true} onTouchTap={this.handleUpdate.bind(this, customer, 1)} />}
                            { customer.status ===1 && <RaisedButton label="Dispatch" primary={true} onTouchTap={this.handleUpdate.bind(this, customer, 2)} />}
                            <RaisedButton label="Discard" secondary={true} onTouchTap={this.handleUpdate.bind(this, customer, -1)} />
                        </CardActions>
                    </Card>
                )}
            </div>
        );
    }

}

// const Customers = ( { customers, status } ) => {
//     const handleUpdate = (id) => {
//         console.error("status", id);
//     }
//     return (
//         <div style={style.div}>
//             {customers.filter(customer=> customer.status === status).map(customer=>
//                 <Card key={customer._id} style={style.card}>
//                     <CardHeader
//                         title={customer.carNumber} subtitle={customer.mobileNumber} />
//                     <List>
//                         <Subheader>Order List</Subheader>
//                         {customer.products.map((product,index)=> 
//                             <ListItem key={index}
//                                 leftCheckbox={<Checkbox />}
//                                 rightIcon={<Badge badgeContent={product.qty} secondary={true} />}
//                                 primaryText={product.productName} secondaryText={product.categoryName} >
//                             </ListItem>
//                         )}
//                     </List>
//                     <CardActions>
//                         { customer.status ===0 && <RaisedButton label="Finished" primary={true} onTouchTap={handleUpdate.bind(this,1)} />}
//                         { customer.status ===1 && <RaisedButton label="Dispatch" primary={true} onTouchTap={handleUpdate.bind(this,2)} />}
//                         <RaisedButton label="Discard" secondary={true} onTouchTap={handleUpdate.bind(this,-1)} />
//                     </CardActions>
//                 </Card>
//             )}
//         </div>
//     );
// }

Customers.propTypes = {
    customers: React.PropTypes.array.isRequired,
    status: React.PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        customers: state.customers,
        status: ownProps.status
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateCustomerStatus: bindActionCreators(actions.updateCustomerStatus, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);