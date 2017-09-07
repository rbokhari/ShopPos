import React, { Component } from 'react';

import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = {
    margin: 20
};

const styleRadioButton = {
    //marginBottom: 16,
    width: 150,
    display: 'inline',
    position: 'absolute',
    marginLeft: 40,
    marginTop: 50,
    float: 'right'
};

const CustomerForm = ( { customer, onChange, onSubmit, onCancel, errors } ) => {
    
    return (
        <Card style={{
            width: '100%',
            marginTop: 20
        }}>
            <span>
                <TextField name="carNumber" style={styles} floatingLabelText={customer.option==1 ? 'Car Number' : 'Table No'}  
                    onChange={onChange} value={customer.carNumber} />
                <TextField name="mobileNumber" style={styles} floatingLabelText="Mobile No"  
                    onChange={onChange} value={customer.mobileNumber} />
                <RadioButtonGroup onChange={onChange} name="option" defaultSelected="1" style={styleRadioButton} value={customer.option} >
                    <RadioButton
                        value="1"
                        label="Take Away" />
                    <RadioButton
                        value="2"
                        label="Dine In" />
                </RadioButtonGroup>
            </span>
            <RaisedButton backgroundColor="#a4c639" style={{marginLeft: 200, height: 70}} label="Send To Kitchen" primary={true}
                icon={<ContentSend />} onTouchTap={onSubmit} />
            <RaisedButton backgroundColor="#aaaa39" style={{marginLeft: 10, height: 70}} label="Clear" secondary={true}
                icon={<ContentClear />} onTouchTap={onCancel} />
                
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