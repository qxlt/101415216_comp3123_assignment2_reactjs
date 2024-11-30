const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String, 
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    updated_at:{
        type: Date,
        dafault: Date.now()
    }
})

user.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password') || user.isNew) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

const userSchema = mongoose.model('userSchema', user);
module.exports = userSchema;