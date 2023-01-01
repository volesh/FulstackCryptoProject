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
            res.json(accessTokenPair);
        } catch (e) {
            next(e);
        }
    }
};
