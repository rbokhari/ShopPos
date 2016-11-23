import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const style = {
    margin: 10,
    //width: 120,
    height: 60
};

const ProductGrid = ( { products, onProductSelect, loading, errors } ) => {
    return (
        <div>
            {products.map(product=>
                <RaisedButton id={product._id} name={product._id} key={product._id} 
                    label={product.name} secondary={true} style={style}
                    onTouchTap={onProductSelect.bind(this, product._id, product.name, product.categoryId, product.categoryName, 1, product.price, product.type, product.items)} />
            )}
        </div>
    );
}

ProductGrid.propTypes = {
    products: React.PropTypes.array.isRequired,
    onProductSelect: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default ProductGrid;