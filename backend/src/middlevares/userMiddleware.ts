import { NextFunction, Response } from 'express';
import { userRepository } from '../reposetories';
import { IRequest } from '../interfaces';
import { CustomError } from '../errors';
import { errorsConfig } from '../configs';

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
    }
};

export { userMiddleware };
