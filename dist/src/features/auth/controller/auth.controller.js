"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
        /**
      * @description This method is used to login user
      * @param req Express request
      * @param res Express response
      * @param next Express next
      * @returns void
      */
        this.login = async (req, res, next) => {
            try {
                await this.authService.login(req.body, res);
            }
            catch (error) {
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
        this.signUp = async (req, res, next) => {
            try {
                await this.authService.signUp(req.body, res);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
