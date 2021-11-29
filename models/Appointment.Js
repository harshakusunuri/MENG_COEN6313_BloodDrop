const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    createdByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },

    createdDate: {
        type: Date,
        default: Date.now
    },
    donationDate: {
        type: Date,
        // default: Date.now
    }





});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);