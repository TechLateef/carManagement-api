"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../../user/model/user.model");
const managerSchema = new mongoose_1.Schema({
    role: { type: String, enum: ['admin', 'sales', 'service'], default: 'sales' },
}, { timestamps: true });
exports.Manager = user_model_1.BaseUser.discriminator("Manager", managerSchema);
