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

    async UpdateUserRole(id: string, payload: any) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid user id');
        }
        const user = await User.findById(id);

        if (!user) {
            return null;
        }

        console.log(payload, 'payload update user role');

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
        return users.map((user) => ({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            role: user.role,
            provider: user.provider,
        }));
    }
}

export default new UserService();
