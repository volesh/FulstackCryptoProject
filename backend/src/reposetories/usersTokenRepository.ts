import { Schema } from 'mongoose';
import { IUsersToken } from '../interfaces';
import { UsersTokenDb } from '../models';

export const usersTokenRepository = {
    createToken: async (data: Partial<IUsersToken>):Promise<IUsersToken> => {
        return UsersTokenDb.create(data);
    },
    getTokenBySymbol: async (symbol:string):Promise<IUsersToken|null> => {
        return UsersTokenDb.findOne({ tokenSymbol: symbol });
    },
    updateTokenById: async (
        id: Schema.Types.ObjectId,
        newInfo: Partial<IUsersToken>
    ):Promise<IUsersToken|null> => {
        return UsersTokenDb.findByIdAndUpdate(id, newInfo, { new: true });
    }
};
