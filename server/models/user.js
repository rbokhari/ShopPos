const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define a model

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    companyId: { 
        type: Schema.ObjectId,
        ref: 'companies'
    },
    officeId: { 
        type: Schema.ObjectId,
        ref: 'offices'
    },
    roleId: { type: Number },
    status: { type: Number }
});

// on save hook, encrypt password
userSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;

    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // hash(i.e.encrypt) password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) { return next(err); }

            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

// userSchema.pre('update', function(next) {
//     // get access to the user model
//     let newPassword = this.getUpdate().$set.password;
// console.log('user pre running', newPassword);
//     // generate a salt then run callback
//     bcrypt.genSalt(10, function(err, salt) {
//         if (err) { return next(err); }
//         console.log('user password for hash', newPassword);
//         // hash(i.e.encrypt) password using the salt
//         bcrypt.hash(newPassword, salt, null, function(err, hash){
//             if (err) { return next(err); }

//             // overwrite plain text password with encrypted password
//             console.log('user pre salt', hash);
//             //newPassword = hash;
//             this.findOneAndUpdate({}, {$set: {password: hash}});
//             next();
//         });
//     });
// });

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
};

// Create model class
const UserModel = mongoose.model('user', userSchema);

// Export model
module.exports = UserModel;