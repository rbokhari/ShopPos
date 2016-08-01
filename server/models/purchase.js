const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const purchaseSchema = new Schema({
    companyId: {type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId },
    billNo: { type: String },
    billDate: String,
    total: Number,
    notes: String,
    created: { type: Date, default: Date.now },
    items: [{
        itemId: { type: Schema.ObjectId },
        itemName: String,
        qty: Number,
        price: Number
    }],
    status: {type : Number}
});

// Create model class
const PurchaseModel = mongoose.model('purchase', purchaseSchema);

// Export model
module.exports = PurchaseModel;