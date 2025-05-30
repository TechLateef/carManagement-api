"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAndValidate = transformAndValidate;
exports.transformResponse = transformResponse;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
/**
 * Utility to transform and validate a DTO.
 * @param dtoClass The class to transform the plain object into.
 * @param plainObject The plain object to validate.
 * @returns The transformed and validated DTO.
 * @throws Error if validation fails.
 */
async function transformAndValidate(dtoClass, plainObject) {
    const dto = (0, class_transformer_1.plainToClass)(dtoClass, plainObject);
    const errors = await (0, class_validator_1.validate)(dto);
    if (errors.length > 0) {
        const constraints = errors.flatMap((error) => Object.values(error.constraints || {}));
        throw new Error(`Validation failed: ${constraints.join(", ")}`);
    }
    return dto;
}
/**
 *
 * @param dtoClass The class to transform/serialize the plain object to
 * @param plainObject the main entity response
 * @returns the transform response
 */
async function transformResponse(dtoClass, plainObject) {
    // Convert _id to string before transformation
    if (plainObject._id) {
        plainObject._id = plainObject._id.toString();
    }
    const responseData = (0, class_transformer_1.plainToInstance)(dtoClass, plainObject, {
        excludeExtraneousValues: true,
    });
    return responseData;
}
