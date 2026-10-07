const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
    
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true
            },
            title: {
                type: String,
                required: true,
            },
            coverImage: {
                type: String, 
                required: true,
            },
            mrpAtPurchase: {
                type: Number,
                required: true,
            },
            priceAtPurchase: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        }
    ],

    shippingAddress: {
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        houseNumber: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        addressType: {
            type: String,
            enum: ["Home", "Work", "Other"],
            required: true,
        },
    },

    totalMRP: {
        type: Number,
        required: true,
    },

    discount: {
        type: Number,
        required: true,
    },

    totalSP: {
        type: Number,
        required: true,
    },

    deliveryCharge: {
        type: Number,
        required: true,
    },

    totalAmount: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: [
            "Placed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ],
        default: "Placed",
        required: true,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;