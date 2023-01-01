import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces';
import { authValidator } from '../validators';
import {authRepository} from "../reposetories";
import {authService} from "../services";
import {envConfig} from "../configs";

export const authMiddleware = {
    isLoginValid: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const isValid = authValidator.loginValidator.validate(req.body);
            if (isValid.error) {
                throw new Error('Invalid email or password');
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isAccessTokenValid: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const accessToken = req.get('Authorization');
            const { id } = req.params;
            if (!accessToken) {
                throw new Error('No token');
            }
            const isToken = await authRepository.getAccessTokenPair(accessToken, id);
            if (!isToken) {
                throw new Error('Wrong Token');
            }
            await authService.isTokenValid(accessToken, envConfig.ACCESS_KEY_WORD);
            req.tokenInfo = isToken;
            next();
        } catch (e) {
            next(e);
        }
    }
};
