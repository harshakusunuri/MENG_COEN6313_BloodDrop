const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
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
    OrganizationName: {
        type: String,
        require: true
    },
    isOrg: {
        type: Boolean,
        require: true

    },
    date: {
        type: Date,
        default: Date.now
    }






});

module.exports = Organization = mongoose.model('organization', OrganizationSchema);