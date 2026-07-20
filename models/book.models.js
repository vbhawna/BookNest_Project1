const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: [{
        type: String,
        required: true
    }],
    coverImageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    originalPrice: {
        type: Number, 
        required: true
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    stockQuantity: {
        type: Number, 
        required: true,
        min: 0
    }, 
    description: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    format: {
        type: String,
        required: true, 
        enum: ["Paperback", "Hardcover", "Ebook"]
    },
    language: {
        type: String,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: true,
        min: 1
    },
    genres: [{
        type: String,
        required: true,
        enum: ["Fiction", "Non-Fiction", "Biography", "Academic", "Mystery", "Thriller", "Romance", "Comics", "Self-Help", "Business", "Exam prep"]
    }]
}, 
{
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;