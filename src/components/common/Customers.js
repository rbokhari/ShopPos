import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';
import Moment from 'moment';

import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionGrade  from 'material-ui/svg-icons/action/grade';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import DeviceAccessTime from 'material-ui/svg-icons/device/access-time';

import {grey400, darkBlack, lightBlack, blue500, teal500, yellow50} from 'material-ui/styles/colors';

import * as actions from '../../actions';
import { CUSTOMER_STATUS } from '../../../shared/constants';

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
        width: 360,
        maxWidth: 360,
        marginTop: 10,
        marginRight: 13,
        display: 'inline-block',
        verticalAlign:'top'
    },
    div: {
        width: '1800px'
    }
};

class Customers extends React.Component {

    constructor(props, context){
        super(props, context);
    }

    handleUpdate(customer, status) {
        this.props.updateCustomerStatus( customer, status );
    }

    render() {
        const statusId = this.props.status;

        const statusCheck = (customer) => {
            if (statusId === CUSTOMER_STATUS.ISSUED) {
                return customer.status == CUSTOMER_STATUS.ISSUED || customer.status == CUSTOMER_STATUS.START;
            } else if (statusId === CUSTOMER_STATUS.FINISH) {
                return customer.status == statusId;
            }
        };

        const listItem = (product, index) => {
            return (
                <ListItem key={index} leftCheckbox={<Checkbox />} initiallyOpen={true}
                    rightIcon={<Badge badgeContent={product.qty} primary={true} />}
                    primaryText={<span>{product.productName}111 <span style={{color: yellow50}} >[{product.categoryName}]</span></span>} 
                    nestedItems={product.addons.length > 0 && [
                        product.addons.map((addon, i) => {
                            return <ListItem key={i+index} style={{margin:-1}} secondaryText={addon.name} leftIcon={<ContentAddCircle />} />
                        })
                  ]} >
                </ListItem>
            );
        }

        return (
            <div style={style.div}>
                {_.sortBy(this.props.customers.filter(statusCheck), ['created']).map(customer=>
                    <Card key={customer._id} style={style.card}>
                        <CardHeader style={{width:400}}
                            title={
                                <span style={{fontWeight: 'bold', color: yellow50}}>
                                    Bill : {customer.billNo} @ {Moment(customer.created).format('dddd h:mm')}&nbsp;
                                    {customer.option==='1' ? 
                                        <span style={{backgroundColor:teal500, padding:2, color:yellow50}}>Take Away </span> : 
                                        <span style={{backgroundColor:blue500, padding:2, color:yellow50}}>Dine In </span>
                                    }</span>
                            } 
                            subtitle={<p>{customer.option==='1' ? 'Car/Mobile' : 'Table'} : {customer.carNumber == '' || undefined ? customer.mobileNumber : customer.carNumber}</p>} />
                        <List>
                            <Subheader>Order List : Total Items <span style={{backgroundColor:teal500, padding:2, color:yellow50}}>{customer.products.length} </span></Subheader>
                            <Divider />
                            {customer.products.map((product,index) => 
                                <span>{listItem(product, index)}
                                <Divider /></span>
                            )}
                        </List>
                        <CardActions>
                            { customer.status === CUSTOMER_STATUS.ISSUED && 
                                <RaisedButton label="Start" icon={<ActionDone />} primary={true} onTouchTap={this.handleUpdate.bind(this, customer, CUSTOMER_STATUS.START)} />}
                            { customer.status === CUSTOMER_STATUS.START && 
                                <RaisedButton label="Finish" icon={<ActionDoneAll />} primary={true} onTouchTap={this.handleUpdate.bind(this, customer, CUSTOMER_STATUS.FINISH)} />}
                            { customer.status === CUSTOMER_STATUS.FINISH && 
                                <RaisedButton label="Dispatch" icon={<ActionDone />} primary={true} onTouchTap={this.handleUpdate.bind(this, customer, CUSTOMER_STATUS.DELIVERED)} />}
                            <RaisedButton label="Discard" icon={<ContentClear />} secondary={true} onTouchTap={this.handleUpdate.bind(this, customer, CUSTOMER_STATUS.DISCARD)} />
                        </CardActions>
                    </Card>
                )}
            </div>
        );
    }

}

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

//export default connect(mapStateToProps, { updateCustomerStatus : actions.updateCustomerStatus })(Customers);       can be written as with shortcut