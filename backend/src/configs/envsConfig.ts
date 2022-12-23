import { config } from 'dotenv';

config();

export const envConfig = {
    PORT: process.env.PORT,
    MONGO_SERVER: process.env.MONGO_SERVER
};
