const Wishlist = require("../models/wishlist.model");

const getWishlist = async (req, res, next) => {
    console.log("getWishlist controller started executing.")

    try {
        const { userId } = req.query;
        const wishlist = await Wishlist.findOne({ user: userId }).populate("books");

        if(!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found."
            });
        }

        res.status(200).json({
            message: "Wishlist fetched successfully",
            wishlist: wishlist,
        });
    } catch(error) {
        console.error("Error while fetching wishlist", error);
        next(error);
    }
};

const addToWishlist = async (req, res, next) => {
    console.log("addToWishlist controller started executing.");

    try {
        const {userId, bookId } = req.body;

        console.log("userId: ", userId);
        console.log("bookId: ", bookId);

        const wishlist = await Wishlist.findOne({ user: userId });

        if(!wishlist) {
            const newWishlist = new Wishlist({ user: userId, books: [bookId] });
            const savedWishlist = await newWishlist.save();

            return res.status(201).json({
                message: "Book added to wishlist successfully.", 
                wishlist: savedWishlist,
            });
        }

        const updatedWishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $addToSet: { books: bookId } },
            { returnDocument: "after" },
        ).populate("books");

        res.status(200).json({
            message: "Book added to wishlist successfully",
            wishlist: updatedWishlist,
        });

    } catch(error) {
        console.error("Error while adding book to wishlist.");
        next(error);
    }
}

const removeFromWishlist = async (req, res, next) => {
    console.log("removeFromWishlist controller started executing.");

    try {
        const bookId = req.params.bookId;
        const { userId } = req.query;

        const updatedWishlist = await Wishlist.findOneAndUpdate(
            { user: userId, books: bookId }, 
            { $pull : { books: bookId }},
            { returnDocument: "after" }
        ).populate("books");

        if(!updatedWishlist) {
            return res.status(404).json({
                message: "Wishlist not found",
            });
        }

        res.status(200).json({
            message: "Book removed from wishlist successfully.",
            wishlist: updatedWishlist,
        });

    } catch(error) {
        console.error("Error while removing book from the wishlist.");
        next(error);
    }
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist };