const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const daySchema = new Schema({
    companyId: { type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId },
    today: { type: Date, default: Date.now },
    close: { type: Date },
    status: { type : Number }
});

// Create model class
const DayModel = mongoose.model('day', daySchema);

// Export model
module.exports = DayModel;
