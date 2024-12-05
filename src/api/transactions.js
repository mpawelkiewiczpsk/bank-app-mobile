import axiosInstance from './axiosInstance';

export const getTransactions = (accountNumber, role = 'sender') => {
  if (role !== 'sender' && role !== 'receiver') role = 'sender';
  return axiosInstance
    .get(`transactions?${role}AccountNumber=${accountNumber}`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
