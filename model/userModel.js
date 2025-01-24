const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxlength: 320,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 15,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    profilePicture: {
        type: String,
        trim: true,
        default: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT15m1zlN0XxCPpn4e7Z4n5HzVz4IhKDjTCbi9PVaO_yIXGXRLrxgLdx51HyxOz8XTLNwYqtwm_QLBD_HXlPcZquw"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,

}, { timestamps: true });

module.exports = new mongoose.model("Users", userSchema)