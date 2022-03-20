// 插件模块
import axios from "axios";
const MyHttpServer = {};
MyHttpServer.install = Vue => {
  // 请求的url地址
  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

  // 在请求发起之前，会先来到下面的回调函数
  // 添加请求拦截器
  axios.interceptors.request.use(
    function(config) {
      // 在发送请求之前要做些什么
      if (config.url !== "login") {
        // 需要授权的API，必须在请求头中使用Authorization 字段提供 token令牌
        const AUTH_TOKEN = localStorage.getItem("token");
        // 将token加在请求头中
        config.headers.common["Authorization"] = AUTH_TOKEN;
      }

      return config;
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axios.interceptors.response.use(
    function(response) {
      // 对响应数据做些什么
      return response;
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
  // 在请求发起之前 设置头部

  //  添加实例方法
  Vue.prototype.$http = axios;
};

export default MyHttpServer;
