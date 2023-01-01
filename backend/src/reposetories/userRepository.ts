import { Schema } from 'mongoose';
import { UserDb } from '../models';
import { IUser } from '../interfaces';

const userRepository = {
    getAll: async ():Promise<IUser[]> => UserDb.find({}),
    getByParams: async (dbField:string, fieldToSearch:string):Promise<IUser|null> => {
        return UserDb.findOne({ [dbField]: fieldToSearch });
    },

    createUser: async (data:IUser):Promise<IUser> => {
        return UserDb.create(data);
    },
    updateUser: async (
        data: Partial<IUser>,
        id:Schema.Types.ObjectId|string
    ):Promise<IUser|null> => {
        return UserDb.findByIdAndUpdate(id, data, { new: true });
    }
};

export { userRepository };
