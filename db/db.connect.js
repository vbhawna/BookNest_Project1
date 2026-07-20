const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB;

async function initializeDatabase() {
    await mongoose
        .connect(mongoUrl)
        .then(() => console.log("Successfully connected to the database."))
        .catch((error) => console.log("Error occurred while connected to the database", error));
}

module.exports = { initializeDatabase };