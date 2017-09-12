const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// Define a model

const expenseMasterSchema = new Schema({
    name : { type: String, unique: true },
    created: { type: Date, default: Date.now },
    description: { type: String }
});

// Create model class
const ExpenseMasterModel = mongoose.model('expenseMaster', expenseMasterSchema);

// Export model
module.exports = ExpenseMasterModel;