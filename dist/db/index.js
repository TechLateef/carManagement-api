"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const DB_URI = process.env.NODE_ENV === "production"
    ? (_a = process.env.DB_CONNECTION) === null || _a === void 0 ? void 0 : _a.replace("<db_password>", process.env.DB_PASSWORD).replace("<db_username>", process.env.DB_USERNAME)
    : process.env.MONGO_URI;
if (!DB_URI) {
    throw new Error("❌ Database connection string is missing.");
}
let isConnected = false;
async function connectDB() {
    if (isConnected) {
        console.log("✅ Using existing MongoDB connection.");
        return;
    }
    try {
        await mongoose_1.default.connect(DB_URI, {
            serverSelectionTimeoutMS: 20000,
            socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log("✅ MongoDB Connected Successfully");
    }
    catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
}
exports.db = mongoose_1.default.connection;
