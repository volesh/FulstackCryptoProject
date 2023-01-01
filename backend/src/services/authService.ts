import * as jwt from 'jsonwebtoken';
import { envConfig } from '../configs';

export const authService = {
    generateAccessTokenPair: (data:any):{accessToken:string, refreshToken:string} => {
        const accessToken = jwt.sign(data, envConfig.ACCESS_KEY_WORD);
        const refreshToken = jwt.sign(data, envConfig.REFRESH_KEY_WORD);
        return {
            accessToken,
            refreshToken
        };
    },
    isTokenValid: async (token: string, secretWord: string):Promise<jwt.VerifyErrors> => {
        try {
            return jwt.verify(token, secretWord) as Promise<jwt.VerifyErrors>;
        } catch (e) {
            throw new Error('Invalid token');
        }
    }
};
