import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CategoriesService } from './categories.service';

const getCategories = catchAsync(async (req: Request, res: Response) => {
    const posts = await CategoriesService.getCategories();

    sendResponse(res, {
        success: true,
        message: 'All users fetched successfully',
        statusCode: httpStatus.OK,
        data: posts,
    });
});
const createCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await CategoriesService.createCategory(req.body);
    sendResponse(res, {
        success: true,
        message: 'Category created successfully',
        statusCode: httpStatus.CREATED,
        data: category,
    });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCategory = await CategoriesService.updateCategory(
        id,
        req.body
    );
    sendResponse(res, {
        success: true,
        message: 'Category updated successfully',
        statusCode: httpStatus.OK,
        data: updatedCategory,
    });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCategory = await CategoriesService.deleteCategory(id);
    sendResponse(res, {
        success: true,
        message: 'Category deleted successfully',
        statusCode: httpStatus.OK,
        data: deletedCategory,
    });
});

export const CategoryController = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
