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

export const CategoryController = {
    getCategories,
};
