const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB;

async function initializeDatabase() {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Successfully connected to the database.");
    } catch(error) {
        console.error("Error connecting to the database: ", error);
        throw error;
    }
}

module.exports = { initializeDatabase };