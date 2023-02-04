import { ITransaction } from './transactionInterface';
import { IToken } from './tokenInterface';

export interface IUser {
    _id: string
    name: string
    age?:number
    email: string
    password:string
    repeatPassword?: string
    phone: string
    invested?: number
    fixedIncome: number
    currentVale: number
    transactions: ITransaction[],
    tokens: IToken[],
    createdAt: Date
    updatedAt: Date
}

export interface INewUser {
    name: string
    age?:number
    email: string
    password:string
    phone: string
}
