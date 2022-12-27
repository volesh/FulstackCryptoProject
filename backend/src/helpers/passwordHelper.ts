import * as bcrypt from 'bcrypt';
import { CustomError } from '../errors';

export const passwordHelper = {
    hashPassword: async (pass: string):Promise<string> => bcrypt.hash(pass, 10),

    comparePasswords: async (pass: string, hashedPass: string):Promise<void> => {
        const isSame = await bcrypt.compare(pass, hashedPass);
        if (!isSame) {
            throw new CustomError(400, 'Wrong email or password');
        }
    }
};
