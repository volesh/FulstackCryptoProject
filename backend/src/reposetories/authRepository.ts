import { IAccess } from '../interfaces';
import { AuthDb } from '../models';

export const authRepository = {
    createAccessTokenPair: async (data: Partial<IAccess>):Promise<IAccess> => {
        return AuthDb.create(data);
    },
    getAccessTokenPair: async (searchData:any):Promise<IAccess|null> => {
        return AuthDb.findOne(searchData);
    }
};
