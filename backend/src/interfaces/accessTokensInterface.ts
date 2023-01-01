import { Schema } from 'mongoose';

export interface IAccess {
    _id: Schema.Types.ObjectId | string
    _user_id: Schema.Types.ObjectId | string
    accessToken: string
    refreshToken: string
    createdAt: string
    updatedAt: string
}
