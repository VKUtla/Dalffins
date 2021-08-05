//Author: Divyashree Bangalore Subbaraya (B00875916)
const SALT_HASH_ROUNDS = 10;

const mongoose = require('mongoose')

const bcrypt = require("bcryptjs");

//Creating a user model schema
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

//To hash the user's password
UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(SALT_HASH_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

//To verify the user's password on login
UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);