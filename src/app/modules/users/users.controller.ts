import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './users.service';

const getUsers = catchAsync(async (req: Request, res: Response) => {
    const posts = await UserService.getUsers({ ...req.body });

    sendResponse(res, {
        success: true,
        message: 'All users fetched successfully',
        statusCode: httpStatus.OK,
        data: posts,
    });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    sendResponse(res, {
        success: true,
        message: 'User retrieved successfully',
        statusCode: httpStatus.OK,
        data: user,
    });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.createUser(req.body);
    sendResponse(res, {
        success: true,
        message: 'User created successfully',
        statusCode: httpStatus.CREATED,
        data: user,
    });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser = await UserService.updateUser(id, req.body);
    sendResponse(res, {
        success: true,
        message: 'User updated successfully',
        statusCode: httpStatus.OK,
        data: updatedUser,
    });
});

export const UserController = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
};
