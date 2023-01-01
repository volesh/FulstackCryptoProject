import {
    Document, model, Model, Schema
} from 'mongoose';
import { IAccess } from '../interfaces';

export type AuthType = IAccess & Document

const authSchema: Schema = new Schema<IAccess>(
    {
        _user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
    },
    { timestamps: true }
);

const AuthDb: Model<AuthType> = model<AuthType>('Auth', authSchema);
export { AuthDb };
