const express = require("express");
const { addToCart, getCart, updateCartQuantity, removeFromCart } = require("../controllers/cart.controller");

const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.patch("/:bookId", updateCartQuantity);
cartRouter.delete("/:bookId", removeFromCart);

module.exports = cartRouter;