import { Schema } from 'mongoose';

export interface IUser {
    id: Schema.Types.ObjectId
    name: string
    age:number
    email: string
    password?:string
    phone: string
    invested: number
    createdAt: Date
    updatedAt: Date
}
