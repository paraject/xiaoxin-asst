import { defineStore } from 'pinia';
import useTasksStore from './tasks';
import moment from 'moment';

import useSubjectsStore from './subjects';

const useTodayStore = defineStore('today', {
  state: () => ({
    today: {},
  }),

  // 持久化
  persist: true,

  actions: {
    // 计算合成今日任务
    async doGetTodayTasks() {
      const tasksStore = useTasksStore();
      // 声明数据源
      let allTasks = [];
      // 声明最终列表
      let todayTasks = {};
      todayTasks['overdue'] = [];
      todayTasks['todo'] = [];
      todayTasks['done'] = [];
      // 从作业任务列表生成数据源
      const subjectsStore = useSubjectsStore();
      // @todo 好多地方都用到了这个 subjectNames，可以考虑放到 store 里
      const subjectNames = subjectsStore.subjects.map((i) => i.subname);
      subjectNames.map((subName) =>
        allTasks.push(...tasksStore.tasks[subName])
      );
      // 筛选截止日期为今天及今天之前且未提交的作业
      const today = moment().format('YYYY-MM-DD 23:59:59');
      const overdueTasks = allTasks.filter(
        (i) => moment(i.finishTime).isBefore(today) && i.submitCode == 0
      );
      // 筛选截止日期为今天且未提交的作业
      const todoTasks = allTasks.filter(
        (i) => moment(i.finishTime).isSame(today, 'day') && i.submitCode == 0
      );
      // 筛选截止日期为今天且已提交的作业
      const doneTasks = allTasks.filter(
        (i) => moment(i.finishTime).isSame(today, 'day') && i.submitCode == 1
      );
      // 按照截止日期由近到远排序
      overdueTasks.sort((a, b) =>
        moment(a.finishTime).isBefore(b.finishTime) ? -1 : 1
      );
      todoTasks.sort((a, b) =>
        moment(a.finishTime).isBefore(b.finishTime) ? -1 : 1
      );
      doneTasks.sort((a, b) =>
        moment(a.finishTime).isBefore(b.finishTime) ? -1 : 1
      );
      // 合并
      todayTasks['overdue'] = overdueTasks;
      todayTasks['todo'] = todoTasks;
      todayTasks['done'] = doneTasks;
      // 赋值
      this.today = todayTasks;
    },
  },
});

export default useTodayStore;
