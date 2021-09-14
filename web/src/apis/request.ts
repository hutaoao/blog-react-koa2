import axios from 'axios';
import {message} from 'antd';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/';


// 请求拦截器
axios.interceptors.request.use((config: any) => {
    const token = sessionStorage.getItem("jwtToken");
    config.headers = {
      'token': token,
      'Content-Type': 'application/json;charset=UTF-8',
    }
    return {...config};
  }, (error: any) => {
    message.error('请求出错了，请稍后重试');
    return Promise.reject(error);
  }
);


// 响应拦截器
axios.interceptors.response.use((res: any) => {
    const {data} = res;
    return data;
  }, (error: any) => {
    message.error('请求出错了，请稍后重试');
    return Promise.reject(error);
  }
)

export default axios;
