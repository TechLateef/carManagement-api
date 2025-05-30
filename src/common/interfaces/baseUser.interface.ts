import { Document } from "mongoose";

export interface IBaseUser extends Document {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    userType: string;


    comparePassword(candidatePassword: string): Promise<boolean>;
    getPasswordResetToken(): Promise<string>;
    getEmailVerificationToken(): string;
}
