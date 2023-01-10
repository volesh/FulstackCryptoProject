import { ICoinMarket, ITransaction, IUsersToken } from '../interfaces';

export const usersTokenHelper = {
    calculateTokenInfo: (coinsMarkets: ICoinMarket[], transactions: ITransaction[]):{coins:IUsersToken[], fixedMoney:number} => {
        const coins:IUsersToken[] = [];
        let fixedMoney:number = 0;
        transactions.forEach((transaction) => {
            const coin = coins.find((elem) => elem.tokenId === transaction.tokenId);
            const market = coinsMarkets.find((elem) => elem.id === transaction.tokenId);
            if (!coin && transaction.status) {
                const newCoin = {
                    name: market!.name,
                    tokenId: transaction.tokenId,
                    image: market!.image,
                    count: transaction.count,
                    spendMoney: Math.round((transaction.count * transaction.price) * 100) / 100,
                    avgPrice: Math.round(transaction.price * 100) / 100,
                    currentValue: Math.round((transaction.count * market!.current_price) * 100) / 100
                };
                coins.push(newCoin);
            } else if (coin && transaction.status) {
                coin.count += transaction.count;
                coin.spendMoney += Math.round((transaction.count * transaction.price) * 100) / 100;
                coin.avgPrice = Math.round((coin.spendMoney / coin.count) * 100) / 100;
                coin.currentValue = Math.round((coin.count * market!.current_price) * 100) / 100;
            } else if (coin && !transaction.status) {
                const saleIncome = transaction.count * transaction.price;
                const byPrice = coin.avgPrice * transaction.count;
                const netProfit = saleIncome - byPrice;
                const returnedMoney = saleIncome - netProfit;
                fixedMoney += Math.round(netProfit * 100) / 100;
                coin.count -= transaction.count;
                coin.spendMoney -= Math.round(returnedMoney * 100) / 100;
                coin.avgPrice = Math.round((coin.spendMoney / coin.count) * 100) / 100;
                coin.currentValue = Math.round((coin.count * market!.current_price) * 100) / 100;
            }
        });
        return { coins, fixedMoney };
    }
};
