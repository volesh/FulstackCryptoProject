import { Schema } from 'mongoose';
import { UserDb } from '../models';
import { IUser } from '../interfaces';

const userRepository = {
    getByParams: async (dbField:string, fieldToSearch:string):Promise<IUser|null> => {
        return UserDb.findOne({ [dbField]: fieldToSearch });
    },
    getUserWithTransactions: async (userId: Schema.Types.ObjectId):Promise<IUser[]|null|any> => {
        return UserDb.aggregate([
            {
                $match: { _id: userId }
            },
            {
                $lookup: {
                    from: 'transactions',
                    localField: '_id',
                    foreignField: '_user_id',
                    as: 'transactions'
                }
            },
            {
                $project: {
                    password: 0, phone: 0, __v: 0, createdAt: 0, updatedAt: 0
                }
            }
        ]);
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
