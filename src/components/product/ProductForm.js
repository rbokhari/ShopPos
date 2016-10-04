import React from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const ProductForm = ( {product, stock, categories, onSave, onChange, onSelectChange, onCheckCheck, loading, errors} ) => {
    return (
        <form>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Product" subtitle={product._id ? 'Edit' : 'Add New'} />
                <CardText>
                    <div>
                        <TextField name='code' floatingLabelText="Product Code" onChange={onChange} value={product.code} />
                    </div>
                    <div>
                        <TextField name='name' floatingLabelText="Product Name" onChange={onChange} value={product.name} />
                    </div>
                        <TextField name='nameAr' floatingLabelText="Name Arabic" onChange={onChange} value={product.nameAr} />
                    <div>
                        <SelectField name='categoryId' floatingLabelText="Category" onChange={onSelectChange} value={product.categoryId} >
                        {categories.map(category=>
                            <MenuItem key={category._id} value={category._id} primaryText={category.name} />
                        )}
                        </SelectField>
                    </div>
                    <div>
                        <TextField name='price' floatingLabelText="Price" onChange={onChange} value={product.price} />
                    </div>
                    <Checkbox label="Status" onCheck={onCheckCheck} checked={product.status==1} style={styles.checkbox}  />
                    <h4>Items</h4>
                    <Table height={'400px'} fixedHeader={true} fixedFooter={true} style={{ width: 750 }} selectable={false}>
                        <TableHeader displaySelectAll={false} multiSelectable={false} enableSelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{width: 5}}>Sr.</TableHeaderColumn>
                                <TableHeaderColumn>Item</TableHeaderColumn>
                                <TableHeaderColumn>Use Stock</TableHeaderColumn>
                                <TableHeaderColumn style={{width: 25}}>
                                    <IconButton ><ContentAdd color={greenA200} /></IconButton>
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        
                    </Table>                
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