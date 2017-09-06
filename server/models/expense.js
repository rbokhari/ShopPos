const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const expenseSchema = new Schema({
    companyId: {
        type: Schema.ObjectId,
        ref: 'company'
    },
    officeId: { 
        type: Schema.ObjectId,
        ref: 'office'
    },
    code : { type: String, unique: true, lowercase: true },
    created: { type: Date, default: Date.now },
    amount: { type: Number },
    description: { type: String },
    categoryId: { 
        type: Schema.ObjectId,
        ref: 'category'
    },
    categoryName: { type: String }
});

// Create model class
const ExpensehModel = mongoose.model('expense', expenseSchema);

// Export model
module.exports = ExpensehModel;