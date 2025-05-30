import { Document, Schema, model, models } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { IBaseUser } from "../../../common/interfaces/baseUser.interface";



const BaseUserSchema = new Schema<IBaseUser>(
  {
    fullName: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v: string) {
          return /\d{10}/.test(v); 
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid phone number! It should be 10 digits long.`,
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
   
  },
  { discriminatorKey: "userType", timestamps: true }
);


BaseUserSchema.pre<IBaseUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
     next(error as import("mongoose").CallbackError);
  }
  next();
});

// Method to compare passwords
BaseUserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

BaseUserSchema.methods.getEmailVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.emailVerificationExpires = Date.now() + 30 * 60 * 1000; // 30 mins expiry

  return token;
};


// Method to get Password Reset Token
BaseUserSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  if (!resetToken) {
    throw new Error("resetToken is undefined or empty.");
  }

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetTokenExpiresAt = Date.now() + 15 * 60 * 1000;

  return resetToken;
};



export const BaseUser =
  models.BaseUser || model<IBaseUser>("BaseUser", BaseUserSchema);