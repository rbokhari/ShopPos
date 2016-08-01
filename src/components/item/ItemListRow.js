import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {TableRow, TableRowColumn} from 'material-ui/Table';

const ItemListRow = ({item}) => {
    return (
            <TableRow key={item.id} >
                <TableRowColumn>{item.name} {item.id}</TableRowColumn>
                <TableRowColumn>{item.stock}</TableRowColumn>
                <TableRowColumn>{item.status}</TableRowColumn>
                <TableRowColumn>Edit</TableRowColumn>
            </TableRow>
        );
}

ItemListRow.propTypes = {
    item: PropTypes.object.isRequired
}

export default ItemListRow;