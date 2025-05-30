import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const { JWT_SECRET = "" } = process.env;

export class encrypt {
  static async encryptdata(plainString: string) {
    // Generate salt dynamically with a cost factor of 10
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    return bcrypt.hashSync(plainString, salt);
  }

  static comparedata(hashedString: string, plainString: string) {
    return bcrypt.compareSync(plainString, hashedString);
  }

  static generateToken(user: any) {
    return jwt.sign({ id: user._id, iat: Date.now() + 1000 }, JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  static async generateResetToken(user: any) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    // Hash the token before storing it
    const hashedToken = await bcrypt.hash(resetToken, 10);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() +  3600000;
    await user.save();
    return resetToken;
  }
}