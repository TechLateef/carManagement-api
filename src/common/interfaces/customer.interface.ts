import { IBaseUser } from "./baseUser.interface";

export interface ICustomer extends IBaseUser {
 
  address?: string;
  _doc: ICustomer;
}
