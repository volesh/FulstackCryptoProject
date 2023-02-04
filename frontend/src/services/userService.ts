import { AxiosRes, axiosService } from './axiosService';
import { userUrls } from '../configs';
import { INewUser, IUser } from '../interfaces';

const userService = {
    getUser: (id:string):AxiosRes<IUser> => axiosService.get(`${userUrls.users}/${id}`),

    changePass: (
        id:string,
        data: {newPassword: string, oldPassword: string}
    ):AxiosRes<IUser> => axiosService.patch(`${userUrls.users}/${id}`, data),

    register: (data: Partial<INewUser>):AxiosRes<IUser> => axiosService.post(userUrls.users, data)
};
export { userService };
