import User from './users.model';

const getUsers = async () => {
    const users = await User.find();
    return users;
};

export const UserService = {
    getUsers,
};
