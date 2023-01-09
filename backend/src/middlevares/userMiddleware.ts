import { NextFunction, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose';
import { userRepository } from '../reposetories';
import { IRequest, IUser, IUsersToken } from '../interfaces';
import { CustomError } from '../errors';
import { errorsConfig } from '../configs';
import { userValidator } from '../validators';
import { coinsService, userService } from '../services';

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
    aggregateUser: async (
        req:IRequest,
        res:Response,
        next:NextFunction
    ):Promise<void> => {
        try {
            const { _id: id } = req.user as IUser;
            const user = await userRepository.getUserWithAggregate(id);
            if (!user) {
                throw new Error('User not found');
            }
            req.user = user[0] as IUser;
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
    },
    calculateCurrentValue: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const user = req.user as IUser;
            const tokens = user.tokens as IUsersToken[];
            if (tokens.length > 0) {
                const coinMarkets = await coinsService.getCoinMarketsByCoinsList(user.tokens as IUsersToken[]);
                const { newList, currentValue } = userService.calculateCurrentValue(
                    user.tokens as IUsersToken[],
                    coinMarkets.data
                );
                const newUser = { ...req.user as IUser, tokens: newList, currentValue };
                req.user = newUser;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};

export { userMiddleware };
