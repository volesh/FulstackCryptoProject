import { ITransaction } from '../interfaces';
import { transactionRepository } from '../reposetories';

export const transactionsHelper = {
    isUserHaveSuchTokens: async (transaction: ITransaction): Promise<boolean> => {
        let tokensValue = 0;
        const transactions = await transactionRepository.getTransactionsBySearchParams(
            { tokenId: transaction.tokenId }
        );
        transactions.forEach((elem) => {
            if (+elem.date <= +transaction.date) {
                if (elem.status) {
                    tokensValue += elem.count;
                } else if (!elem.status) {
                    tokensValue -= elem.count;
                }
            }
        });
        console.log(tokensValue);
        console.log(transaction.count);
        if (tokensValue < transaction.count) return false;
        return true;
    }
};
