"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUser = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const BaseUserSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number! It should be 10 digits long.`,
        },
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        // select: false, 
    },
}, { discriminatorKey: "userType", timestamps: true });
BaseUserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    try {
        // Hash the password before saving
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
    }
    catch (error) {
        next(error);
    }
    next();
});
// Method to compare passwords
BaseUserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcryptjs_1.default.compare(candidatePassword, this.password);
};
BaseUserSchema.methods.getEmailVerificationToken = function () {
    const token = crypto_1.default.randomBytes(32).toString("hex");
    this.emailVerificationToken = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    this.emailVerificationExpires = Date.now() + 30 * 60 * 1000; // 30 mins expiry
    return token;
};
// Method to get Password Reset Token
BaseUserSchema.methods.getPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    if (!resetToken) {
        throw new Error("resetToken is undefined or empty.");
    }
    this.passwordResetToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetTokenExpiresAt = Date.now() + 15 * 60 * 1000;
    return resetToken;
};
exports.BaseUser = mongoose_1.models.BaseUser || (0, mongoose_1.model)("BaseUser", BaseUserSchema);
