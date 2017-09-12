const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
//mongoose.set('debug', true);
// Define a model

const daySchema = new Schema({
    _id: { type: Number, unique: true },
    companyId: { 
        type: Schema.ObjectId,
        ref: 'company'
    },
    officeId: { 
        type: Schema.ObjectId,
        ref: 'office'
    },
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
