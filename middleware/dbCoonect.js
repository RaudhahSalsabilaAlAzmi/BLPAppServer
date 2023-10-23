// import mongoose from "mongoose";
// import dotenv from "dotenv";

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URL = process.env.DB_URI;

mongoose.set('strict', true); // Use 'strict' instead of 'strictQuery' for Mongoose

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

const mongoConnect = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true, // Add these options for better compatibility
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

const mongoDisconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};

module.exports = {
    mongoConnect,
    mongoDisconnect,
}