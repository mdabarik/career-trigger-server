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

    async GetCatStats() {
        const count = await Category.countDocuments();
        console.log(count, 'GetCatStats');
        return count;
    }

    async CreateCategory(category: any) {
        const res = await Category.create(category);
        return res;
    }

    async UpdateCategory(id: string, payload: any) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid category id');
        }
        const category = await Category.findById(id);
        if (!category) {
            return null;
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        return updatedCategory;
    }

    async DeleteCategory(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid category id');
        }
        const category = await Category.findById(id);
        if (!category) {
            return null;
        }
        const deletedCategory = await Category.findByIdAndDelete(id);
        return deletedCategory;
    }
}

export const categoriesService = new CategoriesService();
