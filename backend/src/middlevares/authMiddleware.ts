import { NextFunction, Response } from 'express';
import { IRequest, IUser } from '../interfaces';
import { authValidator } from '../validators';
import { authRepository } from '../reposetories';
import { authService } from '../services';
import { envConfig } from '../configs';
import { passwordHelper } from '../helpers';

export const authMiddleware = {
    isLoginValid: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const { password } = req.body;
            const user = req.user as IUser;
            const isValid = authValidator.loginValidator.validate(req.body);
            if (isValid.error) {
                throw new Error('Invalid email or password');
            }
            // Compare passwords
            await passwordHelper.comparePasswords(password, user.password);
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
            const isToken = await authRepository.getAccessTokenPair({ accessToken, _user_id: id });
            if (!isToken) {
                throw new Error('Wrong Token');
            }
            await authService.isTokenValid(accessToken, envConfig.ACCESS_KEY_WORD);
            req.tokenInfo = isToken;
            next();
        } catch (e) {
            next(e);
        }
    },
    isRefreshValid: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const refreshToken = req.get('Authorization');
            if (!refreshToken) {
                throw new Error('No token');
            }
            const tokenPair = await authRepository.getAccessTokenPair({ refreshToken });
            if (!tokenPair) {
                throw new Error('Token not valid');
            }
            await authService.isTokenValid(refreshToken, envConfig.REFRESH_KEY_WORD);
            req.tokenInfo = tokenPair;
            next();
        } catch (e) {
            next(e);
        }
    }
};
