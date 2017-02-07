const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const daySchema = new Schema({
    _id: { type: Number, unique: true },
    companyId: { type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId },
    today: { type: Date, default: Date.now },
    close: { type: Date },
    status: { type : Number },
    morningSale: { type: Number },
    eveningSale: { type: Number },
    netSale: { type: Number },
    netPurchase: { type: Number },
    netExpense: { type: Number }
});

// Create model class
const DayModel = mongoose.model('day', daySchema);

// Export model
module.exports = DayModel;
