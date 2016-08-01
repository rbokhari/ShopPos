import React from 'react';
import {Link} from 'react-router';
import { reduxForm } from 'redux-form';     // its like a connect function (container) from redux library

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

const StockForm = ( { stock, items, onSave, onChange, onItemSelect, onQuantityChange, onAddStock, onRemoveStock, loading, errors } ) => {
    return (
        <form>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Stock" subtitle="Add New" />
                <CardText>
                    <TextField name='billNo' hintText="Bill No" floatingLabelText="Bill No" onChange={onChange} value={stock.billNo} underlineShow={false} />
                    <TextField style={{margin:10}} name='billDate' hintText="Bill Date" floatingLabelText="Bill Date" onChange={onChange} value={stock.billDate} underlineShow={false} />
                    <Divider />
                    <h3>Items</h3>
                    <Table height={'400px'} fixedHeader={true} fixedFooter={true} style={{ width: 750 }} selectable={false}>
                        <TableHeader displaySelectAll={false} multiSelectable={false} enableSelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{width: 5}}>Sr.</TableHeaderColumn>
                                <TableHeaderColumn>Item</TableHeaderColumn>
                                <TableHeaderColumn>Stock</TableHeaderColumn>
                                <TableHeaderColumn style={{width: 25}}>
                                    <IconButton onClick={onAddStock}><ContentAdd color={greenA200} /></IconButton>
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody  displayRowCheckbox={false}>
                            {stock.items.map((itm, i) =>
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
                                        <TextField name='qty' onChange={onChange} value={itm.qty} onChange={onQuantityChange.bind(this, i)} underlineShow={true} />
                                    </TableRowColumn>
                                    <TableRowColumn style={{width: 25}}>
                                        <IconButton onClick={onRemoveStock.bind(this, i)}><ActionDelete color={red500} /></IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                </Table>                
                </CardText>
                <CardActions>
                    <FlatButton label={loading ? 'Saving...' : 'Save'} primary={true} onTouchTap={onSave}></FlatButton>
                    <FlatButton label="Cancel" linkButton containerElement={<Link to="/purchase" />} />
                </CardActions>
            </Card>
        </form>
    );
}

StockForm.propTypes = {
    stock: React.PropTypes.object.isRequired,
    items: React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onItemSelect: React.PropTypes.func.isRequired,
    onQuantityChange: React.PropTypes.func.isRequired,
    onAddStock: React.PropTypes.func.isRequired,
    onRemoveStock: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
}

export default StockForm;