/* eslint-disable @typescript-eslint/no-explicit-any */

import Category from './categories.model';

const getCategories = async () => {
    const categories = await Category.find();

    return {
        categories: categories,
        recordCount: 0,
    };
};

export const CategoriesService = {
    getCategories,
};
