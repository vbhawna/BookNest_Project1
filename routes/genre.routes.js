const { getAllGenres, getGenreByName } = require("../controllers/genre.controller");

const express = require("express");
const genreRouter = express.Router();

genreRouter.get("/", getAllGenres);

genreRouter.get("/:genreName", getGenreByName);

module.exports = genreRouter;