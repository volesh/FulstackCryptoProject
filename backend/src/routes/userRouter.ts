import express from 'express';
import { userController } from '../controllers';
import { userMiddleware } from '../middlevares';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMiddleware.isNewUserValid, userController.createUser);

userRouter.get(
    '/:id',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExist('id', 'params', '_id'),
    userController.getUserByParams
);

export {
    userRouter
};
