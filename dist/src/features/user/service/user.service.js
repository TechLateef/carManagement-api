"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const user_model_1 = require("../model/user.model");
class UsersService {
    /**
     * @description This create new User
     * @param details user data
     * @returns
     */
    async createUser(details) {
        return user_model_1.BaseUser.create({ ...details });
    }
    /**
    * @description Find user by id
    * @param userId string user Id
    * @returns
    */
    async findById(userId) {
        // console.log("userId", userId)
        const user = await user_model_1.BaseUser.findById(userId);
        // console.log('User', user)
        return user;
    }
    /**
     * @description find user by eamil
     * @param email string User email
     * @returns
     */
    async findByEmail(email) {
        return await user_model_1.BaseUser.findOne({ where: email });
    }
    /**
  * @description Updates the user's details with the provided userId
  * @param userId string userId
  * @param details any details to update
  * @param res Express Response
  * @returns
  */
    async updateById(userId, details, res) {
        const user = await user_model_1.BaseUser.findByIdAndUpdate(userId, details, { new: true });
        return user._doc;
    }
}
exports.UsersService = UsersService;
