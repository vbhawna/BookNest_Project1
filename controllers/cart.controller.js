const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Book = require("../models/book.models");

const addToCart = async (req, res, next) => {
    console.log("addToCart controller started executing.");

    try {
        const { userId, bookId } = req.body;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        const book = await Book.findById(bookId);

        if(!book) {
            return res.status(404).json({
                message: "Book not found.",
            });
        }

        const cart = await Cart.findOne({ user: userId })

        if(!cart) {
            const newCart = await Cart.create({
                user: userId,
                items: [{
                    book: bookId,
                    quantity: 1,
                }],
            });

            await newCart.populate("items.book");

            return res.status(201).json({
                message: "Cart created successfully.",
                cart: newCart,
            });
        }

        const existingItem = cart.items.find(
            (item) => item.book.toString() === bookId
        );

        if(existingItem) {
            await cart.populate("items.book");

            return res.status(200).json({
                message: "Book is already in the cart.",
                cart,
            });
        } else {
            cart.items.push({
                book: bookId, 
                quantity: 1,
            });
            await cart.save();

            await cart.populate("items.book");

            return res.status(200).json({
                message: "Book added to the cart successfully.",
                cart,
            });
        }
    } catch(error) {
        console.error("Error while adding books in the cart: ", error);
        next(error);
    }
};

const getCart = async (req, res, next) => {
    console.log("getCart controller started executing.");

    try {
        const { userId } = req.query;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        const cart = await Cart.findOne({ user: userId })
            .populate("items.book");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found.",
            });
        }

        return res.status(200).json({
            message: "Cart fetched successfully.",
            cart,
        });

    } catch (error) {
        console.error(
            "Error while fetching cart: ",
            error
        );

        next(error);
    }
};

const updateCartQuantity = async (req, res, next) => {
    console.log("updateCartQuantity controller started executing.");

    try {
        const { userId, operation } = req.body;
        const { bookId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found.",
            });
        }

        const cartItem = cart.items.find(
            (item) => item.book.toString() === bookId
        );

        if (!cartItem) {
            return res.status(404).json({
                message: "Book is not in the cart.",
            });
        }

        if (operation !== "increase" && operation !== "decrease") {
            return res.status(400).json({
                message: "Invalid operation.",
            });
        }

        if (operation === "increase") {
            cartItem.quantity += 1;
        }

        if (operation === "decrease") {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            }
        }

        await cart.save();

        await cart.populate("items.book");

        return res.status(200).json({
            message: "Cart updated successfully.",
            cart,
        });

    } catch (error) {
        console.error(
            "Error while updating cart quantity: ",
            error
        );

        next(error);
    }
};

const removeFromCart = async (req, res, next) => {
    try {
        // get userId and bookId
        const bookId = req.params.bookId;
        const userId = req.query.userId;

        // find cart
        const cart = await Cart.findOne({ user: userId });

        // check cart
        if(!cart) {
            return res.status(404).json({
                message: "Cart not found."
            });
        }

        const existingItem = cart.items.find(
            (item) => item.book.toString() === bookId
        );

        if(!existingItem) {
            return res.status(404).json({
            message: "Book is not in the cart."
            });
        }   

        // remove book from cart.items
        cart.items = cart.items.filter(
            (item) => item.book.toString() !== bookId
        );

        // save cart
        await cart.save();

        await cart.populate("items.book");

        // return updated cart
        return res.status(200).json({
            message: "Book removed from the cart successfully.",
            cart,
        });

    } catch(error) {
        // error handling
        console.error("Error while removing Book From the cart: ", error);
        next(error);
    }
};


module.exports = { addToCart, getCart, updateCartQuantity, removeFromCart };