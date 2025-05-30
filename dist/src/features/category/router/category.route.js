"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controller/category.controller");
const category_service_1 = require("../service/category.service");
const categoryRoute = (0, express_1.Router)();
const categoryService = new category_service_1.CategoryService();
const categoryController = new category_controller_1.CategoryController(categoryService);
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
exports.default = categoryRoute;
