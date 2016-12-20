import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    margin: 5,
    //width: 120,
    height: 40
};

const CategoryAddOnGrid = ( { categories, categoryId, onAddOnSelect, loading, errors } ) => {
    if (categoryId === '0') {
        return (<div>No Addon</div>);
    }
    const category = categories.filter((category, i) => { 
        return category._id === categoryId 
    })[0];
    return (
        <div >
            {category.addons.map(addon=>
                <RaisedButton backgroundColor="#BBB9B7" labelColor="#fff" id={addon._id} name={addon._id} key={addon._id} 
                    label={addon.name} 
                    style={styles}
                    onTouchTap={onAddOnSelect.bind(this, addon._id, addon.name, addon.price)} >
                </RaisedButton>
            )}
        </div>
    );
}

CategoryAddOnGrid.propTypes = {
    categories: React.PropTypes.array.isRequired,
    onAddOnSelect: React.PropTypes.func.isRequired,
    categoryId: React.PropTypes.string,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default CategoryAddOnGrid;