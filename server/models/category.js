const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const categorySchema = new Schema({
    name: { type: String },
    status: {type : Number},
    companyId: { type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId }
});

// Create model class
const CategoryModel = mongoose.model('category', categorySchema);

// Export model
module.exports = CategoryModel;
