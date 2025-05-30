import { Router } from "express";
import { UsersService } from "../../user/service/user.service";
import { AuthService } from "../service/auth.service";
import { AuthController } from "../controller/auth.controller";

 

export const authRouter = Router()

const userService = new UsersService();

const authService = new AuthService(userService)

const authController = new AuthController(authService)



/**
 * @description This route is used to login user
 * @access public
 * @route POST /api/v1/auth/login
 */
authRouter.post("/login", authController.login);


/**
 * @description This route is used to register a new user
 * @access public
 * @route POST /api/v1/auth/signup
 */
authRouter.post("/signup", authController.signUp);