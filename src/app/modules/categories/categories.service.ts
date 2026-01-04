/* eslint-disable @typescript-eslint/no-explicit-any */

import { Types } from 'mongoose';
import Category from './categories.model';
import Post from '../posts/posts.model';

const getCategories = async () => {
    const categories = await Category.find().sort();
    const totalCategories = await Category.countDocuments();

    return {
        categories: categories,
        recordCount: totalCategories,
    };
};

const createCategory = async (payload: { name: string }) => {
    const category = await Category.create(payload);
    return category;
};

const updateCategory = async (
    id: string,
    payload: Partial<{ name: string }>
) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid category id');
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedCategory;
};

const deleteCategory = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid category id');
    }
    const hasPosts = await Post.exists({ categoryId: id });
    if (hasPosts) {
        throw new Error(
            'Category cannot be deleted because it has associated posts'
        );
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
};

export const CategoriesService = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
