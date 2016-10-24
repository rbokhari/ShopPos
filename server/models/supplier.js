const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const supplierSchema = new Schema({
    name: { type: String },
    person: { type: String },
    contact: { type: String },
    description: { type: String },
    status: { type : Number },
    companyId: { type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId }
});

// Create model class
const SupplierModel = mongoose.model('supplier', supplierSchema);

// Export model
module.exports = SupplierModel;
