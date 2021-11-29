const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    location: {
        type: String,
        require: true
    },
    bloodGroup: {
        type: String,
        require: true
    },
    userType: {//#ADMIN, #USER  OR #ORG
        type: String,
        require: true

    },
    adminAccess: {
        type: Boolean,
        require: true

    },
    organizationName: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }






});

module.exports = User = mongoose.model('user', UserSchema);