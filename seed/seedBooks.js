const fs = require("fs");
const mongoose = require("mongoose");
const { initializeDatabase } = require("../db/db.connect");
const Book = require("../models/book.models");

async function seedData() {
    try {
        await initializeDatabase();
        const jsonData = fs.readFileSync("./data/books-part2.json", "utf-8");
        const booksData = JSON.parse(jsonData);
        const insertedData = await Book.insertMany(booksData);
        console.log(`Inserted ${insertedData.length} books successfully.`);
    } catch(error) {
        console.log("Error occurred while Seeding data: ", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from the Database.");
    }
}

seedData();