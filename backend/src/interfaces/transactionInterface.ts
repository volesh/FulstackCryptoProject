import { Schema } from 'mongoose';

export interface ITransaction {
    _id: Schema.Types.ObjectId
    _user_id: Schema.Types.ObjectId
    tokenId: string
    date: Date
    count: number
    price: number
    status: boolean
}
