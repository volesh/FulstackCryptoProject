import { ICoinMarket, IUsersToken } from '../interfaces';
import { axiosRequest, axiosResponse } from './axiosService';

export const coinsService = {
    getCoinMarketsByCoinsList: async (coinsList: IUsersToken[]):
        Promise<axiosResponse<ICoinMarket[]>> => {
        const coinsIds:string[] = [];
        coinsList.forEach((coin) => {
            coinsIds.push(coin.tokenSymbol);
        });
        const requestString = coinsIds.join('%2C%20');
        return axiosRequest.getCoinsPrices(requestString);
    }
};
