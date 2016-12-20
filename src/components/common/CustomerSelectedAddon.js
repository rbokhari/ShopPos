import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import {blue300, indigo900} from 'material-ui/styles/colors';

const styles = {
    chip: {
        margin: 4,
      },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

const CustomerSelectedAddon = ( { customer, productIndex, onAddOnDelete } ) => {
    console.log("cusertom ", productIndex, customer);
    if (productIndex == -1) {
        return (<div>&nbsp;</div>)
    }
    const addons = customer.products[productIndex].addons;
    return (
        <div style={styles.wrapper}>
            {addons.map((addon, index) => 
                <Chip backgroundColor={blue300} labelColor='#fff'
                    key={addon._id}
                    onRequestDelete={onAddOnDelete.bind(this, index)}
                    style={styles.chip} >
                    {addon.name}
                </Chip>            
            )}
        </div>
    );
}

CustomerSelectedAddon.propTypes = {
    customer: React.PropTypes.object,
    onAddOnDelete: React.PropTypes.func.isRequired,
    productIndex: React.PropTypes.number
};

export default CustomerSelectedAddon;