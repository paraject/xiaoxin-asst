import axios from 'axios';
import router from '@/router';

const service = axios.create({
  // baseURL: "/api",
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true,
});

// 请求拦截器
service.interceptors.request.use(
  function (config) {
    // 请求带 token
    if (localStorage.getItem('token')) {
      config.params = {
        token: localStorage.getItem('token'),
        ...config.params,
      };
    }
    return config;
  },
  function (error) {
    console.log(error);
    window.$message.error('请求时发生错误');
    return Promise.reject(error);
  }
);

let cont = 0; // 防止因同时请求多个 API 错误而导致多次展示报错

// 响应拦截器
service.interceptors.response.use(
  function (response) {
    // 处理 http 200 响应
    // 根据业务状态码处理响应，内外业务状态码字段不同
    if (response.status == 200) {
      // 内部业务状态码字段为 state
      if ('state' in response.data) {
        const bizCode = response.data.state;
        switch (bizCode) {
          case 'ok':
            break;
          case 'over': // 登录态过期，返回详细信息
            if (cont == 0) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              router.push('/login');
              window.$message.info(response.data.msg);
            }
            cont++;
            break;
          case 'fail': // 操作失败，返回错误信息
            window.$message.error(response.data.msg);
            break;
          default:
            window.$message.error(`${response.data.msg}`);
        }
      }
      // 外部业务状态码字段为 code
      else if ('code' in response.data) {
        const bizCode = response.data.code;
        switch (bizCode) {
          case '0':
            break;
          default:
            window.$message.error(`${response.data.msg}`);
            console.log(response);
        }
      }
      return response;
    }
    //   const bussineCode = response.data.state;
    //   if (response.data.state == "over") {
    //     if (cont == 0) {
    //       window.$message.info("您的账号在其它设备登录");
    //       localStorage.removeItem("token");
    //       if (router.history.current.path != "/login") {
    //         router.push("/login");
    //       }
    //     }
    //     cont++;
    //   }
    //   return response;
    // } else if (response.status !== 200) {
    //   router.push("/login");
    //   return response;
    // } else if (response.status == 201) {
    //   return response;
    // }
    // return response;
  },
  function (error) {
    const responseCode = error.response.status;
    switch (responseCode) {
      case 400:
        window.$message.error('请求错误(400)');
        break;
      case 401:
        if (cont == 0) {
          window.$message.error('登录过期，请重新登录');
        }
        cont++;
        localStorage.removeItem('token');
        router.push('/');
        break;
      case 403:
        window.$message.error('拒绝访问(403)');
        break;
      case 404:
        router.push('/404');
        window.$message.error('请求出错(404)');
        break;
      case 408:
        window.$message.error('请求超时(408)');
        break;
      case 500:
        window.$message.error('服务器错误(500)');
        break;
      case 501:
        window.$message.error('服务未实现(501)');
        break;
      case 502:
        window.$message.error('网络错误(502)');
        break;
      case 503:
        window.$message.error('服务不可用(503)');
        break;
      case 504:
        window.$message.error('网络超时(504)');
        break;
      case 505:
        window.$message.error('HTTP版本不受支持(505)');
        break;
      default:
        window.$message.error(`暂未定义的错误(${error.response.status})`);
    }
    return Promise.reject(error);
  }
);

// 封装 GET POST 请求方法
export default service;
