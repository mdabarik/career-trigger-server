import { IUserDTO, IUserPayload } from '../users/users.interface';

export interface IUserLoginPDO {
    email: string;
    password: string;
}

export interface IAuthService {
    register(payload: IUserPayload): Promise<IUserDTO>;
    login(credentials: IUserLoginPDO): Promise<{
        user: IUserLoginPDO;
        accessToken: string;
        refreshToken: string;
    }>;
}
