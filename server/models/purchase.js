const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const purchaseSchema = new Schema({
    companyId: {
        type: Schema.ObjectId,
        ref: 'company'
    },
    officeId: { 
        type: Schema.ObjectId,
        ref: 'office'
    },
    billNo: { type: String },
    billDate: { type: String },
    supplierId: { 
        type: Schema.ObjectId,
        ref: 'supplier'
    },
    total: { type: Number },
    notes: { type: String },
    created: { type: Date, default: Date.now },
    items: [{
        itemId: { 
            type: Schema.ObjectId,
            ref: 'item'
        },
        itemName: { type: String },
        qty: { type: Number },
        price: { type: Number }
    }],
    amounts: [
        {
            date: { type: Date },
            amount: { type: Number }
        }
    ],
    status: {type : Number}
});

// Create model class
const PurchaseModel = mongoose.model('purchase', purchaseSchema);

// Export model
module.exports = PurchaseModel;