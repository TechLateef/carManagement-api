import { StatusCodes } from "http-status-codes";
import { CategoryService } from "../service/category.service";
import { Request, Response, NextFunction } from "express";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    /**
     * @description Create a new category
     * @access protected
     * @param req express Request object 
     * @param res express Response object
     * @param next express NextFunction for error handling
     */
    createCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const category = await this.categoryService.createCategory(req.body);
            res.status(StatusCodes.CREATED).json(category);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Get a category by ID
     * @access protected
     * @param req express Request object
     * @param res express Response object
     * @param next express NextFunction for error handling
     * @returns 
     */
    getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const category = await this.categoryService.getCategoryById(req.params.id);
            if (!category) {
                res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" });
                return;
            }
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
}
