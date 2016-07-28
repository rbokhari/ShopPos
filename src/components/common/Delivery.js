import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';

const style = {
    card: {
        width: 340,
        maxWidth: 340,
        marginTop: 10,
        marginRight: 10,
        display: 'inline-block'
    },
    div: {
        width: 1400,
        maxWidth: 1400
    }
};

const Kitchen = ( { customers, onFinished, onDiscard } ) => {
    return (
        <div style={style.div}>
            {customers.map(customer=>
                <Card key={customer._id} style={style.card}>
                    <CardHeader
                        title={customer.carNumber}
                        subtitle={customer.mobileNumber} />
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
                        <RaisedButton label="Finished" primary={true} onTouchTap={onFinished} />
                        <RaisedButton label="Discard" secondary={true} onTouchTap={onDiscard} />
                    </CardActions>
                </Card>
            )}
        </div>
    );
}

Kitchen.propTypes = {
    customers: React.PropTypes.array.isRequired,
    onFinished: React.PropTypes.func.isRequired,
    onDiscard: React.PropTypes.func.isRequired
};

export default Kitchen;