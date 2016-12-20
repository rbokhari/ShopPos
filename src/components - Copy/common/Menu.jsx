import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

class MenuList extends React.Component {

    render() {

        return (
            <Paper style={style}>
                <Menu>
                    <MenuItem primaryText="Item List" linkButton containerElement={<Link to="item" />} />
                    <MenuItem primaryText="Add Stock" linkButton containerElement={<Link to="purchase" />} />
                    <Divider />
                    <MenuItem primaryText="Category Type" linkButton containerElement={<Link to="type" />} />
                    <MenuItem primaryText="Category List" linkButton containerElement={<Link to="category" />} />
                    <MenuItem primaryText="Product List" linkButton containerElement={<Link to="product" />} />
                    <Divider />
                    <MenuItem primaryText="Users" linkButton containerElement={<Link to="product" />} />

                </Menu>
            </Paper>
        );
    }
}

export default MenuList;