import express from 'express';
import { authController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlevares';

const authRouter = express.Router();

authRouter.post(
    '/login',
    authMiddleware.isLoginValid,
    userMiddleware.isUserExist('email'),
    authController.login
);

export {
    authRouter
};
