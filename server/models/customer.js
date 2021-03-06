const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// Define a model
const customerSchema = new Schema({
    companyId: { type: Schema.ObjectId, ref: 'company' },
    officeId: { type: Schema.ObjectId, ref: 'office' },
    billNo: { type: String },
    carNumber: { type: String },
    dayId: { type: Number },
    mobileNumber: String,
    created: { type: Date, default: Date.now },
    createdOffset: { type: Number, },
    finished: { type: Date, default: Date.now },
    option: { type: String },
    status: { type : Number },
    products: [{
        productId: { 
            type: Schema.ObjectId,
            ref: 'product'
        },
        productName: { type: String },
        productNameAr: { type: String },
        categoryId: { type: Schema.ObjectId },
        categoryName: { type: String },
        qty: { type: Number },
        unitPrice: { type: Number },
        price: { type: Number },
        type: { type: Number },
        note: { type: String },
        addons: [{ 
            _id: { type: Schema.ObjectId }, 
            name: { type: String}, 
            price: { type: Number }
        }],
        items: [{
            //_id: { type: Schema.ObjectId },
            itemId: { 
                type: Schema.ObjectId,
                ref: 'item'
            },
            itemName: { type: String },
            qty: { type: Number }
        }],
    }]
});

// Create model class
const CustomerModel = mongoose.model('customer', customerSchema);

// Export model
module.exports = CustomerModel;