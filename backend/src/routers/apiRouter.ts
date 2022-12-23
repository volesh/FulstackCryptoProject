import express from 'express';
import { userRouter } from './index';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);

export { apiRouter };
