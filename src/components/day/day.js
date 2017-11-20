import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
//import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Smartphone from 'material-ui/svg-icons/hardware/smartphone';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import Moment from 'moment';

import { USER_ROLE } from '../../../shared/constants';
import { Icons } from '../theme';
import BusyIndicator from '../common/BusyIndicator';
import {blue500, yellow600, red400, purple400, green400, green700, blue400, blue300, blue800} from 'material-ui/styles/colors';
import { green900 } from 'material-ui/styles/colors';

const cardStyle = {
  display: 'inline-block',
  margin: '40px 32px 16px 0',
  flexGrow: 1
};

const Day = ({day, onPrintReceiptClick}) => {
    return (
        <Card style={{flex: 1}}  >
            <CardHeader title="Day " subtitle={`Status : ${day.status == 1 ? 'CLOSE' : 'In-PROGRESS'}`} /> 
            <CardText>
            {day.status == 1 && <List>
                        <ListItem leftAvatar={<Avatar icon={<FileFolderOpen />} backgroundColor={green400} />} 
                            primaryText={Moment(day.today).format('DD/MM/YYYY, h:mm a')} 
                            secondaryText="Open at" />
                        <ListItem leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={green400} />} 
                            primaryText={Moment(day.close).format('DD/MM/YYYY, h:mm a')} 
                            secondaryText="Close at" />
                        <ListItem leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue300} />} 
                            primaryText={day.morningSale && day.morningSale.toFixed(3)} 
                            secondaryText="Morning Sale" />
                        <ListItem leftAvatar={<Avatar icon={<Smartphone />} backgroundColor={blue300} />} 
                            primaryText={day.morningSalePhoneCard && day.morningSale.toFixed(3)} 
                            secondaryText="Morning Sale (card)" />
                        <ListItem leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue800} />} 
                            primaryText={day.eveningSale && day.eveningSale.toFixed(3)} 
                            secondaryText="Evening Sale" />
                        <ListItem leftAvatar={<Avatar icon={<Smartphone />} backgroundColor={blue800} />} 
                            primaryText={day.eveningSalePhoneCard && day.eveningSalePhoneCard.toFixed(3)} 
                            secondaryText="Evening Sale (card)" />
                        <Divider inset={true} style={{marginTop: 15}} />
                        <ListItem leftAvatar={<Avatar icon={<AttachMoney />} backgroundColor={green700} />} 
                            primaryText={day.netSale && day.netSale.toFixed(3)} 
                            secondaryText="Net Sale" />
                    </List>}
                    {day.status == 1 && <Divider />}
                    {day.status == 1 && <List>
                        <ListItem leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={red400} />} 
                            primaryText={day.netExpense && day.netExpense.toFixed(3)} 
                            secondaryText="Net Expense" />
                        <ListItem leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={purple400} />} 
                            primaryText={day.netPurchase && day.netPurchase.toFixed(3)} 
                            secondaryText="Net Purchase" />

                    </List>}
                    
            </CardText>
            <CardActions>
                <FlatButton label='Print Receipt' primary={true} onClick={onPrintReceiptClick} />
            </CardActions>
        </Card>
    );
}

export default Day;

// class Day extends Component {

//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         const {id, loadDayById, day} = this.props;
//         loadDayById(id);
//         // if (day && day.today) {
//         //     const openDate = new Date(day.today);
//         //     //openDate.setHours(0,0,0);
//         //     const closeDate = new Date(day.close);
//         //     //closeDate.setHours(23,59,0);
//         //     // loadExpenseTransaction(openDate, closeDate);
//         //     // loadPurchaseTransaction(openDate, openDate);
//         // }
//     }


//     render() {
//         const {day, expenses, purchases} = this.props;
//         const CLOSE_DAY_STATUS  = 1;
//         return (
            
//             <div style={{display: 'flex', flexFlow: 'row wrap', width:'100%', marginTop: 10}}>
                
//                 <DayExpense expenses={expenses} />
//                 <DayPurchase purchases={purchases} />
//                 {/* <Card style={{flex: 2, marginLeft: 10}}>
//                     <CardHeader title="Expense " subtitle={'Total : (' + expenses.length + ')'} /> 
//                     <CardText>
//                         {day.status == CLOSE_DAY_STATUS && <List>
//                             {expenses && expenses.map((expense,i) => [
//                                     <ListItem key={i} primaryText={
//                                             <p>{expense.categoryName}  <span style={{float: 'right'}}> {expense.amount.toFixed(3)}</span></p>
//                                         }
//                                         secondaryTextLines={3} secondaryText={<p>{expense.description}</p>} />,
//                                     <Divider />
//                                 ]
//                             )}
//                         </List>}
//                     </CardText>
//                 </Card> */}
//                 {/* <Card style={{flex: 2, marginLeft: 10}}>
//                     <CardHeader title="Purchase" subtitle={'Total : (' + purchases.length + ')'} /> 
//                     <CardText>
//                         {day.status == CLOSE_DAY_STATUS && <List>
//                             {purchases && purchases.map((purchase,i) => [
//                                     <ListItem key={purchase._id} style={{marginTop: 0}} 
//                                     primaryText={
//                                         <p>{purchase.billNo} <span style={{float: 'right'}}>{purchase.total && purchase.total.toFixed(3)}</span></p>
//                                     }
//                                     secondaryText={
//                                         <p>{Moment(purchase.billDate).format('MMM DD, YYYY')} <span style={{float: 'right'}}>Total Items : {purchase.items.length}</span></p>
//                                     } />, 
//                                     <Divider />
//                                 ]
//                             )}
//                         </List>}
//                     </CardText>
//                 </Card> */}
//             </div>
//         );
//     }
// }

// Day.propTypes = {
//     day: PropTypes.object.isRequired
// }

// function mapStateToProps(state, ownProps) {
//     //console.info(state.day);
//     console.info('state', state);
//     return { 
//         day: state.day.single.day || {},
//         id: ownProps.params.dayId,
//         user: state.auth.user,
//         expenses: state.day.single.expenses || [], // state.reportExpenseData,
//         purchases: state.day.single.purchases || [] // state.reportPurchaseData
//     };
// }

