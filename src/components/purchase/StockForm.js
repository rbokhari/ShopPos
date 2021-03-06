import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Link } from 'react-router';
//import { Field, FieldArray, reduxForm } from 'redux-form';     // its like a connect function (container) from redux library

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';

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

const renderFields = ({ items }) => (
    items.map((item, index) =>
        <TableRow key={i} >
            <TableRowColumn style={{width: 5}}>{index+1}</TableRowColumn>
            <TableRowColumn>
                <SelectField name='itemId' hintText="select item" value={item.itemId} onChange={onItemSelect.bind(this, i)} underlineShow={false}>
                    {items.map(item=>
                        <MenuItem key={item._id} value={item._id} primaryText={item.name} />
                    )}
                </SelectField>
            </TableRowColumn>
            <TableRowColumn>
                <TextField name='qty' value={item.qty} underlineShow={true} />
            </TableRowColumn>
            <TableRowColumn style={{width: 25}}>
                <IconButton onClick={onRemoveStock.bind(this, i)}><ActionDelete color={red500} /></IconButton>
            </TableRowColumn>
        </TableRow>
    )
)

const StockForm = ( { stock, items, suppliers, onSave, onChange, onBillDateChange, onItemSelect, onQuantityChange, 
                onStockPriceChange, onUpdateSupplier, onAddStock, onRemoveStock, 
                onAddAmount, onUpdateAmountDate, onUpdateAmountAmount, loading, errors } ) => {
    return (
        <form>
            <Card style={{ flexGrow: 1, margin: '16px 32px 16px 0',}} >
                <CardHeader title="Stock" subtitle="Add New" />
                <CardText>
                    <div>
                        <TextField name='billNo' floatingLabelText="Bill No" onChange={onChange} value={stock.billNo} />

                        {!stock._id && 
                        <DatePicker name='billDate' floatingLabelText="Bill Date" value={stock.billDate} autoOk={false}  
                            formatDate={d => moment(d).format('DD/MM/YYYY')} 
                            container="inline" mode="landscape" onChange={onBillDateChange} style={{display: 'inline-block', marginLeft: 150}} />} 
                        {stock._id && 
                        <TextField name='billDate' floatingLabelText="Bill Date" style={{display: 'inline-block', marginLeft: 150}}
                            value={moment(stock.billDate).format('DD/MM/YYYY')}  />}
                    </div>
                    <div>
                        <SelectField name='supplierId' floatingLabelText="Supplier" hintText="select supplier" value={stock.supplierId}
                             onChange={onUpdateSupplier} underlineShow={true} >
                            {suppliers.map(supplier=>
                                <MenuItem key={supplier._id} value={supplier._id} primaryText={supplier.name} />
                            )}
                        </SelectField>

                        <TextField name='amount' floatingLabelText="Bill Amount" onChange={onChange} disabled={true} value={stock.total} style={{marginLeft: 150}} />
                    </div>
                    <h3>Items</h3>
                    <Table fixedHeader={true} fixedFooter={true} style={{ width: 750 }} selectable={false}>
                        <TableHeader displaySelectAll={false} multiSelectable={false} enableSelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{width: 5}}>Sr.</TableHeaderColumn>
                                <TableHeaderColumn>Item</TableHeaderColumn>
                                <TableHeaderColumn>Stock</TableHeaderColumn>
                                <TableHeaderColumn>T.Price</TableHeaderColumn>
                                {!stock._id &&
                                <TableHeaderColumn style={{width: 25}}>
                                    <IconButton onClick={onAddStock}><ContentAdd color={greenA200} /></IconButton>
                                </TableHeaderColumn>}
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
                                        <TextField name='qty' onChange={onChange} value={itm.qty} onChange={onQuantityChange.bind(this, i)} underlineShow={false} />
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <TextField name='price' onChange={onChange} value={itm.price} onChange={onStockPriceChange.bind(this, i)} underlineShow={false} />
                                    </TableRowColumn>
                                    {!stock._id &&
                                    <TableRowColumn style={{width: 25}}>
                                        <IconButton onClick={onRemoveStock.bind(this, i)}><ActionDelete color={red500} /></IconButton>
                                    </TableRowColumn>}
                                </TableRow>
                            )}
                        </TableBody>
                </Table>

                <h3>Amount Deduction</h3>
                <Table selectable={false} style={{ width: 750 }}>
                    <TableHeader displayRowCheckbox={false} displaySelectAll={false} multiSelectable={false} enableSelectAll={false} adjustForCheckbox={false} >
                        <TableRow>
                            <TableHeaderColumn style={{width: 5}}>Sr.</TableHeaderColumn>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Amount</TableHeaderColumn>
                            {!stock._id &&
                            <TableHeaderColumn style={{width: 25}}>
                                <IconButton onClick={onAddAmount}><ContentAdd color={greenA200} /></IconButton>
                            </TableHeaderColumn>}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {stock.amounts.map((amount, i) => 
                            <TableRow key={i+100}>
                                <TableRowColumn style={{width: 5}}>{i+1}</TableRowColumn>
                                <TableRowColumn>
                                    {!stock._id && 
                                    <DatePicker name='date' value={amount.date} hintText='Select Date' autoOk={false}  underlineShow={false} 
                                        formatDate={d => moment(d).format('DD/MM/YYYY')} 
                                        container="inline" mode="landscape" onChange={onUpdateAmountDate.bind(this,i)} style={{display: 'inline-block'}} />}
                                    {stock._id && 
                                    <TextField name='date' underlineShow={false} 
                                        value={moment(amount.date).format('DD/MM/YYYY')}  />}
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField name='amount' onChange={onUpdateAmountAmount.bind(this,i)} value={amount.amount} underlineShow={false} />
                                </TableRowColumn>
                                {!stock._id &&
                                <TableRowColumn style={{width: 25}}>
                                    <IconButton>
                                        <ActionDelete color={red500} />
                                    </IconButton>
                                </TableRowColumn>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                </CardText>
                <CardActions>
                    {!stock._id && <RaisedButton icon={<ContentSave />}  label={loading ? 'Saving...' : 'Save'} primary={true} onTouchTap={onSave}></RaisedButton>}
                    <RaisedButton icon={<ContentClear />} label="Cancel" secondary={true} containerElement={<Link to="/purchase" />} />
                </CardActions>
            </Card>
        </form>
    );
}

StockForm.propTypes = {
    stock: React.PropTypes.object.isRequired,
    items: React.PropTypes.array.isRequired,
    suppliers: React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onItemSelect: React.PropTypes.func.isRequired,
    onQuantityChange: React.PropTypes.func.isRequired,
    onAddStock: React.PropTypes.func.isRequired,
    onRemoveStock: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object,
    onAddAmount: React.PropTypes.func.isRequired,
    onUpdateAmountDate: React.PropTypes.func.isRequired,
    onUpdateAmountAmount: React.PropTypes.func.isRequired
}

export default StockForm;
// export default reduxForm({
//     form: 'stock',
//     fields: ['']
// })(StockForm)