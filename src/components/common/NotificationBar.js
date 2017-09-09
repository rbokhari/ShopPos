import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

const NotificationBar = ({notification, onHideHandle}) => {
    return (
        <Snackbar open={notification.show}
            message={`${notification.message}`}
            autoHideDuration={4000}
            onRequestClose={onHideHandle}
            bodyStyle={{ backgroundColor: (notification.type == 'success' ? 'teal' : 'red'), color: 'coral' }} />
    );
};

export default NotificationBar;