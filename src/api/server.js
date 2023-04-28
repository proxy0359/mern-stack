import axios from 'axios';
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: 'mern-back-765o.onrender.com',
});
