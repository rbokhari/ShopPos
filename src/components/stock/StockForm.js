import React from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const StockForm = ({stock, onSave, onChange, loading, errors}) => {
    return (
        <form>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Stock" subtitle="Add New" />
                <CardText>
                    <TextField name='billNo' hintText="Bill No" floatingLabelText="Bill No" onChange={onChange} value={stock.billNo} underlineShow={false} />
                    <Divider />
                    <TextField name='billDate' hintText="Bill Date" floatingLabelText="Bill Date" onChange={onChange} value={item.billDate} underlineShow={false} />
                    <Divider />
                    <TextField name='quantity' hintText="Quantity" floatingLabelText="Quantity" onChange={onChange} value={item.quantity} underlineShow={false} />
                </CardText>
                <CardActions>
                    <FlatButton label={loading ? 'Saving...' : 'Save'} primary={true} onTouchTap={onSave}></FlatButton>
                    <FlatButton label="Cancel" linkButton containerElement={<Link to="/item" />} />
                </CardActions>
            </Card>
        </form>
    );
}

ItemForm.propTypes = {
    stock: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
}

export default StockForm;