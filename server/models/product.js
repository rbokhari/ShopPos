const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const productSchema = new Schema({
    companyId: { type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId },
    code: { type: String, unique: true },
    name: { type: String, unique: true },
    nameAr: { type: String, unique: true },
    categoryId: { type: Schema.ObjectId },
    price: { type: Number },
    status: {type : Number}
});

// Create model class
const ProductModel = mongoose.model('product', productSchema);

// Export model
module.exports = ProductModel;