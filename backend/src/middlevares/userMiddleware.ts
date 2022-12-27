import { NextFunction, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose';
import { userRepository } from '../reposetories';
import { IRequest } from '../interfaces';
import { CustomError } from '../errors';
import { errorsConfig } from '../configs';
import { userValidator } from '../validators';

const userMiddleware = {
    isUserExist: (fieldName: string, findIn = 'body', dbField = fieldName) => async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
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
