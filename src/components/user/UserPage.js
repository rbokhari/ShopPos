import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import UserList from './UserList';

const fabStyle = {
    marginTop: 10,
    marginLeft: '90%'
};

class UserPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.props.loadUsers();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.branch._id !== localStorage.getItem('officeId')) {
            //this.props.loadUsers();
        }
    }

    render() {
        const {users} = this.props;

        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} containerElement={<Link to="users/new" />}>
                    <ContentAdd />
                </FloatingActionButton>
                <UserList users={users} />
            </div>
        );
    }

}

UserPage.propTypes = {
    users: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return { 
        users: state.users,
        branch: state.branch.current 
    };
}

export default connect(mapStateToProps, actions)(UserPage);