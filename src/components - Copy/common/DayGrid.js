import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'moment';

const style = {
    margin: 15,
    //width: 120,
    height: 60
};

const DayGrid = ({ day, onCreateDay, onSelectDay, onCloseDay }) => {
    if (day && day._id && day._id !== '0') {
        return ( 
            <div>
                <RaisedButton  
                    label={'Close This Day'} secondary={true} style={style} onTouchTap={onCloseDay} />
            </div>
        );
    }else {
        return (
            <div>
                <RaisedButton  
                    label='Create A Day' primary={true} style={style} onTouchTap={onCreateDay} />
            </div>
        );
    }
};

DayGrid.propTypes = {
    day: React.PropTypes.object.isRequired,
    onCreateDay: React.PropTypes.func.isRequired,
    onSelectDay: React.PropTypes.func.isRequired,
    onCloseDay: React.PropTypes.func.isRequired
};

export default DayGrid;
