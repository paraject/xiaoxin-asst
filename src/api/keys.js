import request from '../utils/request';

/**
 * 获取作业客观题标准答案
 * @param {Object} data
 * @param {String} data.type 操作类型 init: 初始化｜query: 查询｜submit: 提交
 * @param {String} data.sid 作业id
 * @param {String} data.userid  用户id
 * @param {String} data.username 用户姓名
 * @param {String} data.userrole 用户角色
 * @param {String} data.schoolid 学校id
 * @param {String} data.schoolname 学校名称
 * @param {String} data.token 用户token
 * @returns {Promise}
 * @returns {Number} code 0成功
 * @returns {String} answer 作业客观题标准答案 示例："1. C\n2. C\n3. B\n4. A\n5. D\n6. A"
 * @returns {String} time 该答案的发布时间 示例："2022-11-23T12:08:08.836Z"
 */
export function getObjectKey(params) {
  return request({
    method: 'get',
    url: '/ext/api',
    params: params,
  });
}
