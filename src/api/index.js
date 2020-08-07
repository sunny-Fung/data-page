import axios from 'axios';
const ins = axios.create({
  baseURL: 'http://192.168.1.159:8080/',
  withCredentials: true
});

const api = {
  getInfo: params => {
    return ins.get('/x/space/arc/search', { params });
  }
};

ins.interceptors.request.use(
  req => {
    if (req.method.toLowerCase() === 'get') {
      req.params = req.params || {};
      req.params['t'] = Date.now();
    }
    return req;
  },
  err => {
    return Promise.reject(err);
  }
);
ins.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.code === 'ECONNABORTED') {
      console.log('请求超时');
    }
    return Promise.reject(error);
  }
);
export default api;
