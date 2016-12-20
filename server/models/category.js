const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const categorySchema = new Schema({
    name: { type: String },
    status: {type : Number},
    companyId: { type: Schema.ObjectId },
    officeId: { type: Schema.ObjectId },
    addons: [{
        _id: { type: Schema.ObjectId },
        name: { type: String },
        price: { type: Number }
    }]
});

// Create model class
const CategoryModel = mongoose.model('category', categorySchema);

// Export model
module.exports = CategoryModel;
