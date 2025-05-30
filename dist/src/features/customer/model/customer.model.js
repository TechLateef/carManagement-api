"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../../user/model/user.model");
const customerSchema = new mongoose_1.Schema({
    address: { type: String },
}, { timestamps: true });
exports.Customer = user_model_1.BaseUser.discriminator('Customer', customerSchema);
