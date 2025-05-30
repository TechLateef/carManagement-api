"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const encrypt_1 = require("../../../common/utils/encrypt");
const customer_model_1 = require("../../customer/model/customer.model");
const manager_model_1 = require("../../manager/model/manager.model");
class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createAndSendToken(user, res) {
        try {
            const token = encrypt_1.encrypt.generateToken(user);
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60),
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
            });
            res.set("authorization", token);
            user.password = undefined;
            return token;
        }
        catch (error) {
            throw new Error("Error creating and sending token: " + error);
        }
    }
    /**
     * @description create new user
     * @param details user details
     * @param res
     * @returns
     */
    async signUp(details, res) {
        const existingUser = await this.usersService.findByEmail(details.email.toLowerCase());
        if (existingUser) {
            return res.status(400).json({ message: 'The provided email has already been taken.' });
        }
        let newUser;
        if (details.userType === "Customer") {
            newUser = await customer_model_1.Customer.create({
                ...details,
                email: details.email.toLowerCase(),
                userType: "Customer"
            });
        }
        else if (details.userType === "Manager") {
            newUser = await manager_model_1.Manager.create({
                ...details,
                email: details.email.toLowerCase(),
                userType: "Manager"
            });
        }
        else {
            return res.status(400).json({ message: 'Invalid user type.' });
        }
        if (!newUser) {
            return res.status(500).json({ message: 'Something went wrong while creating the user.' });
        }
        const token = await this.createAndSendToken(newUser, res);
        return res.status(201).json({
            message: 'User created successfully',
            token,
            user: newUser._doc,
        });
    }
    /**
   * @description this function allows a user to log in
   * @param details LoginDTO
   * @param res Express Response
   * @returns
   */
    async login(details, res) {
        details.email = details.email.toLowerCase();
        const user = await this.usersService.findByEmail(details.email);
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(details.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const result = user._doc;
        const token = await this.createAndSendToken(user, res);
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: result,
        });
    }
}
exports.AuthService = AuthService;
