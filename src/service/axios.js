/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import iView from 'iview';
import store from '../main'

// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://test2.jianfly.com/';
}

// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.withCredentials = true;


//请求数量默认为0
let reqNum = 0;
// 请求拦截器
axios.interceptors.request.use(config => {
    iView.LoadingBar.start();
    reqNum ++;
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config
}, (error) => {
    return Promise.reject(error)
});

// 响应拦截器
axios.interceptors.response.use(res => {
    reqNum -- ;
    if (reqNum <= 0) {
        iView.LoadingBar.finish();
    } else {
        iView.LoadingBar.start();
    }
    const apiRes = res.data;
    return apiRes;
}, async error => {
    console.log(error);
    return Promise.reject(error);
});


export default axios;
