import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';

class Signout extends Component {
    componentWillMount() {
        this.props.signoutUser();
    }

    render() {
        return (
            <div>
                    <h4>Sign out Successfully Done </h4> 
                    Click <Link to='signin'>Here</Link> to login
            </div>
        );
    }
}

export default connect(null, actions)(Signout);