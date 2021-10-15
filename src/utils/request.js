/**
 * @file request.js
 * @description axios请求封装
 */
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { getStorage } from '@/utils/storage';
import { store } from '../store';
import { logoutAction } from '../store/actions';

/**
 * @description 错误弹窗功能函数
 * @param {String} message 提示文字
 */
const showError = message => Toast.showWithGravity(message, Toast.SHORT, Toast.CENTER);

// 创建axios实例
const request = axios.create({
  baseURL: 'http://sit1-crm-admin-server.mshare.cn', // api的base_url
  timeout: 10000, // 请求超时时间
});

// request拦截器
request.interceptors.request.use(
  async config => {
    const token = await getStorage('token');
    if (token) {
      config.headers.Authorization = token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config;
  },
  error => Promise.reject(error)
);

// respone拦截器
request.interceptors.response.use(
  response => {
    // code为非100是抛错
    const res = response.data;
    if (res.code === 100) {
      return response.data;
    }

    showError(res.msg);
    // 401 未登陆 10301 未登陆 10302 登陆过期
    if ([401, 10301, 10302].includes(res.code)) {
      store.dispatch(logoutAction());
    }
    return Promise.reject(res);
  },
  error => {
    showError(error.message.includes('timeout') ? '网络超时，请稍后重试' : error.message);

    return Promise.reject(error);
  }
);

export default request;
