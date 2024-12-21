import axiosInstance from './axiosInstance';

const onLogin = ({ login, password }) =>
  axiosInstance
    .get(`users?login=${login}&password=${password}`)
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });

export default onLogin;
