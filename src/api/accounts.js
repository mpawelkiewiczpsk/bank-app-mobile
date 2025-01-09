import axiosInstance from './axiosInstance';

export const getAccounts = (userId) =>
  axiosInstance
    .get(`accounts?userId=${userId}`)
    .then(({ data }) => {

      console.log(data);

      return data
    })
    .catch((error) => {
      console.error(error);
    });

export const checkIfAccountExist = (accountNumber) =>
  axiosInstance
    .get(`accounts?accountNumber=${accountNumber}`)
    .then(({ data }) => data?.length > 0)
    .catch(() => null);

export const updateBalance = (id, balance) =>
  axiosInstance
    .patch(`accounts/${id}`, { balance })
    .then(() => true)
    .catch(() => null);
