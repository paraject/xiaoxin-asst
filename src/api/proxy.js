// 该服务为 vercel serve跨域处理
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (req, res) => {
  let target = '';
  if (req.url.startsWith('/intl/api')) {
    target = 'https://zuoyenew.xinkaoyun.com:30001/holidaywork';
  }
  if (req.url.startsWith('/ext/api')) {
    target =
      'https://service-opugde4o-1301539318.hk.apigw.tencentcs.com/release'; //这里就是在vite中配置的一样
  }
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/intl/api/': '',
      '^/ext/api/': '/',
    },
  })(req, res);
};
