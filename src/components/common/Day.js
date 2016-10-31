 import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import SalesBoard from './SalesBoard';

class Dashboard extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div style={{width: 450}}>
                <RaisedButton label={category.name} 
                    primary={true} style={styles}
                     >
                </RaisedButton>
        </div>
        );
    }
}

export default connect(null, actions)(Dashboard);