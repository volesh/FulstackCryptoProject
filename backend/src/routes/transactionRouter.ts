import express from 'express';
import { transactionController } from '../controllers';

const transactionRouter = express.Router();

transactionRouter.post('/:id', transactionController.createTransaction);

export { transactionRouter };
