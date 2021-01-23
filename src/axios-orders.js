import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://test-reactjs-burger-default-rtdb.firebaseio.com/',
});

export default AxiosInstance;
