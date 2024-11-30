const mongoose = require('mongoose');


const emp = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        lowercase: true
    },
    last_name: {
        type: String,
        required: true,
        lowercase: true
    },
    email:{
        type: String, 
        required: true,
        lowercase: true
    },
    position:{
        type: String, 
        required: true
    },
    salary:{
        type: Number, 
        required: true
    },
    date_of_joining:{
        type: Date, 
        required: true
    },
    department:{
        type: String, 
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        dafault: Date.now
    }
})

const empSchema = mongoose.model('empSchema', emp);
module.exports = empSchema;