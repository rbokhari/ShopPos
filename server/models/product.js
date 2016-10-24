const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const productSchema = new Schema({
    companyId: { type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId },
    code: { type: String },
    name: { type: String },
    nameAr: { type: String },
    categoryId: { type: Schema.ObjectId },
    price: { type: Number },
    type: { type: String },
    status: {type : Number},
    items: [{
        itemId: { type: Schema.ObjectId },
        itemName: String,
        qty: Number
    }],
});

// Create model class
const ProductModel = mongoose.model('product', productSchema);

// Export model
module.exports = ProductModel;