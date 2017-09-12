const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.Promise = global.Promise;

// Define a model
const categorySchema = new Schema({
    name: { type: String },
    status: {type : Number},
    companyId: { 
        type: Schema.ObjectId,
        ref: 'company'
    },
    officeId: { 
        type: Schema.ObjectId,
        ref: 'office' 
    },
    addons: [{
        _id: { 
            type: Schema.ObjectId
        },
        name: { type: String },
        price: { type: Number }
    }]
}
//,{ collection: 'category' }
);

// Create model class
const CategoryModel = mongoose.model('category', categorySchema);

// Export model
module.exports = CategoryModel;
