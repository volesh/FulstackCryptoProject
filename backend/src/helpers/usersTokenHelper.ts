import { ICoinMarket, ITransaction, IUsersToken } from '../interfaces';

export const usersTokenHelper = {
    calculateTokenInfo: (coinsMarkets: ICoinMarket[], transactions: ITransaction[]):IUsersToken[] => {
        const listOfTokens: string[] = [];
        const coins:IUsersToken[] = [];
        transactions.forEach((elem) => {
            if (!listOfTokens.includes(elem.tokenId)) {
                listOfTokens.push(elem.tokenId);
            }
        });
        listOfTokens.forEach((elem) => {
            const listOfTransactions: ITransaction[]|undefined = transactions.filter((trans) => trans.tokenId === elem);
            const totalInvest = 0;
            const countOfTokens = 0;
            const market = coinsMarkets.find((mark) => mark.id === elem);
            const sumInvested = listOfTransactions?.reduce(
                (accumulator, currentValue) => {
                    if (currentValue.status) {
                        return accumulator + (currentValue.price * currentValue.count);
                    }
                    return accumulator - (currentValue.price * currentValue.count);
                },
                totalInvest
            );
            const totalTokens = listOfTransactions?.reduce(
                (accumulator, currentValue) => {
                    if (currentValue.status) {
                        return accumulator + currentValue.count;
                    }
                    return accumulator - currentValue.count;
                },
                countOfTokens
            );
            const coin = {
                name: market!.name,
                tokenId: market!.id,
                image: market!.image,
                count: totalTokens,
                spendMoney: sumInvested,
                avgPrice: sumInvested / totalTokens,
                currentValue: totalTokens * market!.current_price
            };
            coins.push(coin);
        });
        return coins;
    }
};
