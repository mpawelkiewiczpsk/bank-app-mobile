import axiosInstance from './axiosInstance';

const getHistory = () =>
  axiosInstance
    .get('transactions?_sort=-id&_page=1&_per_page=3')
    .then(({ data }) => {
      return data?.data;
    })
    .catch((error) => {
      console.log(error);
    });

export default getHistory;
