/**
 * 作业互评获取作业信息
 * @param {Object} data
 * @param {String} data.taskId 作业id
 * @param {String} data.userId 用户id
 * @param {String} data.token 用户token
 * @returns {Promise}
 * @returns {Array[Object]} data
 * @returns {Array[String]} data.[].images 主观题url列表*
 * @returns {Number} data.[].teaScore 题目分值
 * @returns {String} data.[].teaResolve 题目解析
 * @returns {Number} data.[].teaId 题目id
 * @returns {Number} data.[].showAnswer 是否显示答案 0: 不显示｜1: 显示
 * @returns {String} data.[].teaAnswer 题目答案
 * @returns {String} data.[].teaTitle 题目（标题）
 * @returns {Number} data.[].taskId 作业id
 * @returns {Number} data.[].teaCode 题号
 * @returns {String} state 业务状态码 ok成功
 */
export function getMutualTaskInfo(data) {
  return request({
    method: 'post',
    url: '/intl/getMutualTaskInfo',
    data: data,
  });
}
