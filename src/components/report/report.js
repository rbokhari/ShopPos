import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class Report extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                Reports
            </div>
        );
    }
}



function mapStateToProps(state, ownProps) {
    return {  };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);