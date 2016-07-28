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

import MenuList from './common/Menu.jsx';
import BranchListDialog from './branch/BranchListDialog.js';
import LoadingDots from './common/LoadingDots';

//import MessageList from './MessageList.jsx';
//import ChannelList from './ChannelList.jsx';
//import MessageBox from './MessageBox.jsx';

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
        this._handleClick = this._handleClick.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._loadBranch = this._loadBranch.bind(this);
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
        console.log("load branch");
        this.props.loadBranch();
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar title="Coffee Shop - [ Al Khuwair ]"
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

                                <MenuItem primaryText="Switch Branch" onTouchTap={this._loadBranch} />
                                <MenuItem primaryText="Create Branch" />
                                <Divider />
                                <MenuItem primaryText="Sign out" />
                            </IconMenu>
                        } >

                        <Drawer open={this.state.open} docked={true} onRequestChange={(open) => this.setState({open})}>
                            <AppBar title="Menu" showMenuIconButton={true} 
                                iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                                onLeftIconButtonTouchTap={this._handleClose}
                                onTitleTouchTap={this._handleClose} />

                            <MenuItem checked={true} primaryText="Sales Board" leftIcon={<ActionDashboard />} 
                                linkButton containerElement={<Link to="/" />} onTouchTap={this._handleClose}  />
                            <MenuItem checked={true} primaryText="Kitchen Board" leftIcon={<ActionDashboard />} 
                                linkButton containerElement={<Link to="/kitchen" />} onTouchTap={this._handleClose}  />
                            <MenuItem checked={true} primaryText="Dispatch Board" leftIcon={<ActionDashboard />} 
                                linkButton containerElement={<Link to="/dispatch" />} onTouchTap={this._handleClose}  />
                            <Divider />
                            <MenuItem checked={true} primaryText="Items" leftIcon={<ContentLink />} 
                                linkButton containerElement={<Link to={'/item'} />} onTouchTap={this._handleClose}  />
                            <Divider />
                            <MenuItem primaryText="Category" leftIcon={<DeviceHub />} 
                                linkButton containerElement={<Link to={'/category'} />} onTouchTap={this._handleClose} />
                            <MenuItem primaryText="Products" leftIcon={<ActionReceipt />} 
                                linkButton containerElement={<Link to={'/product'} />} onTouchTap={this._handleClose} />
                            <Divider />
                            <MenuItem primaryText="Users" leftIcon={<Person />} 
                                linkButton containerElement={<Link to={'/users'} />} onTouchTap={this._handleClose} />
                        </Drawer>

                    </AppBar>
                    <BranchListDialog open={false} />
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
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps, actions)(App);