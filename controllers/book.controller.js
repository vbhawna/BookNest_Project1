const Book = require("../models/book.models");

async function getAllBooks(req, res) {
    try {
        const allBooks = await Book.find();
        if(allBooks.length > 0) {
            return res.status(200).json(allBooks);
        } else {
            return res.status(200).json({ message: "No books found.", books: [] });
        }
        
    }catch(error) {
        console.error("Error occurred while fetching All Books: ", error);
        return res.status(500).json({ error: "Failed to fetch data"});
    }
}

async function getBookById(req, res) {
    try {
        const book = await Book.findById(req.params.bookId);
        if(book) {
            return res.status(200).json(book);
        } else {
            return res.status(404).json({ error: "Book not found." });
        }
    } catch(error) {
        console.error("Error occurred while fetching Book by Id: ", error);
        return res.status(500).json({ error: "Failed to fetch data"});
    }
}

module.exports = { getAllBooks, getBookById };