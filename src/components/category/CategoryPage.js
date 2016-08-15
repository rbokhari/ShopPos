import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import CategoryList from './CategoryList';

const cardHeight = 400;

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const fabStyle = {
    marginTop: 10,
    marginLeft: '90%'
};

class CategoryPage extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        //console.error(nextProps);
        this.props.loadCategories();
    }

    render() {
        const {categories} = this.props;

        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} linkButton containerElement={<Link to="categorynew" />}>
                    <ContentAdd />
                </FloatingActionButton>
                <CategoryList categories={categories} />
            </div>
        );
    }

}

CategoryPage.propTypes = {
    categories: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return { categories: state.categories };
}

export default connect(mapStateToProps, actions)(CategoryPage);