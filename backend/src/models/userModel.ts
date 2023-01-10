import {
    Schema, Document, Model, model
} from 'mongoose';
import { IUser } from '../interfaces';
import { regexpEnum } from '../constants';

export type UserType = IUser & Document

const userSchema: Schema = new Schema<IUser>(
    {
        name: { type: String, require: true },
        age: { type: Number, required: true },
        email: {
            type: String,
            regex: regexpEnum.EMAIL,
            lowercase: true,
            trim: true,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            regex: regexpEnum.PHONE,
            unique: true,
            required: true
        },
        password: {
            type: String,
            regex: regexpEnum.PASSWORD,
            required: true,
            trim: true
        },
        fixedIncome: { type: Number, default: 0 },
        invested: Number
    },
    { timestamps: true }
);

const UserDb: Model<UserType> = model<UserType>('User', userSchema);

export { UserDb };
