import React from 'react';

import {blue500, red500, greenA200, grey500} from 'material-ui/styles/colors';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ActionSpeakerNote from 'material-ui/svg-icons/action/speaker-notes';
import ArrowUp from 'material-ui/svg-icons/image/exposure-plus-1';
import ArrowDown from 'material-ui/svg-icons/image/exposure-neg-1';

const styles = {
    margin: -5
};

const CustomerItems = ( { products, totalBill, onHandleIncrease, onHandleDecrease, onHandleDelete, onHandleNote, onHandleRowSelection, onHandleQuantity, rowSelectIndex, errors } ) => {
    
        return (
            <Table height={'400px'} fixedHeader={true} fixedFooter={true} style={{ width: 800 }} selectable={true} onRowSelection={onHandleRowSelection.bind(this)}>
                <TableHeader  displaySelectAll={false} multiSelectable={false} enableSelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={{width: 160}}>Menu Item</TableHeaderColumn>
                        {/* <TableHeaderColumn style={{width: 100}}>Category</TableHeaderColumn> */}
                        <TableHeaderColumn style={{width: 20}}>QTY</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 30}}>Price</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 100}}>Action</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
                    {products.map((item, index) =>
                        <TableRow key={index} selected={index === rowSelectIndex}>
                            <TableRowColumn style={{width: 160}}>
                            {index+1}.&nbsp;&nbsp;{item.productName} ({item.unitPrice.toFixed(3)}) {item.addons.length == 0 ? '' : <ActionSpeakerNote color={blue500} />}
                            </TableRowColumn>
                            {/* <TableRowColumn style={{width: 100}}>
                                {item.categoryName}
                            </TableRowColumn> */}
                            <TableRowColumn style={{width: 30}}>
                                <Badge badgeContent={item.qty} secondary={true} style={{marginTop: 10}} onClick={onHandleQuantity.bind(this, index)} />
                            </TableRowColumn>
                            <TableRowColumn style={{width: 40}}>
                                {item.price}
                            </TableRowColumn>
                            <TableRowColumn style={{width: 100}}>
                                <IconButton style={styles} onClick={onHandleIncrease.bind(this, index)}><ArrowUp color={greenA200} /></IconButton>
                                <IconButton style={styles} onClick={onHandleDecrease.bind(this, index)}><ArrowDown color={red500} /></IconButton>
                                <IconButton style={styles} onClick={onHandleNote.bind(this, index)}><ActionNoteAdd color={grey500} /></IconButton>
                                <IconButton style={styles} onClick={onHandleDelete.bind(this, index)}><ActionDelete color={red500} /></IconButton>
                            </TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableRowColumn colSpan="6" style={{textAlign: 'center'}}>
                            <h1>Total Bill : {totalBill}</h1>
                        </TableRowColumn>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    
}

CustomerItems.propTypes = {
    products: React.PropTypes.array.isRequired,
    errors: React.PropTypes.object,
    onHandleIncrease: React.PropTypes.func.isRequired,
    onHandleDecrease: React.PropTypes.func.isRequired,
    onHandleDelete: React.PropTypes.func.isRequired,
    onHandleNote: React.PropTypes.func.isRequired,
    onHandleRowSelection: React.PropTypes.func.isRequired,
    onHandleQuantity: React.PropTypes.func.isRequired
};

export default CustomerItems;
