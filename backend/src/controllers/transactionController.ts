import { NextFunction, Response } from 'express';
import { IRequest, IUsersToken } from '../interfaces';
import { usersTokenRepository, transactionRepository } from '../reposetories';
import { usersTokenHelper } from '../helpers/usersTokenHelper';

export const transactionController = {
    createTransaction: async (req:IRequest, res:Response, next: NextFunction):Promise<void> => {
        try {
            const transactionInfo = req.body;
            const transaction = await transactionRepository.createTransaction(transactionInfo);
            const token = await usersTokenRepository.getTokenBySymbol(transaction.tokenSymbol);
            let usersToken:IUsersToken|null = {} as IUsersToken|null;
            if (token) {
                const {
                    count,
                    avgPrice,
                    spendMoney
                } = usersTokenHelper.calculateTokenInfo(token, transaction);
                usersToken = await usersTokenRepository.updateTokenById(
                    token._id,
                    { count, spendMoney, avgPrice }
                );
            } else {
                const newTokenInfo = usersTokenHelper.createTokenFromTransaction(transaction);
                usersToken = await usersTokenRepository.createToken(newTokenInfo);
            }
            if (!usersToken && !transaction) {
                throw new Error('Something went wrong');
            }
            res.json({
                transaction,
                usersToken
            });
        } catch (e) {
            next(e);
        }
    }
};
