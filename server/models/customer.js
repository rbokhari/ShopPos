const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const customerSchema = new Schema({
    companyId: { type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId },
    billNo: { type: String },
    carNumber: { type: String },
    dayId: { type: Number },
    mobileNumber: String,
    created: { type: Date, default: Date.now },
    status: { type : Number },
    products: [{
        productId: { type: Schema.ObjectId },
        productName: { type: String },
        categoryId: { type: Schema.ObjectId },
        categoryName: { type: String },
        qty: { type: Number },
        unitPrice: { type: Number },
        price: { type: Number },
        type: { type: Number },
        items: [{
            //_id: { type: Schema.ObjectId },
            itemId: { type: Schema.ObjectId },
            itemName: String,
            qty: { type: Number }
        }],
    }]
});

// Create model class
const CustomerModel = mongoose.model('customer', customerSchema);

// Export model
module.exports = CustomerModel;