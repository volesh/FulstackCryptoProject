import express, { Response, Request } from 'express';
import { envConfig } from './configs';

const app = express();

app.get('/users', async (req:Request, res:Response) => {
    res.json('akak');
});

app.listen(envConfig.PORT, () => {
    console.log('Working, port listen :', envConfig.PORT);
});
