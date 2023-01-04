import { Schema } from 'mongoose';
import { ITransaction } from './transactionInterface';
import { IUsersToken } from './usersTokenInterface';

export interface IUser {
    _id: Schema.Types.ObjectId
    name: string
    age?:number
    email: string
    password:string
    phone: string
    invested: number
    transactions?: ITransaction[],
    tokens?: IUsersToken[],
    createdAt: Date
    updatedAt: Date
}
