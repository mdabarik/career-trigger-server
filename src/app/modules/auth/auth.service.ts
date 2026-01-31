import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../users/users.model';
import { IUserPayload } from '../users/users.interface';
import { IUserLoginPDO } from './auth.interface';

class AuthService {
    async register(payload: IUserPayload) {
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const user = await User.create({
            ...payload,
            password: hashedPassword,
        });
        return user;
    }

    async login({ email, password }: IUserLoginPDO) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' },
        );

        const refreshToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: '7d' },
        );

        return { user, accessToken, refreshToken };
    }

    async verifyToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET!);
        } catch {
            throw new Error('Invalid or expired token');
        }
    }
}

export default new AuthService();
