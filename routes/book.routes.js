const { getAllBooks, getBookById } = require("../controllers/book.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllBooks);

router.get("/:bookId", getBookById);

module.exports = router;