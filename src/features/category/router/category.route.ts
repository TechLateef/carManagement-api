import { Router } from "express";
import { CategoryController } from "../controller/category.controller";
import { CategoryService } from "../service/category.service";


const categoryRoute = Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

/**
 * @description Create a new category
 * @access protected
 * @route POST /api/v1/categories
 */
categoryRoute.post("/", categoryController.createCategory);
/**
 * @description Get a category by ID
 * @access protected
 * @route GET /api/v1/categories/:id
 */
categoryRoute.get("/:id", categoryController.getCategoryById);


export default categoryRoute;