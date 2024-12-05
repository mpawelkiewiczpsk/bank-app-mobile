import { getTransactions } from './transactions';

export const getHistory = async (accountNumber, limit) => {
  const transactions = await Promise.all([
    getTransactions(accountNumber, 'sender'),
    getTransactions(accountNumber, 'receiver'),
  ]);

  const removeDuplicates = (acc, obj) => {
    if (!acc.find((e) => e.id === obj.id)) {
      acc.push(obj);
    }
    return acc;
  };

  return transactions
    .flat()
    .toSorted((a, b) => Number(a.id) - Number(b.id))
    .reduce(removeDuplicates, [])
    .slice(0, limit);
};
