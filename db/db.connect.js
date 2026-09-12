const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB;

let connectionPromise;

async function initializeDatabase() {
    if(mongoose.connection.readyState === 1) {
        console.log("Using existing MongoDB connection");
        return;
    }

    if(mongoose.connection.readyState === 2) {
        console.log("Wait for same MongoDB connection, it is already in progress");
        return connectionPromise;
    }

    console.log("Creating new MongoDB connection");
    connectionPromise = mongoose.connect(mongoUrl);

    try {
        await connectionPromise;
    } catch(error) {
        connectionPromise = null;
        throw error;
    }
}

module.exports = { initializeDatabase };