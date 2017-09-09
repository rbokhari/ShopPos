import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    //backgroundColor: '#4B77BE',
    margin: 10,
    //width: 120,
    height: 50,
    color: '#BDBDBD'
};

const CategoryGrid = ( { categories, onCategorySelect, loading, errors } ) => {
    return (
        <div >
            {categories.map(category=>
                <RaisedButton id={category._id} name={category._id} key={category._id} label={category.name} 
                    primary={true} style={styles}
                    onTouchTap={onCategorySelect.bind(this, category._id)} >
                </RaisedButton>
            )}
        </div>
    );
}

CategoryGrid.propTypes = {
    categories: React.PropTypes.array.isRequired,
    onCategorySelect: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default CategoryGrid;