"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_model_1 = require("../model/category.model");
class CategoryService {
    async createCategory(details) {
        const existingCategory = await category_model_1.Category.findOne({ name: details.name });
        if (existingCategory) {
            throw new Error('Category with this name already exists');
        }
        return await category_model_1.Category.create(details);
    }
    async getCategories() {
        return await category_model_1.Category.find();
    }
    async getCategoryById(id) {
        return await category_model_1.Category.findById(id);
    }
}
exports.CategoryService = CategoryService;
