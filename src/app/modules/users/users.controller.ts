import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import usersService from './users.service';

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    sendResponse(res, {
        success: true,
        message: 'User retrieved successfully',
        statusCode: httpStatus.OK,
        data: user,
    });
});

const countUsers = catchAsync(async (req: Request, res: Response) => {
    const count = await usersService.countUsers();
    sendResponse(res, {
        success: true,
        message: 'User retrieved successfully',
        statusCode: httpStatus.OK,
        data: {
            totalUsers: count,
        },
    });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
    // console.log('createUser', req.body);
    const user = await usersService.createUser(req.body);
    sendResponse(res, {
        success: true,
        message: 'User created successfully',
        statusCode: httpStatus.CREATED,
        data: user,
    });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser = await usersService.updateUser(id, req.body);
    sendResponse(res, {
        success: true,
        message: 'User updated successfully',
        statusCode: httpStatus.OK,
        data: updatedUser,
    });
});

export const UserController = {
    countUsers,
};
