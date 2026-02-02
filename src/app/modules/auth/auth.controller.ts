import { Request, Response } from 'express';
import AuthService from './auth.service';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { user, accessToken, refreshToken } = await AuthService.login(
                req.body,
            );
            res.json({ user, accessToken, refreshToken });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;
            console.log(req.body, 'refresh aysnc');
            if (!refreshToken) {
                return res
                    .status(401)
                    .json({ message: 'No refresh token provided' });
            }
            const newAccessToken = await AuthService.refresh(refreshToken);
            res.json({ accessToken: newAccessToken });
        } catch (error: any) {
            res.status(403).json({ message: error.message });
        }
    }
}

export const authController = new AuthController();
