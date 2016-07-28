import React, { Component } from 'react';

import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';

const styles = {
    margin: 20
};

const CustomerForm = ( { customer, onChange, onSubmit, onCancel, errors } ) => {
    
    return (
        <Card style={{
            maxWidth: 1400,
            width: '100%',
            marginTop: 20
        }}>
            <TextField name="carNumber" style={styles} floatingLabelText="Car Number" hintText="Car Number" 
                onChange={onChange} value={customer.carNumber} />
            <TextField name="mobileNumber" style={styles} floatingLabelText="Mobile No" hintText="Mobile No" 
                onChange={onChange} value={customer.mobileNumber} />
            <RaisedButton backgroundColor="#a4c639" style={styles} label="Send To Kitchen" labelPosition="before" secondary={true}
                icon={<ContentSend />} 
                onTouchTap={onSubmit} />
            <RaisedButton backgroundColor="#aaaa39" label="Cancel" labelPosition="before" primary={true}
                icon={<ContentSend />} 
                onTouchTap={onCancel} />
        </Card>
    );
}

CustomerForm.propTypes = {
    customer: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
};

export default CustomerForm;