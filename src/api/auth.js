import request from '../utils/request';
import qs from 'qs';

/**
 * 登录
 * @param {Object} data
 * @param {String} data.userName 用户名（手机号或唯一号）
 * @param {String} data.userPass 密码
 * @param {String} data.platform 平台标识，常量 "pc"
 * @param {String} data.deviceNo 设备标识，常量 "Pc_hello"
 */
export function postLogin(data) {
  return request({
    method: 'post',
    url: '/intl/api/login',
    data: qs.stringify(data),
  });
}
