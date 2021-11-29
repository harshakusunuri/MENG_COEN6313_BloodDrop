const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
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

    donationSlots: {
        type: Number,
        require: true
    },

    bloodGroup: {
        APlus: {
            type: Number,
            require: true
        },
        AMinus: {
            type: Number,
            require: true
        },
        BPlus: {
            type: Number,
            require: true
        },
        BMinus: {
            type: Number,
            require: true
        },
        ABPlus: {
            type: Number,
            require: true
        },
        ABMinus: {
            type: Number,
            require: true
        },
        OPlus: {
            type: Number,
            require: true
        },
        OMinus: {
            type: Number,
            require: true
        },
    },

    date: {
        type: Date,
        default: Date.now
    }




});

module.exports = Store = mongoose.model('store', StoreSchema);