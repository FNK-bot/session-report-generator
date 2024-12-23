const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.mongo_local
const mongoose = require('mongoose');

// Enable Mongoose debug mode
mongoose.set('debug', true);

console.log(uri)

const dbConnect = async () => {
    try {
        await mongoose.connect(uri);

        console.log('db connected');
    } catch (error) {
        console.error('mongo db connection error', error);
    }
};

module.exports = dbConnect;