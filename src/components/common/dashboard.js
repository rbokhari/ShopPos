import React, { Component } from 'react';

import SalesBoard from './SalesBoard';

class Dashboard extends Component {

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

export default Dashboard;