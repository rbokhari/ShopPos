import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import SalesBoard from './SalesBoard';

class Dashboard extends Component {

    constructor(props, context) {
        super(props, context);
        //this.props.loadCategories();
        //this.props.loadProducts();
    }

    componentWillReceiveProps(nextProps) {
        this.props.loadCategories();
        this.props.loadProducts();
    }

    render() {
        return (
            <div style={{
                    maxwidth: 1200,
                    width: '100%',
            }}>
                <h1>Sales Board</h1>
                <div style={{
                    display: 'flex',
                    flexFlow: 'row wrap'                 
                }}>
                    <SalesBoard />
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Dashboard);