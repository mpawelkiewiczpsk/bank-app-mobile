import axiosInstance from './axiosInstance';

const onLogin = ({ login, password }) =>
  axiosInstance
    .get(`users?login=${login}&password=${password}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

export default onLogin;
