import React from 'react';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';


const DayExpense = ({expenses}) => {
    if (!expenses) return (<div>Loading...</div>);
    return (
        <Card style={{flex: 2, marginLeft: 10}}>
            <CardHeader title="Expense " subtitle={'Total : (' + expenses.length + ')'} /> 
            <CardText>
                <List>
                    {expenses && expenses.map((expense,i) => [
                            <ListItem key={i} primaryText={
                                    <p>{expense.categoryName}  <span style={{float: 'right'}}> {expense.amount.toFixed(3)}</span></p>
                                }
                                secondaryTextLines={2} secondaryText={<p>{expense.description}</p>} />,
                            <Divider />
                        ]
                    )}
                </List>
            </CardText>
        </Card>
    );
}

export default DayExpense;