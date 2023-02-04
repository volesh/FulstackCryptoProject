import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../reposetories';
import { IRequest } from '../interfaces';
import { passwordHelper } from '../helpers';
import { userValidator } from '../validators';

export const userController = {
    getUser: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
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
            next(new Error('User with this email alredy exist'));
        }
    },

    changePass: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const { oldPassword, newPassword } = req.body;
            const { id } = req.params;
            await passwordHelper.comparePasswords(oldPassword, req.user?.password as string);
            const isValid = userValidator.newPasswordValidator.validate(req.body);
            if (isValid.error) {
                throw new Error('invalidBody');
            }
            const hashedNewPass = await passwordHelper.hashPassword(newPassword);
            const userWithNewPass = userRepository.updateUser({ password: hashedNewPass }, id);
            res.json(userWithNewPass);
        } catch (e) {
            next(e);
        }
    }
};
