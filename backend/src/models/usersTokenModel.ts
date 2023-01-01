import {
    Schema, Document, Model, model
} from 'mongoose';
import { IUsersToken } from '../interfaces';

export type TokenType = IUsersToken & Document

const tokenSchema: Schema = new Schema<IUsersToken>(
    {
        _user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        tokenSymbol: { type: String, unique: true, required: true },
        count: { type: Number, required: true },
        spendMoney: { type: Number, required: true },
        image: String,
        avgPrice: { type: Number, required: true }
    },
    { timestamps: true }
);

const UsersTokenDb: Model<TokenType> = model<TokenType>('Token', tokenSchema);

export { UsersTokenDb };
