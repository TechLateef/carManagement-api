import { Request, Response, NextFunction, RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import rateLimit from "express-rate-limit";
import { BaseUser } from "../../features/user/model/user.model";
import { IBaseUser } from "../interfaces/baseUser.interface";



export interface RequestWithUser extends Request {
  user?: IBaseUser;
}

const authenticationMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.id) return next();

    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader?.startsWith("Bearer ")) { 
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Not Authorized" });
      return;
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET!;
      const decoded: any = jwt.verify(token, JWT_SECRET);

      const user = await BaseUser.findById(decoded.id);

      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      req.user = user;
      req.user!.password = "";
      next();
    } catch (jwtError) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid or malformed token", error: jwtError });
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Not Authorized", error: error });
  }
};

export const RateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 5 requests per windowMs
  message:
    "Too many requests from this IP, please try again after an 15 minutes",
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.userType || '';

    // console.log("User Role:", req.user);
    if (allowedRoles.includes(userRole)) {
      return next()
    }
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden: You do not have permission to access this resource." });
  }
}
export { authenticationMiddleware, authorize };
