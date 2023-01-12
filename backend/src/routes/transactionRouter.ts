import express from 'express';
import { transactionController } from '../controllers';
import { transactionMiddleware, userMiddleware } from '../middlevares';

const transactionRouter = express.Router();

transactionRouter.post(
    '/:id',
    userMiddleware.isUserIdValid,
    transactionMiddleware.isTransactionValid,
    transactionController.createTransaction
);

export { transactionRouter };
