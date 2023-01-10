import { NextFunction, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose';
import { userRepository } from '../reposetories';
import { IRequest, ITransaction, IUser } from '../interfaces';
import { CustomError } from '../errors';
import { errorsConfig } from '../configs';
import { userValidator } from '../validators';
import { usersTokenHelper } from '../helpers/usersTokenHelper';
import { coinsService } from '../services';

const userMiddleware = {
    isUserExist: (
        fieldName: string,
        findIn = 'body',
        dbField = fieldName
    ) => async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const dataToSearch = req[findIn as keyof typeof req][fieldName];
            const user = await userRepository.getByParams(dbField, dataToSearch);
            if (!user) {
                throw new CustomError(
                    errorsConfig.notFound.statusCode,
                    errorsConfig.notFound.message
                );
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    aggregateUser: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const { _id: id } = req.user as IUser;
            const user = await userRepository.getUserWithTransactions(id);
            if (!user && user.length === 0) {
                throw new Error('User not found');
            }
            req.user = user[0] as IUser;
            next();
        } catch (e) {
            next(e);
        }
    },
    createUsersCoins: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const transactions = req.user?.transactions as ITransaction[];
            if (transactions) {
                const calc = 0;
                const coinsMarkets = await coinsService.getCoinMarketsByTransactions(transactions as ITransaction[]);
                req.user!.tokens = usersTokenHelper.calculateTokenInfo(coinsMarkets.data, transactions);
                req.user!.currentVale = req.user!.tokens.reduce((
                    accumulator,
                    currentValue
                ) => accumulator + currentValue.currentValue, calc);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isNewUserValid: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const user = req.body;
            const validate = userValidator.newUserValidator.validate(user);
            if (validate.error) {
                throw new Error('Body not valid');
            }
            req.body = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserIdValid: (req:IRequest, res:Response, next:NextFunction):void => {
        try {
            const { id } = req.params;
            const isValid = isObjectIdOrHexString(id);
            if (!isValid) {
                throw new Error('User id not valid');
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};

export { userMiddleware };
