import { IBaseUser } from "./baseUser.interface";

export interface IManager extends IBaseUser {
  
    role: 'admin' | 'sales' | 'service';
    _doc?: IManager;
}
