import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../model/category.model';

export class CategoryService {

  async createCategory(details: CreateCategoryDto) {

    const existingCategory = await Category.findOne({ name: details.name });
    if (existingCategory) {
      throw new Error('Category with this name already exists');
    }
    return await Category.create(details);
  }

  
  async getCategories() {
    return await Category.find();
  }

  async getCategoryById(id: string) {
    return await Category.findById(id);
  }
}
