import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Moment from 'moment';

import * as actions from '../../actions';
import SalesBoard from './SalesBoard';
import DayGrid from './DayGrid';
import { Colors } from '../theme';

const style = {
    box: {
        display: 'inline-block',
        margin: '1em',
        width: '100%'
    }
};

class Dashboard extends Component {

    constructor(props, context) {
        super(props, context);
        //this.props.loadCategories();
        //this.props.loadProducts();

        this.handleCreateDay = this.handleCreateDay.bind(this);
        this.handleCloseDay = this.handleCloseDay.bind(this);
        this.handleSelectDay = this.handleSelectDay.bind(this);

        this.state = {
            load: 1
        };

        this.props.loadOpenDay()
            .then(res => {
                //alert('open day loaded');
            });
    }

    componentWillReceiveProps(nextProps) {
        this.props.loadCategories();
        this.props.loadProducts();
    }

    handleCreateDay() {
        this.props.createDay()
            .then(res => {
                this.setState({load: 2});
            });
    }

    handleSelectDay() {
        localStorage.setItem('dayId', this.props.day._id);
    }

    handleCloseDay() {
        const dayId = localStorage.getItem('dayId');
        if (confirm('Are you sure to close this day ?')) {
            this.props.loadCloseDay()
            .then(res => {
                browserHistory.push(`day/${dayId}`);
                //this.setState({load: 3});
            });
        }
    }

    render() {
        //alert(this.props.day._id);
        if (!this.props.day || !this.props.day._id || this.props.day._id == '0') {
            return (
                <DayGrid day={this.props.day} 
                    onCreateDay={this.handleCreateDay}
                    onSelectDay={this.handleSelectDay}
                    onCloseDay={this.handleCloseDay}>
                </DayGrid>
            );
        }

        return (
            <div style={{
                //maxwidth: 1200,
                width: '100%',
            }}>
                <div style={{ display: 'flex', flexFlow:'row wrap'}}>
                    <h1 style={{flexGrow: 1}}>
                        <span style={{color: Colors.primaryColor3}}> Sales Board : {Moment(this.props.day.today).format('dddd - DD MMMM, YYYY - h:mm a')}</span>
                    </h1>
                    <DayGrid style={{flexGrow: 1}} day={this.props.day} 
                        onCreateDay={this.handleCreateDay}
                        onSelectDay={this.handleSelectDay}
                        onCloseDay={this.handleCloseDay}>
                    </DayGrid>
                    
                </div>

                <div id='dDashboard' style={{
                    display: 'flex',
                    flexFlow: 'row wrap'   ,
                    width: '100%'
                }}>
                    <SalesBoard />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    var day = { _id:'0', today: '' };
    return {
        day: state.day
    };
}

export default connect(mapStateToProps, actions)(Dashboard);