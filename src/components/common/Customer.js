import React, { PropTypes } from 'react';

import Subheader from 'material-ui/Subheader';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {grey400, darkBlack, lightBlack, blue500, teal500, yellow50} from 'material-ui/styles/colors';

import Moment from 'moment';

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

const Customer = ({customer}) => {
    return (<Card key={customer.id} style={style.card}>
                <CardHeader style={{width:400}}
                    title={
                        <span style={{fontWeight: 'bold', color: '#3F51B5'}}>
                            Bill : {customer.billNo} @ {Moment(customer.created).format('DD/MM/YYYY h:mm')}&nbsp; 
                            {customer.option==='1' ? 
                                <span style={{backgroundColor:teal500, padding:2, color:yellow50}}>Take Away </span> : 
                                <span style={{backgroundColor:blue500, padding:2, color:yellow50}}>Dine In </span>
                            }</span>
                    } 
                    subtitle={<p>{customer.option==='1' ? 'Car/Mobile' : 'Table'} : {customer.carNumber == '' || undefined ? customer.mobileNumber : customer.carNumber}</p>} />
                <List>
                    <Subheader>Order List : Total Items <span style={{backgroundColor:teal500, padding:2, color:yellow50}}>{customer.products && customer.products.length} </span></Subheader>
                    <Divider />
                    {customer.products && customer.products.map((product,index) => 
                        <span>{listItem(product, index)}
                        <Divider /></span>
                    )}
                </List>
            </Card>);
}

Customer.propTypes = {
    customer: PropTypes.object.isRequire
}

export default Customer;