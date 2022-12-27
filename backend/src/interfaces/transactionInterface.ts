import { Schema } from 'mongoose';

export interface ITransaction {
    _id: Schema.Types.ObjectId
    _user_id: Schema.Types.ObjectId
    tokenSymbol: string
    date: Date
    count: number
    price: number
}
