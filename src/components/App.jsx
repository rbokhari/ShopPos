import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import mui from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Indigo500, Indigo700, Indigo100, pink400} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

import * as actions from '../actions';
import { USER_ROLE } from '../../shared/constants';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import DeviceHub from 'material-ui/svg-icons/hardware/device-hub';
import ContentLink from 'material-ui/svg-icons/content/link';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import Person from 'material-ui/svg-icons/social/person';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import ActionPrint from 'material-ui/svg-icons/action/print';
import ActionShopping from 'material-ui/svg-icons/action/shopping-cart';
import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionAssignmentDone from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionAssignmentReturned from 'material-ui/svg-icons/action/assignment-returned';
import ActionCardTravel from 'material-ui/svg-icons/action/card-travel';

import MenuList from './common/Menu.jsx';
import BranchListDialog from './branch/BranchListDialog';
import BranchCreateDialog from './branch/BranchNew';
import UserPasswordChange from './user/UserPasswordChange';
import CustomerDetailDialog from './common/CustomerDetailDialog';
import LoadingDots from './common/LoadingDots';

//var ThemeManager = new mui.styles.getMuiTheme();
//var Colors = mui.Styles.Colors
//var AppBar = mui.AppBar;
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Indigo500,
    primary2Color: Indigo700,
    primary3Color: Indigo100,
    accent1Color: pink400,
  },
});

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        if (this.props.authenticated) {
            this.props.userInfo();
        }

        this._handleClick = this._handleClick.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._loadBranch = this._loadBranch.bind(this);
        this._showCreateBranch = this._showCreateBranch.bind(this);
        this._loadChangePassword = this._loadChangePassword.bind(this);
    }

    _handleClick() {
        this.setState({
            open: !this.state.open
        });
    }

    _handleClose() {
        this.setState({
            open: false
        });        
    }

    _loadBranch() {
        this.props.loadBranch();
    }

    _showCreateBranch() {
        this.props.showCreateBranch();
    }

    _loadChangePassword() {
        this.props.loadPasswordChangeDialog();
    }

    renderDrawerMenu() {
        if (this.props.authenticated) {
            return (
                <Drawer open={this.state.open} docked={true} onRequestChange={(open) => this.setState({open})}>
                    <AppBar title={'User : ' + (this.props.user ? this.props.user.name : '')} showMenuIconButton={true} 
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        onLeftIconButtonTouchTap={this._handleClose}
                        onTitleTouchTap={this._handleClose} />

                    <MenuItem checked={true} primaryText="Sales Board" leftIcon={<ActionAssignment />} 
                        containerElement={<Link to="/" />} onTouchTap={this._handleClose}  />
                    <MenuItem checked={true} primaryText="Kitchen Board" leftIcon={<ActionAssignmentReturned />} 
                         containerElement={<Link to="/kitchen" />} onTouchTap={this._handleClose}  />
                    <MenuItem checked={true} primaryText="Dispatch Board" leftIcon={<ActionAssignmentDone />} 
                         containerElement={<Link to="/dispatch" />} onTouchTap={this._handleClose}  />
                    <Divider />
                    { this.props.user && (this.props.user.roleId === USER_ROLE.BRANCH_MANAGER || this.props.user.roleId === USER_ROLE.ADMIN) && 
                        <MenuItem checked={true} primaryText="Suppliers" leftIcon={<ActionShoppingBasket />} 
                             containerElement={<Link to={'/supplier'} />} onTouchTap={this._handleClose}  />}
                    { this.props.user && (this.props.user.roleId === USER_ROLE.BRANCH_MANAGER || this.props.user.roleId === USER_ROLE.ADMIN) && 
                        <MenuItem checked={true} primaryText="Items" leftIcon={<ActionShoppingBasket />} 
                             containerElement={<Link to={'/item'} />} onTouchTap={this._handleClose}  />}
                    { this.props.user && (this.props.user.roleId === USER_ROLE.BRANCH_MANAGER || this.props.user.roleId === USER_ROLE.ADMIN) && 
                        <MenuItem checked={true} primaryText="Purchase Order" leftIcon={<ActionShopping />} 
                             containerElement={<Link to={'/purchase'} />} onTouchTap={this._handleClose}  />}
                    <Divider />
                    { this.props.user && this.props.user.roleId === USER_ROLE.ADMIN && 
                        <MenuItem primaryText="Category" leftIcon={<DeviceHub />} 
                             containerElement={<Link to={'/category'} />} onTouchTap={this._handleClose} />}
                    { this.props.user && this.props.user.roleId === USER_ROLE.ADMIN && 
                        <MenuItem primaryText="Products" leftIcon={<ActionReceipt />} 
                             containerElement={<Link to={'/product'} />} onTouchTap={this._handleClose} />}
                    <Divider />
                    { this.props.user && (this.props.user.roleId === USER_ROLE.BRANCH_MANAGER || this.props.user.roleId === USER_ROLE.ADMIN) && 
                        <MenuItem primaryText="Expense" leftIcon={<ActionCardTravel />} 
                            nestedListStyle={{ maxHeight: 100, overflow: 'auto' }}
                            nestedItems={[
                                    <MenuItem key={1} containerElement={<Link to={'/master'} />} 
                                        primaryText="Category" leftIcon={<ActionCardTravel />} onTouchTap={this._handleClose} />,
                                    <MenuItem key={2} containerElement={<Link to={'/expense'} />} 
                                        primaryText="Expense" leftIcon={<ActionCardTravel />} onTouchTap={this._handleClose} />
                            ]} />}
                    <Divider />
                    { this.props.user && (this.props.user.roleId === USER_ROLE.BRANCH_MANAGER || this.props.user.roleId === USER_ROLE.ADMIN) && 
                        <MenuItem primaryText="Reports" leftIcon={<ActionPrint />} 
                             containerElement={<Link to={'/report'} />} onTouchTap={this._handleClose} />}
                    <Divider />
                    { this.props.user && this.props.user.roleId === USER_ROLE.ADMIN && 
                        <MenuItem primaryText="Users" leftIcon={<Person />} 
                             containerElement={<Link to={'/users'} />} onTouchTap={this._handleClose} /> }
                </Drawer>
            );
        } else {
            return (
                <Drawer open={this.state.open} docked={true} onRequestChange={(open) => this.setState({open})}>
                    <AppBar title="Menu" showMenuIconButton={true} 
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        onLeftIconButtonTouchTap={this._handleClose}
                        onTitleTouchTap={this._handleClose} />

                    <MenuItem checked={true} primaryText="Create Account" leftIcon={<ActionAssignment />} 
                         containerElement={<Link to="/createAccount" />} onTouchTap={this._handleClose}  />
                    <MenuItem checked={true} primaryText="Login" leftIcon={<ActionAssignment />} 
                         containerElement={<Link to="/signin" />} onTouchTap={this._handleClose}  />
                    
                </Drawer>
            );
        }
    }

    // renderSideMenu() {
    //     const { user } = this.props;
    //     if (this.props.authenticated) {
    //         return [
    //                 { this.props.user.roleId === USER_ROLE.ADMIN && <MenuItem key={1} primaryText="Switch Branch" onTouchTap={this._loadBranch} />},
    //                 <MenuItem key={2} primaryText="Create Branch" onTouchTap={this._showCreateBranch} />,
    //                 <Divider key={3} />,
    //                 <MenuItem key={4} primaryText="Sign out" linkButton containerElement={<Link to={'/signout'} />} />
    //         ];
    //     }
    // }

    render() {
        const { user, branch, displayTitle } = this.props;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar title={displayTitle}
                        showMenuIconButton={true}
                        onLeftIconButtonTouchTap={this._handleClick}
                        onTitleTouchTap={this._handleClick} 
                        iconElementRight={
                            <IconMenu
                                iconButtonElement={
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}} >

                            { user && user.roleId === USER_ROLE.ADMIN && <MenuItem primaryText="Switch Branch" onTouchTap={this._loadBranch} />}
                            { user && user.roleId === USER_ROLE.ADMIN && <MenuItem primaryText="Create Branch" onTouchTap={this._showCreateBranch} />}
                            { user && user.roleId === USER_ROLE.ADMIN && <Divider />}
                            <MenuItem primaryText="Change Password" onTouchTap={this._loadChangePassword } />
                            { user && user.roleId === USER_ROLE.ADMIN && <Divider />}
                            <MenuItem primaryText="Sign out"  containerElement={<Link to={'/signout'} />} />

                            </IconMenu>
                        } >

                        {this.renderDrawerMenu()}
                        
                    </AppBar>
                    <BranchListDialog open={false} />
                    <BranchCreateDialog open={false} />
                    <UserPasswordChange open={false} />
                    <CustomerDetailDialog open={true} />
                    <div style={{
                            border: '1px thick', 
                            display: 'flex',
                            flexFlow: 'row wrap',
                            maxWidth: 1600,
                            width: '100%',
                            margin: '3px auto 3px'
                        }}>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const branch = state.branch == undefined ? '' : state.branch.current.displayName; 
  //console.error("state", state.branch);
    const displayTitle = state.company === undefined ? '' : state.company.displayName + ' - ' + branch;
    return {
        user: state.auth.user,
        branch: branch,
        displayTitle,
        authenticated: state.auth.authenticated,
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps, actions)(App);