"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const user_service_1 = require("../../user/service/user.service");
const auth_service_1 = require("../service/auth.service");
const auth_controller_1 = require("../controller/auth.controller");
exports.authRouter = (0, express_1.Router)();
const userService = new user_service_1.UsersService();
const authService = new auth_service_1.AuthService(userService);
const authController = new auth_controller_1.AuthController(authService);
/**
 * @description This route is used to login user
 * @access public
 * @route POST /api/v1/auth/login
 */
exports.authRouter.post("/login", authController.login);
/**
 * @description This route is used to register a new user
 * @access public
 * @route POST /api/v1/auth/signup
 */
exports.authRouter.post("/signup", authController.signUp);
