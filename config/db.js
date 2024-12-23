const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.mongo_uri
const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(uri, {
            ssl: true,
            tlsAllowInvalidCertificates: true,
        });

        console.log('db connected');
    } catch (error) {
        console.error('mongo db connection error', error);
    }
};

module.exports = dbConnect;