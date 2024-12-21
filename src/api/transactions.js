import axiosInstance from './axiosInstance';

export const getTransactions = (accountNumber, role = 'sender') => {
  return axiosInstance
    .get(`transactions?${role}AccountNumber=${accountNumber}&_sort=-timestamp`)
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const addNewTransaction = (data) => {
  return axiosInstance
    .post('transactions', data)
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
};
