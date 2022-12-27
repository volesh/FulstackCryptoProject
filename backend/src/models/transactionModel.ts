import {
    Schema, Document, Model, model
} from 'mongoose';
import { ITransaction } from '../interfaces';

export type TransactionType = ITransaction & Document

const transactionSchema: Schema = new Schema<ITransaction>(
    {
        _user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        tokenSymbol: { type: String, unique: true, required: true },
        date: { type: Date, required: true },
        count: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

const TransactionDb: Model<TransactionType> = model<TransactionType>('Transaction', transactionSchema);

export { TransactionDb };
