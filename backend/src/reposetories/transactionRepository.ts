import { ITransaction } from '../interfaces';
import { TransactionDb } from '../models';

export const transactionRepository = {
    createTransaction: async (body:ITransaction):Promise<ITransaction> => {
        return TransactionDb.create(body);
    }
};
