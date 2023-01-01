import { ITransaction, IUsersToken } from '../interfaces';

export const usersTokenHelper = {
    calculateTokenInfo: (
        token: IUsersToken,
        transaction: ITransaction
    ):{count:number, spendMoney:number, avgPrice:number} => {
        const count = token.count + transaction.count;
        const spendMoney = token.spendMoney + (transaction.price * transaction.count);
        const avgPrice = spendMoney / count;
        return {
            count,
            spendMoney,
            avgPrice
        };
    },
    // Доробити image і name
    createTokenFromTransaction: (transaction: ITransaction):Partial<IUsersToken> => {
        return {
            _user_id: transaction._user_id,
            tokenSymbol: transaction.tokenSymbol,
            count: transaction.count,
            spendMoney: transaction.count * transaction.price,
            avgPrice: transaction.price,
            image: 'dlkfjds',
            name: 'slfkjslf'
        };
    }
};
