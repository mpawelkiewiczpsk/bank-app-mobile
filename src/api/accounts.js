import axiosInstance from './axiosInstance';

export const getAccounts = (userId) =>
  axiosInstance
    .get(`accounts?userId=${userId}`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });

export const checkIfAccountExist = (accountNumber) =>
  axiosInstance
    .get(`accounts?accountNumber=${accountNumber}`)
    .then(function ({ data }) {
      return data?.length > 0;
    })
    .catch(function () {
      return null;
    });

export const updateBalance = (id, balance) =>
  axiosInstance
    .patch(`accounts/${id}`, { balance })
    .then(function () {
      return true;
    })
    .catch(function () {
      return null;
    });
