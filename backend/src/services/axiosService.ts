import axios, { AxiosResponse } from 'axios';
import { envConfig } from '../configs';
import { ICoinMarket } from '../interfaces';

const axiosService = axios.create({ baseURL: envConfig.AXIOS_BASE_URL });

export type axiosResponse<T> = Promise<AxiosResponse<T>>

export const axiosRequest = {
    getCoinsPrices: (coins: string):axiosResponse<ICoinMarket[]> => axiosService.get(`&ids=${coins}`)
};
