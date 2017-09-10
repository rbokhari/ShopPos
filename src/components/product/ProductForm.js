import React from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { red500, greenA200} from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import { PRODUCT_TYPE, PRODUCT_TYPE_LABEL } from '../../../shared/constants';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  }
};

const ProductForm = ( {product, stock, categories, items, onSave, onChange, onSelectChange, onTypeChange, onCheckCheck, onItemSelect, onUpdateProductQty, onItemAdd, onItemRemove, loading, errors} ) => {
    return (
        <form>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Product" subtitle={product._id === '0' ? 'Add New' : 'Edit'} />
                <CardText>
                    <div>
                        <TextField name='code' floatingLabelText="Product Code" onChange={onChange} value={product.code} disabled={true} defaultValue="Auto Number" />
                        <TextField name='price' style={{marginLeft: 150}} floatingLabelText="Price" onChange={onChange} value={product.price} />                        
                    </div>
                    <div>
                        <TextField name='name' floatingLabelText="Product Name" onChange={onChange} value={product.name} />
                        <TextField name='nameAr' style={{marginLeft: 150}} floatingLabelText="Name Arabic" onChange={onChange} value={product.nameAr} />
                    </div>
                    <div>
                        <SelectField name='categoryId' floatingLabelText="Category" onChange={onSelectChange} value={product.categoryId} >
                        {categories.map(category=>
                            <MenuItem key={category._id} value={category._id} primaryText={category.name} />
                        )}
                        </SelectField>
                        <SelectField name='type' floatingLabelText="Type" style={{marginLeft: 150}} onChange={onTypeChange} value={product.type} >
                            <MenuItem key={PRODUCT_TYPE.KITCHEN} value={PRODUCT_TYPE.KITCHEN} primaryText={PRODUCT_TYPE_LABEL.KITCHEN} />
                            <MenuItem key={PRODUCT_TYPE.DIRECT} value={PRODUCT_TYPE.DIRECT} primaryText={PRODUCT_TYPE_LABEL.DIRECT} />
                            <MenuItem key={PRODUCT_TYPE.NONKITCHEN} value={PRODUCT_TYPE.NONKITCHEN} primaryText={PRODUCT_TYPE_LABEL.NONKITCHEN} />
                            <MenuItem key={PRODUCT_TYPE.PHONECARD} value={PRODUCT_TYPE.PHONECARD} primaryText={PRODUCT_TYPE_LABEL.PHONECARD} />
                        </SelectField>
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
                                    <IconButton onClick={onItemAdd}><ContentAdd color={greenA200} /></IconButton>
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody  displayRowCheckbox={false}>
                            {product.items.map((itm, i) =>
                                <TableRow key={i} >
                                    <TableRowColumn style={{width: 5}}>{i+1}</TableRowColumn>
                                    <TableRowColumn>
                                        <SelectField name='itemId' hintText="select item" value={itm.itemId} onChange={onItemSelect.bind(this, i)} underlineShow={false}>
                                        {items.map(item=>
                                            <MenuItem key={item._id} value={item._id} primaryText={item.name} />
                                        )}
                                        </SelectField>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <TextField name='qty' value={itm.qty} onChange={onUpdateProductQty.bind(this, i)} underlineShow={true} />
                                    </TableRowColumn>
                                    <TableRowColumn style={{width: 25}}>
                                        <IconButton onClick={onItemRemove.bind(this, i)}><ActionDelete color={red500} /></IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>                
                </CardText>
                <CardActions>
                    <RaisedButton icon={<ContentSave />} label={loading ? 'Saving...' : 'Save'} primary={true} onTouchTap={onSave}></RaisedButton>
                    <RaisedButton icon={<ContentClear />} label="Cancel" secondary={true} linkButton containerElement={<Link to="/product" />} />
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
    onTypeChange: React.PropTypes.func.isRequired,
    onCheckCheck: React.PropTypes.func.isRequired,
    onItemSelect: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default ProductForm;