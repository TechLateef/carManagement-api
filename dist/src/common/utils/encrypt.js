"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const { JWT_SECRET = "" } = process.env;
class encrypt {
    static async encryptdata(plainString) {
        // Generate salt dynamically with a cost factor of 10
        const salt = await bcryptjs_1.default.genSalt(10);
        // Hash the password using the generated salt
        return bcryptjs_1.default.hashSync(plainString, salt);
    }
    static comparedata(hashedString, plainString) {
        return bcryptjs_1.default.compareSync(plainString, hashedString);
    }
    static generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user._id, iat: Date.now() + 1000 }, JWT_SECRET, {
            expiresIn: "1d",
        });
    }
    static async generateResetToken(user) {
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        // Hash the token before storing it
        const hashedToken = await bcryptjs_1.default.hash(resetToken, 10);
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        return resetToken;
    }
}
exports.encrypt = encrypt;
