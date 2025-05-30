import { Request, Response, NextFunction } from 'express';
import { transformAndValidate } from '../utils/transformAndValidate';
export function dtoValidationMiddleware<T extends object>(dtoClass: new () => T) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await transformAndValidate(dtoClass, req.body);
            next();
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };
}
