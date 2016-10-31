const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const officeSchema = new Schema({
    companyId: { type: Schema.ObjectId },
    name: { type: String, lowercase: true },
    displayName: { type: String },
    location: { type: String },
    officeNo: { type:String },
    mobileNo: { type: String },
    status: {type : Number}
});

// Create model class
const OfficeModel = mongoose.model('office', officeSchema);

// Export model
module.exports = OfficeModel;