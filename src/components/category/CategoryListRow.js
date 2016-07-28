import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const CategoryListRow = ({category}) => {
    return (
            <TableRow >
                <TableRowColumn>{category.name}</TableRowColumn>
                <TableRowColumn>{category.status}</TableRowColumn>
                <TableRowColumn>Edit</TableRowColumn>
            </TableRow>
        );
}

CategoryListRow.propTypes = {
    category: PropTypes.object.isRequired
}

export default CategoryListRow;