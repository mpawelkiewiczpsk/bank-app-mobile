import { getTransactions } from './transactions';

const getHistory = async (accountNumber, limit) => {
  try {
    let sent = await getTransactions(accountNumber, 'sender');
    let received = await getTransactions(accountNumber, 'receiver');

    sent = sent.map((t) => ({ ...t, direction: 'out' }));
    received = received.map((t) => ({ ...t, direction: 'in' }));

    return (
      [...sent, ...received]
        // remove duplicates
        .reduce((acc, obj) => {
          if (!acc.find((e) => e.id === obj.id)) {
            acc.push(obj);
          }
          return acc;
        }, [])
        // sort by timestamp descending
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit)
    );
  } catch (err) {
    return err;
  }
};

export default getHistory;
