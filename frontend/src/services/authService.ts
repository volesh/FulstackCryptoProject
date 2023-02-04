import { FieldValues } from 'react-hook-form';
import { AxiosRes, axiosService } from './axiosService';
import { authUrls } from '../configs';
import { IUser } from '../interfaces';

const authService = {
    login: (data:FieldValues):AxiosRes<{
        user: IUser,
        tokens: {accessToken: string, refreshToken:string}
    }> => axiosService.post(authUrls.login, data),
};
export { authService };
