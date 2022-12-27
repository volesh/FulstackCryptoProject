import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../reposetories';
import { IRequest } from '../interfaces';
import { passwordHelper } from '../helpers';

export const userController = {
    getAllUsers: async (req:Request, res:Response, next:NextFunction):Promise<void> => {
        try {
            const users = await userRepository.getAll();
            if (!users) {
                throw new Error('User not found');
            }
            res.json(users);
        } catch (e) {
            next();
        }
    },

    getUserByParams: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req:Request, res:Response, next:NextFunction):Promise<void> => {
        try {
            const hashPass = await passwordHelper.hashPassword(req.body.password);
            const user = await userRepository.createUser({ ...req.body, password: hashPass });
            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};
