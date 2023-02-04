import axios, { AxiosResponse } from 'axios';
import { baseURL } from '../configs';

export type AxiosRes<T> = Promise<AxiosResponse<T>>

export const axiosService = axios.create({ baseURL });
