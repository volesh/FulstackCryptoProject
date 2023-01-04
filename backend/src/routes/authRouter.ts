import express from 'express';
import { authController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlevares';

const authRouter = express.Router();

authRouter.post(
    '/login',
    userMiddleware.isUserExist('email'),
    authMiddleware.isLoginValid,
    authController.login
);
authRouter.post(
    '/refresh',
    authMiddleware.isRefreshValid,
    authController.refresh
);

export {
    authRouter
};
