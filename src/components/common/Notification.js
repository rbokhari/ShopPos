import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

const Notification = ({notification, onHideHandle}) => {
    return (
        <Snackbar open={notification.show}
            message={`${notification.message}`}
            autoHideDuration={2000}
            onRequestClose={onHideHandle} />
    );
};

export default Notification;