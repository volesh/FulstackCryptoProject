import express from 'express';
import { userController } from '../controllers';
import { userMiddleware } from '../middlevares';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.createUser);

userRouter.get(
    '/:id',
    userMiddleware.isUserExist('id', 'params', '_id'),
    userController.getUserByParams
);

export {
    userRouter
};
