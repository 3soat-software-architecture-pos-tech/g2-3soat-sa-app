import axios from 'axios';

const axiosClient = (baseURL, headers) => axios.create({
  baseURL: baseURL,
  headers: headers
});

export default axiosClient;
