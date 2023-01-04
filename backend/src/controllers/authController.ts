import { NextFunction, Response } from 'express';
import { IRequest, IUser } from '../interfaces';
import { authService } from '../services';
import { authRepository } from '../reposetories';

export const authController = {
    login: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const { email } = req.body;
            const { _id } = req.user as IUser;
            const tokens = authService.generateAccessTokenPair({ email });
            const accessTokenPair = await authRepository.createAccessTokenPair(
                {
                    ...tokens,
                    _user_id: _id
                }
            );
            if (!accessTokenPair && !tokens) {
                throw new Error('Something went wrong with creating tokens');
            }
            const response = {
                user: req.user,
                tokens: accessTokenPair
            };
            res.json(response);
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const info = req.tokenInfo;
            const tokens = authService.generateAccessTokenPair({ email: info?._user_id });
            if (!tokens) {
                throw new Error('Something went wrong');
            }
            const newTokenPair = await authRepository.createAccessTokenPair(
                { ...tokens, _user_id: info?._user_id }
            );
            if (!newTokenPair) {
                throw new Error('Something went wrong');
            }
            res.json(newTokenPair);
        } catch (e) {
            next(e);
        }
    }
};
