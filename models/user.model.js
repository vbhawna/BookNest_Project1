const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    }, 
    lastName: {
        type: String, 
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String, 
        required: true,
        enum: ["Male", "Female", "Other"]
    }
}, 
{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;

