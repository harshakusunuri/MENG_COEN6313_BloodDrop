const mongoose = require('mongoose');

const MyReqSchema = new mongoose.Schema({
    createdByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    reqToUser: {
        // #DONOR 
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
    userRequestType: {
        // (STORE_BLOOD_REQ (#STORE),DONOR_BLOOD_REQ(#DONOR)  & REQ_TO_ADMIN(#ADMIN))
        type: String,
        required: true
    },
    status: { // CONFIRM(STORE_BLOOD_REQ)&(REQ_TO_ADMIN) ;  PENDING (DONOR_BLOOD_REQ)-> Upon DONOR decision changes to CONFIRM/DECLINE 
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
    },
    updatedDate: { //#ADMIN //#DONOR
        type: Date,
        // default: Date.now
    },
    updatedBy: { //#ADMIN //#DONOR
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    description: {
        type: String,
        // required: true
    }





});

module.exports = MyReq = mongoose.model('myReq', MyReqSchema);