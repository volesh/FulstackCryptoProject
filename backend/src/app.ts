import 'reflect-metadata';
import express, {
    urlencoded, Request, Response, NextFunction
} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { envConfig } from './configs';
import { apiRouter } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(apiRouter);

// eslint-disable-next-line no-unused-vars
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    res.status(err.status || 500).json({
        errorMessage: err.message || 'Unknown error',
        statusCode: err.status || 500
    });
});

app.listen(envConfig.PORT, async ():Promise<void> => {
    await mongoose.connect(envConfig.MONGO_SERVER as string);
    console.log('Working, port listen :', envConfig.PORT);
});
