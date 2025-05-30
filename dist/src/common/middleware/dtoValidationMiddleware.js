"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoValidationMiddleware = dtoValidationMiddleware;
const transformAndValidate_1 = require("../utils/transformAndValidate");
function dtoValidationMiddleware(dtoClass) {
    return async (req, res, next) => {
        try {
            req.body = await (0, transformAndValidate_1.transformAndValidate)(dtoClass, req.body);
            next();
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    };
}
