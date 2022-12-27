import { NextFunction, Response } from 'express';
import { IRequest, IUsersToken } from '../interfaces';
import { tokenRepository, transactionRepository } from '../reposetories';
import { tokenHelper } from '../helpers/tokenHelper';

export const transactionController = {
    createTransaction: async (req:IRequest, res:Response, next: NextFunction):Promise<void> => {
        try {
            const transactionInfo = req.body;
            const transaction = await transactionRepository.createTransaction(transactionInfo);
            const token = await tokenRepository.getTokenBySymbol(transaction.tokenSymbol);
            let usersToken:IUsersToken|null = {} as IUsersToken|null;
            if (token) {
                const {
                    count,
                    avgPrice,
                    spendMoney
                } = tokenHelper.calculateTokenInfo(token, transaction);
                usersToken = await tokenRepository.updateTokenById(
                    token._id,
                    { count, spendMoney, avgPrice }
                );
            } else {
                const newTokenInfo = tokenHelper.createTokenFromTransaction(transaction);
                usersToken = await tokenRepository.createToken(newTokenInfo);
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
