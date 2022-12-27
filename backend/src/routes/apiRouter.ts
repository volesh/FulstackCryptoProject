import express from 'express';
import { userRouter, transactionRouter } from './index';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/transactions', transactionRouter);

export { apiRouter };
