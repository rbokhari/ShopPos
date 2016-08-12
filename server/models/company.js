const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const companySchema = new Schema({
    name: { type: String, unique: true, lowercase: true },
    displayName: String,
    location: String,
    contactNo: String,
    status: {type : Number}
});

// Create model class
const BranchModel = mongoose.model('company', companySchema);

// Export model
module.exports = BranchModel;