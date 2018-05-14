import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: 'https://www.foobar.com/foo/bar/',
});

export default axiosAuth;
