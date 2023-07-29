import { redirect } from 'react-router-dom';
import httpService from './http-service';
const isAuth = () => {
  httpService
    .getJSON('api/auth/isauth')
    .then((response) => {
      if (response.status === 403) {
        redirect('http://localhost:3000/login');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default isAuth;
