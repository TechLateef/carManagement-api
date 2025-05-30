"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    brand: { type: String, required: [true, 'brand field is required'], index: true },
    model: { type: String, required: [true, 'Car model is required'], index: true },
    year: { type: Number, required: [true, 'Car year is required'] },
    price: { type: Number, required: [true, 'Car price is required'], index: true },
    available: { type: Boolean, default: true, index: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer', required: false }
}, { timestamps: true });
exports.Car = (0, mongoose_1.model)('Car', carSchema);
