/* eslint-disable @typescript-eslint/no-explicit-any */

import { Types } from 'mongoose';
import User from './users.model';

const getUsers = async (params: any) => {
    let { role, sortById, page = 1, limit = 10 } = params;

    page = Number(page);
    limit = Number(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const filter: any = {};
    if (role) filter.role = role;

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit) || 1;

    if (page > totalPages) {
        page = 1;
    }

    const sortOrder = sortById === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
        .sort({ _id: sortOrder })
        .skip(skip)
        .limit(limit);

    return {
        users: users,
        recordCount: totalUsers,
    };
};

const getuserByEmail = async (email: string) => {
    // console.log('from getuserby email user.service.ts', email);
    const user = await User.findOne({ email });
    return user;
};

const getUserById = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user id');
    }
    const user = await User.findById(id);
    return user;
};

const createUser = async (payload: any) => {
    const user = await User.create(payload);
    return user;
};

const updateUser = async (id: string, payload: Partial<any>) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user id');
    }
    const updatedUser = await User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedUser;
};

export const UserService = {
    getUsers,
    getUserById,
    getuserByEmail,
    createUser,
    updateUser,
};
