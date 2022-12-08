import request from '../utils/request';
import qs from 'qs';

/**
 * 获取学科作业列表
 * @param {Object} data
 * @param {String} data.sid 学科id
 * @param {String} data.page 页码
 * @param {String} data.limit 每页条数
 * @param {String} data.token 用户token
 * @returns {Promise}
 * @returns {Array[Object]} data 作业列表
 * @returns {String} data.[].id 作业id
 * @returns {String} data.[].taskName 作业名称
 * @returns {Number} data.[].taskId 作业id
 * @returns {String} data.[].startTime 作业任务开始时间 格式：2018-01-01 00:00:00
 * @returns {String} data.[].finishTime 作业任务截止时间* 格式：2018-01-01 00:00:00
 * @returns {String} data.[].answerTime 作业任务应答时间（不是提交时间） 格式：2018-01-01 00:00:00
 * @returns {Number} data.[]submitCode 作业提交状态码 0未提交｜1已提交未批改｜2已提交已批改
 * @returns {String} data.[]submitState 作业提交状态 "未提交"｜"待批改"｜"已批改：老师姓名"
 */
export function getTasks(data) {
  return request({
    method: 'post',
    url: '/intl/api/student/getTasks',
    data: qs.stringify(data),
  });
}

/**
 * 获取作业详情
 * @param {Object} data
 * @param {String} data.taskId 作业id
 * @param {String} data.token 用户token
 * @returns {Promise}
 * @returns {Object} data
 * @returns {Object} data.task 作业详情
 * @returns {String} data.task.taskId 作业id
 * @returns {String} data.task.taskName 作业名称
 * @returns {String} data.task.createTime 作业任务创建时间 格式：2018-01-01 00:00:00
 * @returns {String} data.task.submitTime 作业任务开始时间（同 getTasks() 返回的 data.startTime） 格式：2018-01-01 00:00:00
 * @returns {String} data.task.finishTime 作业任务截止时间（事实截止时间） 格式：2018-01-01 00:00:00
 * @returns {String} data.task.answerTime 作业任务应答时间（不是提交时间） 格式：2018-01-01 00:00:00
 * @returns {String} data.task.subName 学科名称
 * @returns {Number} data.task.sid 学科id
 * @returns {Number} data.task.userid 作业创建者id
 * @returns {Number} data.task.schoolId 学校id
 * @returns {Number} data.task.allScore 作业总分
 * @returns {Number} data.task.isdel 作业是否删除 0未删除｜1已删除
 * @returns {String} data.task.taskType 作业类型 已知有 "日常作业"
 * @returns {Number} data.task.mode （暂未知）
 * @returns {String} data.task.allTeaType （暂未知）
 * @returns {Array[Object]} data.data 作业题目列表
 * @returns {String} data.data.[].teaId 作业题目id
 * @returns {String} data.data.[].teaTitle 作业题目
 * @returns {String} data.data.[].teaCode 作业题号
 * @returns {String} data.data.[].teaDifficulty 作业题目难度
 * @returns {String} data.data.[].teaScore 作业题目分数
 * @returns {String} data.data.[].voicePath 作业题目音频地址（英语听力会有）
 * @returns {Number} data.data.[].teaType 作业题目类型 "客观题"｜"主观题"
 * @returns {String} data.data.[].teaQueType 作业题目类型 "单选题"｜"多选题"｜"主观题"
 * @returns {Array[String]} data.data.[].teaOption 作业题目选项 客观题返回选项，主观题返回空数组
 * @returns {String} data.data.[].hasSubjectiveItem 作业是否有主观题 0无主观题｜1有主观题
 * @returns {String} data.data.[].taskId 作业id
 * @returns {Array} data.data.[].children （暂未知，可能是二级题目？）
 */
export function getTaskInfo(data) {
  return request({
    method: 'post',
    url: '/intl/api/student/getTaskInfo',
    data: qs.stringify(data),
  });
}

/**
 * 获取已提交作业详情
 * @param {Object} data
 * @param {String} data.taskId 作业id
 * @param {String} data.token 用户token
 * @returns {Promise}
 * @returns {Object[Array]} data
 * @returns {String} data.[]taskId 作业id
 * @todo 该 api 未完成。展示已提交作业详情的页面先不写了，临时直接弹窗“作业已提交”替补。有空再写。2022-11-30 18:12:00
 */
export function getTaskInfoSubmitted(data) {
  return request({
    method: 'post',
    url: '/intl/api/student/getTaskInfoSubmitted',
    data: qs.stringify(data),
  });
}
