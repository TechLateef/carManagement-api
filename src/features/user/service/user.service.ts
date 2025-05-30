import { Response } from "express";
import { encrypt } from "../../../common/utils/encrypt";
import { BaseUser } from "../model/user.model";
import { CreateUserDto } from "../../auth/dto/createUser.dto";
export class UsersService {


    /**
     * @description This create new User
     * @param details user data 
     * @returns 
     */
    async createUser(details: CreateUserDto) {
        return BaseUser.create({ ...details })
    }


    /**
    * @description Find user by id
    * @param userId string user Id
    * @returns 
    */
    async findById(userId: string) {
        // console.log("userId", userId)
        const user = await BaseUser.findById(userId);
        // console.log('User', user)
        return user
    }

    /**
     * @description find user by eamil
     * @param email string User email
     * @returns 
     */
    async findByEmail(email: string) {
        return await BaseUser.findOne({ where: email })
    }


    /**
  * @description Updates the user's details with the provided userId
  * @param userId string userId
  * @param details any details to update
  * @param res Express Response
  * @returns 
  */
    async updateById(userId: string, details: any, res: Response) {

        const user = await BaseUser.findByIdAndUpdate(userId, details, { new: true });
        return user._doc;

    }
}