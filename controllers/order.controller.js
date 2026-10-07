const User = require("../models/user.model");
const Address = require("../models/address.models");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

const createOrder = async (req, res, next) => {
    console.log("createOrder controller started executing.");

    try {
        const { userId, addressId } = req.body;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        const address = await Address.findOne({ user: userId, _id: addressId});

        if(!address) {
            return res.status(404).json({
                message: "Address not found.",
            });
        }

        const cart = await Cart.findOne({ user: userId }).populate("items.book");

        if(!cart || cart.items.length === 0) {
            return res.status(404).json({
                message: "Either no cart found or cart is empty.",
            });
        }

        const sellingPrice = (mrp, discountPercentage) => Math.round(mrp - mrp * discountPercentage/100);

        const orderItems = cart.items.map((item) => ({
            book: item.book._id,
            title: item.book.title,
            coverImage: item.book.coverImageUrl,
            mrpAtPurchase: item.book.originalPrice,
            priceAtPurchase: sellingPrice(item.book.originalPrice, item.book.discountPercentage),
            quantity: item.quantity,
        }));

        const totalMRP = cart.items.reduce((total, item) => {
            return (
                total +
                item.book.originalPrice * item.quantity
            );
        }, 0);

        const totalSP = cart.items.reduce((total, item) => {
                return total + item.quantity * sellingPrice(item.book.originalPrice, item.book.discountPercentage)
            }, 0);

        const discount = totalMRP - totalSP;

        const deliveryCharge = totalSP >= 500 ? 0 : 50;

        const total = totalSP + deliveryCharge;

        const newOrder = await Order.create({
            user: userId,
            items: [...orderItems],
            shippingAddress: {
                fullName: address.fullName,
                phoneNumber: address.phoneNumber,
                houseNumber: address.houseNumber,
                street: address.street,
                city: address.city,
                state: address.state,
                country: address.country,
                pincode: address.pincode,
                addressType: address.addressType,
            },
            totalMRP,
            discount,
            totalSP,
            deliveryCharge,
            totalAmount: total,
        });

        // clear Cart
        cart.items = [];
        await cart.save();

        // return created order
        return res.status(201).json({
            message: "New order created successfully.",
            order: newOrder,
        });
    } catch(error) {
        console.error("Error while creating order: ", error);
        next(error);
    }
};

const getOrders = async (req, res, next) => {
    console.log("getOrders controller started executing.");

    try {
        const userId = req.query.userId;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

        if(!orders || orders.length === 0) {
            return res.status(404).json({
                message: "No order list found.",
            });
        }

        return res.status(200).json({
            message: "Orders fetched successfully.",
            orders,
        });
    } catch(error) {
        console.log("Error while fetching orders: ", error);
        next(error);
    }
}

module.exports = { createOrder, getOrders };