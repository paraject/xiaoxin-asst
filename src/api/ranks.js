import request from '@/utils/request';
import qs from 'qs';

/**
 * 获取作业年级排名
 * @param {Object} data
 * @param {String} data.taskId 作业id
 * @param {String} data.page 页码
 * @param {String} data.limit 每页条数
 * @param {String} data.token 用户token
 * @returns {Promise}
 * @returns {Array[object]} data
 * @returns {String} data.[].realName 学生姓名
 * @returns {Number} data.[].userId 学生id
 * @returns {String} data.[].submitTime 作业提交时间（这个是事实提交时间） 格式：2018-01-01 00:00:00
 * @returns {String} data.[].className 班级名称
 * @returns {Number} data.[].allScore 作业总得分
 * @returns {String} data.[].correctRealName 批改老师姓名（如果还没批改或没提交会返回 "未批改"）
 * @returns {Number} data.[].isCorrect 是否批改 0未批改｜1已批改
 */
export function getTaskRank(data) {
  return request({
    method: 'post',
    url: '/intl/api/student/getGradeRanks',
    data: qs.Stringify(data),
  });
}
