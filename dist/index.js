"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("reflect-metadata");
const db_1 = require("./db");
const index_1 = __importDefault(require("./src/index"));
const { PORT = 3000 } = process.env;
(async () => {
    try {
        await (0, db_1.connectDB)();
        index_1.default.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
})();
