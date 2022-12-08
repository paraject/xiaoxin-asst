import request from '../utils/request';

/**
 * 提交作业答案
 * @param {Object} data
 * @param {String} data.taskId 作业id
 * @param {String} data.objectiveAnswer 客观题答案 示例："2587,A|2588,B|2589,A"
 * @param {String} data.subjectiveAnswer 主观题答案 一题多图用";"分割图片url，多题用"|"分割题目。示例："2621,https://photo/url/here;https://photo/url/here|2622,https://photo/url/here"
 * @param {String} data.token 用户token
 */
export function submitTask(data) {
  return request({
    method: 'post',
    url: '/intl/submitTask',
    data: data,
  });
}

/**
 * 获取七牛云 token
 * @param {Object} params
 * @param {String} params.token 用户token
 * @returns {Promise}
 * @returns {String} data.token 七牛云 token
 */
export function uploadImage(params) {
  return request({
    method: 'get',
    url: '/intl/getQiNiuToken',
    params: params,
  });
}

/**
 * 上传主观题图片
 * @param {Object} data
 * @param {File} data.file 图片文件
 * @param {String} data.token 七牛云 token
 * @key {String} data.key 图片文件名
 */
 export function uploadImage(data) {
  return request({
    method: 'post',
    url: 'https://upload-z1.qiniup.com',
    data: data,
  });
}