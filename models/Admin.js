const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    address: {
        type: String,
        require: true
    },
    bloodGroup: {
        type: String,
        require: true
    },
    adminAccess: {
        type: Boolean,
        require: true

    },
    date: {
        type: Date,
        default: Date.now
    }








});

module.exports = Admin = mongoose.model('admin', AdminSchema);