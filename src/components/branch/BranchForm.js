import React from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
//import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const BranchForm = ( {item, onSave, onChange, loading, errors} ) => {
    return (
        <form>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Item" subtitle="Add New" />
                <CardText>
                    <TextField name='code' hintText="code" floatingLabelText="Item Code" onChange={onChange} value={item.code} underlineShow={false} />
                    <Divider />
                    <TextField name='name' hintText="Name" floatingLabelText="Item Name" onChange={onChange} value={item.name} underlineShow={false} />
                    <Divider />
                    <TextField name='description' hintText="Description" multiLine={true} rows={2} rowsMax={4} 
                        floatingLabelText="Description" onChange={onChange} value={item.description} underlineShow={false} />
                    <Divider />
                    <Checkbox label="Status" style={styles.checkbox}  />
                </CardText>
                <CardActions>
                    <RaisedButton icon={<ContentSave />} label={loading ? 'Saving...' : 'Save'} primary={true} onTouchTap={onSave}></RaisedButton>
                    <RaisedButton icon={<ContentClear />} label="Cancel" secondary={true} linkButton containerElement={<Link to="/item" />} />
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