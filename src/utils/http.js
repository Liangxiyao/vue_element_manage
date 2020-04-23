import axios from "axios"
import { Loading } from 'element-ui';
import storage from '@/utils/storage';

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

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
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    return Promise.reject(err)
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
    axios.post(url, params, loading)
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
    axios.get(url, {
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

