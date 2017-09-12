const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.Promise = global.Promise;

// Define a model

const companySchema = new Schema({
    name: { type: String, unique: true, lowercase: true },
    displayName: { type: String },
    location: { type: String },
    contactNo: { type: String },
    status: { type : Number }
});

// Create model class
const BranchModel = mongoose.model('company', companySchema);

// Export model
module.exports = BranchModel;