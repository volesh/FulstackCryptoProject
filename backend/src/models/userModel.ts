import {
    Schema, Document, Model, model
} from 'mongoose';
import { IUser } from '../interfaces';

export type UserType = IUser & Document

const userSchema: Schema = new Schema<IUser>(
    {
        name: { type: String, require: true },
        age: { type: Number, required: true },
        email: {
            type: String, lowercase: true, trim: true, required: true, unique: true,
        },
        phone: { type: String, required: true },
        password: { type: String, required: true, trim: true },
        invested: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const UserDb: Model<UserType> = model<UserType>('User', userSchema);

export { UserDb };
