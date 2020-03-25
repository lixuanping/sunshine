import axios from 'axios'
import qs from 'qs'
import { Notify } from 'vant';
import loading from '../src/lib/loading.js';
let vm = loading();

// 响应时间
axios.defaults.timeout = 5 * 60 * 1000;
axios.defaults.withCredentials = true;
// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokens

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    vm.handlemount();
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config
  },
  err => {
    Notify({ type: 'warning', message: '消息错误' , duration: 1000 , background: '#ff4745'});
    return Promise.reject(err)
  }
)

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    if (res.data.ret == 0) {
      if (res.data.err) Notify({ type: 'success', message: res.data.err });
    } else {
      Notify({ type: 'warning', message: res.data.err , duration: 1000 , background: '#ff4745'});
    }
    vm.handleDestory();
    return res;
  },
  err => {
    vm.handleDestory();
    Notify({ type: 'warning', message: '请求失败，请稍后再试' , duration: 1000 , background: '#ff4745'});
    return Promise.reject(err)
  }
)

// 统一管理接口
// const host = process.env.API_HOST

export default {
  login : '../../Handler/LoginHandler.ashx', // 登录接口
  currency : '../../Handler/ASMAppHandler.ashx', // 通用接口
}