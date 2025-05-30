"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        /**
         * @description Create a new category
         * @access protected
         * @param req express Request object
         * @param res express Response object
         * @param next express NextFunction for error handling
         */
        this.createCategory = async (req, res, next) => {
            try {
                const category = await this.categoryService.createCategory(req.body);
                res.status(http_status_codes_1.StatusCodes.CREATED).json(category);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * @description Get a category by ID
         * @access protected
         * @param req express Request object
         * @param res express Response object
         * @param next express NextFunction for error handling
         * @returns
         */
        this.getCategoryById = async (req, res, next) => {
            try {
                const category = await this.categoryService.getCategoryById(req.params.id);
                if (!category) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Category not found" });
                    return;
                }
                res.json(category);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CategoryController = CategoryController;
