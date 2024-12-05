import axiosInstance from './axiosInstance';

export const getHistory = () =>
  axiosInstance
    .get('transactions?_sort=-id&_page=1&_per_page=3')
    .then(function ({ data }) {
      return data?.data;
    })
    .catch(function (error) {
      console.log(error);
    });
