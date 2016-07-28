const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const officeSchema = new Schema({
    companyId: { type: Schema.ObjectId },
    code: { type: String, unique: true, lowercase: true },
    name: { type: String, unique: true, lowercase: true },
    displayName: String,
    location: String,
    officeNo: String,
    mobileNo: String,
    status: {type : Number}
});

// Create model class
const OfficeModel = mongoose.model('office', officeSchema);

// Export model
module.exports = OfficeModel;