const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// Define a model

const itemSchema = new Schema({
    companyId: { 
        type: Schema.ObjectId,
        ref: 'company'
    },
    officeId: { 
        type: Schema.ObjectId,
        ref: 'office'
    },
    code: { type: String, lowercase: true },    //unique: true,
    name: { type: String },
    uom: { type: Number },
    uomCount: { type: Number },
    description: { type: String },
    stock: { type: Number },
    status: {type : Number}
});

// Create model class
const ItemModel = mongoose.model('item', itemSchema);

// Export model
module.exports = ItemModel;