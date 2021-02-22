import axios from 'axios';
import server from './api';
// 拿taken，在请求拦截器中添加
import RootStore from '../mobx';
import navigationHelper from '../utils/navigationHelper';

// server 循环遍历输出不同的请求方法
const instance = axios.create({
  //基础路径
  baseURL: 'http://www.zhouqiao.art:8080',
  // 请求限时
  timeout: 10000,
});
// 包裹循环遍历出的请求方法
let Http = {};

for (let key in server) {
  let api = server[key]; // url method

  Http[key] = async (
    params,
    supplyUrl = '',
    isFormData = false,
    config = {},
  ) => {
    let url = api.url;
    let newParams = {};

    if (params && isFormData) {
      newParams = new FormData();
      for (let i in params) {
        newParams.append(i, params[i]);
      }
    } else {
      newParams = params;
    }
    let response;
    if (
      api.method === 'post' ||
      api.method === 'put' ||
      api.method === 'patch'
    ) {
      try {
        response = await instance[api.method](
          `${api.url}${supplyUrl}`,
          newParams,
          config,
        );
      } catch (e) {
        response = e;
      }
    } else {
      config.params = newParams;
      try {
        response = await instance[api.method](`${api.url}${supplyUrl}`, config);
      } catch (e) {
        response = e;
      }
    }
    return response;
  };
}
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 加入token
    let token = RootStore.userStore.allData.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log(err);
  },
);

// 相应拦截器
instance.interceptors.response.use((res) => {
  // console.log(res);
  // console.log(2323);

  // console.log(2323);
  return res;
});
export default Http;
Http.init = function (helper, name = 'Http') {
  global[name] = helper;
};
