import React from 'react';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Moment from 'moment';

const DayPurchase = ({purchases}) => {
    if (!purchases) return (<div>Loading...</div>);
    return (
        <Card style={{flex: 2, marginLeft: 10}}>
            <CardHeader title="Purchase" subtitle={'Total : (' + purchases.length + ')'} /> 
            <CardText>
                <List>
                    {purchases && purchases.map((purchase,i) => [
                            <ListItem key={purchase._id} style={{marginTop: 0}} 
                            primaryText={
                                <p>{purchase.billNo} <span style={{float: 'right'}}>{purchase.total && purchase.total.toFixed(3)}</span></p>
                            }
                            secondaryText={
                                <p>{Moment(purchase.billDate).format('MMM DD, YYYY')} <span style={{float: 'right'}}>Total Items : {purchase.items.length}</span></p>
                            } />, 
                            <Divider />
                        ]
                    )}
                </List>
            </CardText>
        </Card>
    );
}

export default DayPurchase;