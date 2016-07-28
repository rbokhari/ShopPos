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

const ItemForm = ( {item, onSave, onChange, loading, errors} ) => {
    return (
        <form>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Item" subtitle="Add New" />
                <CardText>
                    <TextField name='code' hintText="code" floatingLabelText="Item Code" onChange={onChange} value={item.code} underlineShow={false} />
                    <Divider />
                    <TextField name='name' hintText="Name" floatingLabelText="Item Name" onChange={onChange} value={item.name} underlineShow={false} />
                    <Divider />
                    <TextField name='description' hintText="Description" floatingLabelText="Description" onChange={onChange} value={item.description} underlineShow={false} />
                    <Divider />
                    <Checkbox label="Status" style={styles.checkbox}  />
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
    item: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default ItemForm;