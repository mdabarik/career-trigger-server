import { Types } from 'mongoose';
import User from './users.model';

class UserService {
    async getUsers() {
        const users = await User.find();
        return { users };
    }

    async getUserByEmail(email: string) {
        const user = await User.findOne({ email });
        return user;
    }

    async getUserById(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid user id');
        }
        const user = await User.findById(id);
        return user;
    }

    async createUser(payload: any) {
        const user = await User.create(payload);
        return user;
    }

    async updateUser(id: string, payload: Partial<any>) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid user id');
        }
        const updatedUser = await User.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        return updatedUser;
    }

    async countUsers() {
        const count = await User.countDocuments();
        return count;
    }

    async GetAllUsers() {
        const users = await User.find();
        return users;
    }
}

export default new UserService();
