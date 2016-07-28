import React, { Component, PropTypes } from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import CategoryForm from './CategoryForm';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class CategoryNew extends Component {

    constructor( props, context ) {
        super( props, context );

        this.state = {
            category: Object.assign( {}, this.props.category ),
            errors: {}
        };

        this.updateCategoryState = this.updateCategoryState.bind( this );
        this.saveCategory = this.saveCategory.bind( this );
    }

        componentWillReceiveProps( nextProps ) {
        if ( this.props.category.id != nextProps.category.id ) {
            this.setState( { category: Object.assign( {}. nextProps.category ) } );
        }
    }

    updateCategoryState( event ) {
        const field = event.target.name;
        const category = this.state.category;
        category[ field ] = event.target.value;
        this.setState({
            category: category
        });
    }

    saveCategory( event ) {
        event.preventDefault();
        //console.log(`new value is ${this.state.item}`);
        this.props.createCategory( this.state.category );
        this.context.router.push( '/category' );
    }


    render() {
        return (
            <CategoryForm onChange={this.updateCategoryState} onSave={this.saveCategory}
                category={this.state.category} errors={this.state.errors} />
        );
    }

}

CategoryNew.propTypes = {
    category: PropTypes.object.isRequired,
    createCategory: PropTypes.func.isRequired,
}

// Pull in the React Router context so router is available on this.context.router
CategoryNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getCategoryById( categories, id ) {
    const category = categories.filter(category => categories.id == id);
    if (category) return category[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const categoryId = ownProps.params.id;

    let category = {
        _id: '', name: '', status:1
    };

    if (categoryId && state.categories.length > 0 ) {
        category = getCategoryById(state.categories, categoryId);
    }

    return {
        category: category
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createCategory: bindActionCreators(actions.createCategory, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNew);