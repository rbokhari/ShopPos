const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a model

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    officeId: String
});

// Create model class
const UserModel = mongoose.model('user', userSchema);

// Export model
module.exports = UserModel;