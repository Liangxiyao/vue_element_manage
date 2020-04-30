import axios from "axios"
import { Loading, Message } from 'element-ui';
import storage from '@/utils/storage';
import router from '../router';

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'


let baseUrl = process.env.VUE_APP_BASEURL

let requestCount = 0    //请求数量
//显示loading
export function ShowLoading() {
  if (requestCount === 0) {
    Loading.service({ background: "rgba(0,0,0,0.2)" })
  }
  requestCount++
}

//隐藏loading
export function HideLoading() {
  if (requestCount <= 0) return
  requestCount--

  if (requestCount === 0) {
    Loading.service().close()
  }
}

//请求拦截器
axios.interceptors.request.use(
  req => {
    //此处判断token是否存在
    let users = storage.get("users");
    if (users && users.token) {
      req.headers.Authorization = users.token;
    }
    if (req.showLoading) {
      ShowLoading()
    }
    return req
  },
  err => {
    return Promise.reject(err)
  }
);
//响应拦截器
axios.interceptors.response.use(
  res => {
    if (res.config.showLoading) {
      HideLoading()
    }
    if (res.data.code === 200) {
      return res
    } else if (res.data.code === 401) {
      Message({
        message: '账户过期，请重新登录',
        type: 'error',
        duration: 2000
      })
      // 清除token
      storage.clear();
      // 跳转登陆页
      router.replace({
        path: 'login',
        query: { redirect: router.currentRoute.fullPath }
      })
    } else if (res.data.code === 403) {
      Message({
        message: '权限不足,请联系管理员',
        type: 'error',
        duration: 2000
      })
      // // 清除token
      // storage.clear();
      // // 跳转登陆页
      // router.replace({
      //   path: 'login',
      //   query: { redirect: router.currentRoute.fullPath }
      // })
    } else {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 2000
      })
    }

  },
  err => {
    //console.log(err.response.status)
    Loading.service().close();
    if (err.response.status == 504 || err.response.status == 404) {
      Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
    } else if (err.response.status == 403) {
      Message.error({ message: '权限不足,请联系管理员!' });
    } else {
      Message.error({ message: '未知错误' });
    }
    return Promise.reject(err);
  }

)

/*
**  每次调用ShowLoading方法 requestCount + 1。
**  调用HideLoading方法，requestCount - 1。
**  requestCount为 0 时，结束 loading。
*/

//封装post请求，若请求不需要loading，则将showLoading设为false
// axios.defaults.headers.post['responseType'] = 'blob'
export function post(url, params = {}, loading = { showLoading: true }) {
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + url, params, loading)
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
  })
}
//封装get请求，若请求不需要loading，则将showLoading设为false
export function get(url, params = {}, loading = { showLoading: true }) {
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + url, {
      params: params
    }, loading)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

