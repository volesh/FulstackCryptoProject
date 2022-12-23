import { Request } from 'express';
import { IUser } from './userInterfaces';

interface IRequest extends Request {
    user?:IUser | null | undefined
}

export { IRequest };
