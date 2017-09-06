const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const productSchema = new Schema({
    companyId: { 
        type: Schema.ObjectId,
        ref: 'company'
    },
    officeId: { 
        type: Schema.ObjectId,
        ref: 'office'
    },
    code: { type: String },
    name: { type: String },
    nameAr: { type: String },
    categoryId: { 
        type: Schema.ObjectId,
        ref: 'category'
    },
    price: { type: Number },
    type: { type: Number },
    status: {type : Number},
    items: [{
        itemId: { 
            type: Schema.ObjectId,
            ref: 'item'
        },
        itemName: { type: String },
        qty: { type: Number }
    }],
});

// Create model class
const ProductModel = mongoose.model('product', productSchema);

// Export model
module.exports = ProductModel;