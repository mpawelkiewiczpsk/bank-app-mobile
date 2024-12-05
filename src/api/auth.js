import axiosInstance from './axiosInstance';

export const onLogin = ({ login, password }) =>
  axiosInstance
    .get(`users?login=${login}&password=${password}`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
