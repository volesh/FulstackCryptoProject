import { Schema } from 'mongoose';
import { IUsersToken } from '../interfaces';
import { TokenDb } from '../models';

export const tokenRepository = {
    createToken: async (data: Partial<IUsersToken>):Promise<IUsersToken> => {
        return TokenDb.create(data);
    },
    getTokenBySymbol: async (symbol:string):Promise<IUsersToken|null> => {
        return TokenDb.findOne({ tokenSymbol: symbol });
    },
    updateTokenById: async (
        id: Schema.Types.ObjectId,
        newInfo: Partial<IUsersToken>
    ):Promise<IUsersToken|null> => {
        return TokenDb.findByIdAndUpdate(id, newInfo, { new: true });
    }
};
