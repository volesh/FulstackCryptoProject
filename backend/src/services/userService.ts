import { ICoinMarket, IUsersToken } from '../interfaces';

export const userService = {

    calculateCurrentValue: (
        listOfUsersCoins: IUsersToken[],
        coinMarkets: ICoinMarket[]
    ):{newList: IUsersToken[], currentValue:number} => {
        let currentValue = 0;
        const newList = listOfUsersCoins.map((coin) => {
            const coinMarket = coinMarkets.find(
                (market) => market.id === coin.tokenSymbol
            ) as ICoinMarket;
            const currentCoinValue = coin.count * coinMarket.current_price;
            currentValue += currentCoinValue;
            const newCoin = { ...coin, currentValue: currentCoinValue };
            return newCoin;
        });
        return { newList, currentValue };
    }
};
