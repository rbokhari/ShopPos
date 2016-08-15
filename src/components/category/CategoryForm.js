import React from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

const CategoryForm = ( { category, onSave, onChange, loading, errors } ) => {
    return (
        <form>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Category" subtitle="Add New" />
                <CardText>
                    <TextField name="name"
                        floatingLabelText="Category Name"
                        onChange={onChange} value={category.name}
                        underlineShow={false} />
                    <Divider />
                    <TextField name="description" 
                        floatingLabelText="Description"
                        underlineShow={false} />
                    <Divider />
                    <Checkbox name="status" label="Status"
                        style={styles.checkbox}
                        value={category.statusId} />
                </CardText>
                <CardActions>
                    <FlatButton label={loading ? 'Saving...' : 'Save'} primary={true} onTouchTap={onSave}></FlatButton>
                    <FlatButton label="Cancel" linkButton containerElement={<Link to="/category" />} />
                </CardActions>
            </Card>
        </form>
    );
}

CategoryForm.propTypes = {
    category: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default CategoryForm;