import express from 'express';
// import {userRouter, transactionRouter, authRouter } from './index';
import { userRouter } from './userRouter';
import { transactionRouter } from './transactionRouter';
import { authRouter } from './authRouter';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/transactions', transactionRouter);
apiRouter.use('/auth', authRouter);

export { apiRouter };
