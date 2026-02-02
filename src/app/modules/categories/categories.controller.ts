import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { categoriesService } from './categories.service';

class CategoryController {
    GetAllCategory = catchAsync(async (req: Request, res: Response) => {
        const rawSearch = req.query.search as string | undefined;
        const search = rawSearch?.trim() ?? undefined;

        const categories = await categoriesService.GetAllCategory(
            search as string | undefined,
        );

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

    GetCatStats = catchAsync(async (req: Request, res: Response) => {
        const count = await categoriesService.GetCatStats();
        sendResponse(res, {
            success: true,
            message: 'User retrieved successfully',
            statusCode: httpStatus.OK,
            data: {
                totalCategories: count,
            },
        });
    });

    CreateCategory = catchAsync(async (req: Request, res: Response) => {
        const { categoryName } = req.body;
        const count = await categoriesService.CreateCategory({
            name: categoryName,
        });
        sendResponse(res, {
            success: true,
            message: 'User retrieved successfully',
            statusCode: httpStatus.OK,
            data: {
                totalCategories: count,
            },
        });
    });

    public UpdateCategory = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = { name: req?.body?.categoryName };

        const updatedCategory = await categoriesService.UpdateCategory(
            id,
            payload,
        );
        if (!updatedCategory) {
            return sendResponse(res, {
                success: false,
                message: 'Category not found',
                statusCode: httpStatus.NOT_FOUND,
                data: null,
            });
        }
        sendResponse(res, {
            success: true,
            message: 'Category updated successfully',
            statusCode: httpStatus.OK,
            data: updatedCategory,
        });
    });

    public DeleteCategory = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletedCategory = await categoriesService.DeleteCategory(id);
        if (!deletedCategory) {
            return sendResponse(res, {
                success: false,
                message: 'Category not found',
                statusCode: httpStatus.NOT_FOUND,
                data: null,
            });
        }
        sendResponse(res, {
            success: true,
            message: 'Category deleted successfully',
            statusCode: httpStatus.OK,
            data: deletedCategory,
        });
    });
}

export const categoryController = new CategoryController();
