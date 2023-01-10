import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces';
import { transactionRepository } from '../reposetories';

export const transactionController = {
    createTransaction: async (req:IRequest, res:Response, next: NextFunction):Promise<void> => {
        try {
            const transactionInfo = req.body;
            const transaction = await transactionRepository.createTransaction(
                { ...transactionInfo, _user_id: req.params.id }
            );
            res.json({ transaction });
        } catch (e) {
            next(e);
        }
    }
};
