import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { categoriesService } from './categories.service';

class CategoryController {
    GetAllCategory = catchAsync(async (req: Request, res: Response) => {
        const categories = await categoriesService.GetAllCategory();

        sendResponse(res, {
            success: true,
            message: 'All categories fetched successfully',
            statusCode: httpStatus.OK,
            data: categories,
        });
    });

    GetCategoryById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const category = await categoriesService.GetCategoryById(id);

        sendResponse(res, {
            success: true,
            message: 'Category fetched successfully',
            statusCode: httpStatus.OK,
            data: category,
        });
    });
}

export const categoryController = new CategoryController();
