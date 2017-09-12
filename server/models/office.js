const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// Define a model
const officeSchema = new Schema({
    companyId: { 
        type: Schema.ObjectId,
        ref: 'company'
    },
    name: { type: String },
    displayName: { type: String },
    location: { type: String },
    officeNo: { type:String },
    mobileNo: { type: String },
    status: {type : Number},
    isActive: { type: Number }
});

// Create model class
const OfficeModel = mongoose.model('office', officeSchema);

// Export model
module.exports = OfficeModel;