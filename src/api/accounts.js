import axiosInstance from './axiosInstance';

export const getAccounts = (userId) =>
  axiosInstance
    .get(`accounts?userId=${userId}`)
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });

export const getAccountByPhoneNumber = (phoneNumber) =>
  axiosInstance
    .get(`accounts?phoneNumber=${phoneNumber}`)
    .then(({ data }) =>
      data.length
        ? data.filter((account) => account.phoneNumber === phoneNumber)
        : null,
    )
    .catch((error) => {
      console.error(error);
    });

export const checkIfAccountExist = (accountNumber) =>
  axiosInstance
    .get(`accounts?accountNumber=${accountNumber}`)
    .then(({ data }) => data?.[0] || false)
    .catch(() => null);

export const updateBalance = (id, balance) =>
  axiosInstance
    .patch(`accounts/${id}`, { balance })
    .then(() => true)
    .catch(() => null);
