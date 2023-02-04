import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces';
import { transactionValidator } from '../validators';

export const transactionMiddleware = {
    isTransactionValid: async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const transaction = req.body;
            const validate = transactionValidator.neTransactionValidator.validate(transaction);
            if (validate.error) {
                throw new Error('Transaction not valid');
            }
            req.body = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
