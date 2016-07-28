const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const categorySchema = new Schema({
    name: { type: String, unique: true },
    status: {type : Number}
});

// Create model class
const CategoryModel = mongoose.model('category', categorySchema);

// Export model
module.exports = CategoryModel;