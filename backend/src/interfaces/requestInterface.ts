import { Request } from 'express';
import { IUser } from './userInterfaces';
import { IAccess } from './accessTokensInterface';

interface IRequest extends Request {
    user?:IUser | null | undefined
    tokenInfo?: IAccess | null | undefined
}

export { IRequest };
