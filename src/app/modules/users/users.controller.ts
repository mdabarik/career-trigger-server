import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './users.service';
import { success } from 'zod';

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

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
    // console.log('getUserByEmail, from users.controller.ts', req.query);
    const { email } = req.query;
    const user = await UserService.getuserByEmail(email as string);
    if (!user) {
        sendResponse(res, {
            success: false,
            message: 'User not found',
            statusCode: httpStatus.NOT_FOUND,
            data: null,
        });
    } else {
        sendResponse(res, {
            success: true,
            message: 'User found',
            statusCode: httpStatus.OK,
            data: user,
        });
    }
});

const createUser = catchAsync(async (req: Request, res: Response) => {
    // console.log('createUser', req.body);
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
    getUserByEmail,
    createUser,
    updateUser,
};
