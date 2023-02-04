import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces';
import { transactionRepository } from '../reposetories';
import { transactionsHelper } from '../helpers/transactionsHelper';
import { CustomError } from '../errors';

export const transactionController = {
    createTransaction: async (req:IRequest, res:Response, next: NextFunction):Promise<void> => {
        try {
            const transactionInfo = req.body;
            if (!transactionInfo.status) {
                if (!await transactionsHelper.isUserHaveSuchTokens(transactionInfo)) {
                    throw new CustomError(400, 'User don`t have such tokens');
                }
            }
            const transaction = await transactionRepository.createTransaction(
                { ...transactionInfo, _user_id: req.params.id }
            );
            res.json({ transaction });
        } catch (e) {
            next(e);
        }
    }
};
