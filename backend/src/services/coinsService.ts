import { ICoinMarket, ITransaction } from '../interfaces';
import { axiosRequest, axiosResponse } from './axiosService';

export const coinsService = {
    getCoinMarketsByTransactions: async (transactions: ITransaction[]):
        Promise<axiosResponse<ICoinMarket[]>> => {
        const listOfTokens: string[] = [];
        transactions.forEach((elem) => {
            if (!listOfTokens.includes(elem.tokenId)) {
                listOfTokens.push(elem.tokenId);
            }
        });
        const requestString = listOfTokens.join('%2C%20');
        console.log('get coin markets');
        return axiosRequest.getCoinsPrices(requestString);
    }
};
