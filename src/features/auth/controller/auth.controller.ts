import { RequestHandler } from "express";
import { AuthService } from "../service/auth.service";


export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
  * @description This method is used to login user
  * @param req Express request
  * @param res Express response
  * @param next Express next
  * @returns void
  */
    login: RequestHandler = async (req, res, next) => {
        try {
            await this.authService.login(req.body, res);
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    /**
     * @description This method is used to register a new user
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns void
     */
    signUp: RequestHandler = async (req, res, next) => {
        try {
            await this.authService.signUp(req.body, res);
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
}