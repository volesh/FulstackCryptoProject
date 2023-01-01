import { IAccess } from '../interfaces';
import { AuthDb } from '../models';

export const authRepository = {
    createAccessTokenPair: async (data: Partial<IAccess>):Promise<IAccess> => {
        return AuthDb.create(data);
    },
    getAccessTokenPair: async (accessToken: string, id: string):Promise<IAccess|null> => {
        return AuthDb.findOne({ accessToken, _id: id });
    }
};
