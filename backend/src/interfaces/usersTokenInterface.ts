import { Schema } from 'mongoose';

export interface IUsersToken {
    _id: Schema.Types.ObjectId
    _user_id: Schema.Types.ObjectId
    name: string
    tokenSymbol: string
    image?: string
    count: number
    spendMoney: number
    avgPrice: number
}
