import { AxiosRes, axiosService } from './axiosService';
import { cryptoUrls } from '../configs';
import { ITransaction } from '../interfaces';

const transactionService = {
    createTransaction: (data: ITransaction):AxiosRes<ITransaction> => axiosService.post(cryptoUrls.transactions, data)
};
export { transactionService };
