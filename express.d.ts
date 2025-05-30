// express.d.ts
import {IBaseUser} from "./src/common/interfaces/baseUser.interface";

declare global {
    namespace Express {
        export interface Request {
            user?: IBaseUser; 
        }
    }
}

// To make this file a module
export {};