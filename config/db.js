const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        {
            await mongoose.connect(db); // Mangoose 6 default supports: , { userNewUrlParser: true, useCreateIndex: true }
            console.log('MangoDB Connected')
        }
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;

// Impl same with Async error functins: mongoose.conect(db);
