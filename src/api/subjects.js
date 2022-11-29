import request from '../utils/request';
import qs from 'qs';

/**
 * 获取学生学科
 * @param {Object} data
 * @param {String} data.token 用户token
 * @returns {Promise}
 * @returns {Array[Object]} data
 * @returns {String} data.[].subname 学科名称
 * @returns {Number} data.[].id 学科id
 */
export function getSubjects(data) {
  return request({
    method: 'post',
    url: '/intl/api/student/getSubjects',
    data: qs.stringify(data),
  });
}
