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
