import { Document } from 'mongoose';

export interface IUserDTO {
    _id: string;
    name: string;
    email: string;
    role: string;
    provider: string;
}

export interface IUserReader {
    getUsers(): Promise<{ users: Document[] }>;
    getUserByEmail(email: string): Promise<Document | null>;
    getUserById(id: string): Promise<Document | null>;
}

export interface IUserWriter {
    createUser(payload: IUserPayload): Promise<Document>;
    updateUser(
        id: string,
        payload: Partial<IUserPayload>,
    ): Promise<Document | null>;
}

export interface IUserPayload {
    name: string;
    email: string;
    password: string;
    role: string;
}
