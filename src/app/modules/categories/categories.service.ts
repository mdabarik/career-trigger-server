import { Types } from 'mongoose';
import { ICategoryServiceReader, ICategoryDTO } from './categories.interface';
import Category from './categories.model';

class CategoriesService implements ICategoryServiceReader {
    async GetAllCategory(): Promise<ICategoryDTO[]> {
        const categories = await Category.find().sort().lean<ICategoryDTO[]>();
        return categories;
    }

    async GetCategoryById(id: string): Promise<ICategoryDTO | null> {
        const objectId = new Types.ObjectId(id);
        const category = await Category.findById(
            objectId,
        ).lean<ICategoryDTO | null>();
        return category;
    }
}

export const categoriesService = new CategoriesService();
