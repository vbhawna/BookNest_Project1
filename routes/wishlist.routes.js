const express = require("express");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controllers/wishlist.controller");

const wishlistRouter = express.Router();

wishlistRouter.get("/", getWishlist);
wishlistRouter.post("/", addToWishlist);
wishlistRouter.delete("/:bookId", removeFromWishlist);

module.exports = wishlistRouter;