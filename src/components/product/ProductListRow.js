import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const ProductListRow = ({product}) => {
    return (
            <TableRow >
                <TableRowColumn>{product.name}</TableRowColumn>
                <TableRowColumn>{product.category}</TableRowColumn>
                <TableRowColumn>{product.price}</TableRowColumn>
                <TableRowColumn>{product.status}</TableRowColumn>
                <TableRowColumn>Edit</TableRowColumn>
            </TableRow>
        );
}

ProductListRow.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductListRow;