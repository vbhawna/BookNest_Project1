const Book = require("../models/book.models");

const availableGenres = Book.schema.path("genres").embeddedSchemaType["enumValues"];

function getAllGenres(req, res) {
    console.log("getAllGenres Controller started executing.")

    if(availableGenres.length > 0) {
        return res.status(200).json(availableGenres);
    } else {
        return res.status(404).json({ error: "No Genre found." });
    }
}

function getGenreByName(req, res) {
    console.log("getGenreByName Controller started executing.")
    const genre = availableGenres.find((g) => g === req.params.genreName);
    if(genre) {
        return res.status(200).json(genre);
    } else {
        return res.status(404).json({ error: "Genre not found." });
    }
}

module.exports = { getAllGenres, getGenreByName };