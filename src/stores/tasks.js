import { defineStore } from 'pinia';
import { getTasks } from '@/api/tasks';
import useSubjectsStore from './subjects';
import moment from 'moment';

const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {},
  }),

  // 持久化
  persist: true,

  actions: {
    // 获取某学科作业，需要附带学科名称 subName
    async doGetTasks(subName) {
      const subjectsStore = useSubjectsStore();
      const res = await getTasks(
        {
          sid: subjectsStore.subjects.filter((i) => i.subname == subName)[0]
            .sid,
          page: 1,
          limit: 99999,
        },
        subName
      );
      const { data, state } = res.data;
      if (state == 'ok') {
        // 打上学科戳
        const subTasks = data.map(function (item) {
          item.subName = subName;
          return item;
        });
        // 依据时间由近到远排序
        this.tasks[subName] = subTasks.sort((a, b) =>
          moment(a.finishTime).isBefore(b.finishTime) ? -1 : 1
        );
      }
    },

    // promise 遍历请求所有学科作业列表
    async doGetAllTasks() {
      const subjectsStore = useSubjectsStore();
      const subjectNames = subjectsStore.subjects.map((i) => i.subname);
      await Promise.all(
        subjectNames.map((subName) => this.doGetTasks(subName))
      );
      window.$message.success('作业列表已更新');
    },

    async doGetTodyTasks() {
      const res = await getSubjects();
      const { data, state } = res.data;
      if (state == 'ok') {
        this.subjects = data;
      }
    },
  },
});

export default useTasksStore;
