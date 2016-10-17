const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const customerSchema = new Schema({
    companyId: {type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId },
    billNo: { type: String },
    carNumber: { type: String },
    mobileNumber: String,
    created: { type: Date, default: Date.now },
    products: [{
        productId: { type: Schema.ObjectId },
        productName: String,
        categoryId: { type: Schema.ObjectId },
        categoryName: String,
        qty: Number,
        unitPrice: Number,
        price: Number,
        items: [{
            itemId: { type: Schema.ObjectId },
            itemName: String,
            qty: Number
        }],
    }],
    status: {type : Number}
});

// Create model class
const CustomerModel = mongoose.model('customer', customerSchema);

// Export model
module.exports = CustomerModel;