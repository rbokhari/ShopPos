import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
//import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Smartphone from 'material-ui/svg-icons/hardware/smartphone';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import Moment from 'moment';

import { connect } from 'react-redux';
import { loadDayById, printDay, successNotification, errorNotification } from '../../actions';

import { USER_ROLE } from '../../../shared/constants';
import { Icons } from '../theme';
import BusyIndicator from '../common/BusyIndicator';
import {blue500, yellow600, red400, purple400, green400, green700, blue400, blue300, blue800} from 'material-ui/styles/colors';
import { green900 } from 'material-ui/styles/colors';

import { DayExpense, DayPurchase, Day } from './index';

const cardStyle = {
  display: 'inline-block',
  margin: '40px 32px 16px 0',
  flexGrow: 1
};

class DaySummary extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id, loadDayById, day} = this.props;
        loadDayById(id);
        // if (day && day.today) {
        //     const openDate = new Date(day.today);
        //     //openDate.setHours(0,0,0);
        //     const closeDate = new Date(day.close);
        //     //closeDate.setHours(23,59,0);
        //     // loadExpenseTransaction(openDate, closeDate);
        //     // loadPurchaseTransaction(openDate, openDate);
        // }
    }

    printReceipt() {
        const { printDay, id } = this.props;
        printDay(id)
            .then(res => {
                successNotification('Print send !');
            })    
    }


    render() {
        const {day, expenses, purchases} = this.props;
        const CLOSE_DAY_STATUS  = 1;
        return (
            
            <div style={{display: 'flex', flexFlow: 'row wrap', width:'100%', marginTop: 10}}>
                <Day day={day} onPrintReceiptClick={this.printReceipt.bind(this) } />
                <DayExpense expenses={expenses} />
                <DayPurchase purchases={purchases} />
                {/* <Card style={{flex: 2, marginLeft: 10}}>
                    <CardHeader title="Expense " subtitle={'Total : (' + expenses.length + ')'} /> 
                    <CardText>
                        {day.status == CLOSE_DAY_STATUS && <List>
                            {expenses && expenses.map((expense,i) => [
                                    <ListItem key={i} primaryText={
                                            <p>{expense.categoryName}  <span style={{float: 'right'}}> {expense.amount.toFixed(3)}</span></p>
                                        }
                                        secondaryTextLines={3} secondaryText={<p>{expense.description}</p>} />,
                                    <Divider />
                                ]
                            )}
                        </List>}
                    </CardText>
                </Card> */}
                {/* <Card style={{flex: 2, marginLeft: 10}}>
                    <CardHeader title="Purchase" subtitle={'Total : (' + purchases.length + ')'} /> 
                    <CardText>
                        {day.status == CLOSE_DAY_STATUS && <List>
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
                        </List>}
                    </CardText>
                </Card> */}
            </div>
        );
    }
}

DaySummary.propTypes = {
    day: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return { 
        id: ownProps.params.dayId,
        day: state.days.day,
        expenses: state.days.expenses, // state.reportExpenseData,
        purchases: state.days.purchases, // state.reportPurchaseData
        user: state.auth.user
    };
}

export default connect(mapStateToProps, { loadDayById, printDay, successNotification, errorNotification })(DaySummary);