import React from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

const ProductForm = ( {product, categories, onSave, onChange, onSelectChange, onCheckCheck, loading, errors} ) => {
    return (
        <form>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Product" subtitle={product._id ? 'Edit' : 'Add New'} />
                <CardText>
                    <TextField name='code' hintText="Code" floatingLabelText="Product Code" onChange={onChange} value={product.code} underlineShow={false} />
                    <Divider />
                    <TextField name='name' hintText="Name" floatingLabelText="Product Name" onChange={onChange} value={product.name} underlineShow={false} />
                    <Divider />
                    <TextField name='nameAr' hintText="NameAr" floatingLabelText="Name Arabic" onChange={onChange} value={product.nameAr} underlineShow={false} />
                    <Divider />
                    <SelectField name='categoryId' hintText="Category" floatingLabelText="Category" onChange={onSelectChange} value={product.categoryId} underlineShow={false}>
                    {categories.map(category=>
                        <MenuItem key={category._id} value={category._id} primaryText={category.name} />
                    )}
                    </SelectField>
                    <Divider />
                    <TextField name='price' hintText="Price" floatingLabelText="Price" onChange={onChange} value={product.price} underlineShow={false} />
                    <Divider />
                    <Checkbox label="Status" onCheck={onCheckCheck} checked={product.status==1} style={styles.checkbox}  />
                </CardText>
                <CardActions>
                    <FlatButton label={loading ? 'Saving...' : 'Save'} primary={true} onTouchTap={onSave}></FlatButton>
                    <FlatButton label="Cancel" linkButton containerElement={<Link to="/product" />} />
                </CardActions>
            </Card>
        </form>
    );
}

ProductForm.propTypes = {
    product: React.PropTypes.object.isRequired,
    categories: React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSelectChange: React.PropTypes.func.isRequired,
    onCheckCheck: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default ProductForm;