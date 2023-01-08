import express from 'express';
import { userController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlevares';

const userRouter = express.Router();

userRouter.post('/', userMiddleware.isNewUserValid, userController.createUser);

userRouter.get(
    '/:id',
    userMiddleware.isUserIdValid,
    authMiddleware.isAccessTokenValid,
    userMiddleware.isUserExist('id', 'params', '_id'),
    userMiddleware.aggregateUser,
    userMiddleware.calculateCurrentValue,
    userController.getUserByParams
);
userRouter.post(
    '/:id/changePass',
    userMiddleware.isUserIdValid,
    authMiddleware.isAccessTokenValid,
    userMiddleware.isUserExist('id', 'params', '_id'),
    userController.changePass
);

export {
    userRouter
};
