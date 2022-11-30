import { defineStore } from 'pinia';
import { getTasks } from '@/api/tasks';
import moment from 'moment';

const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {},
  }),

  actions: {
    async set(sid) {
      // 请求获取对应学科的作业列表
      const res = await getTasks({
        sid: sid,
        page: 1,
        limit: 99999,
      });
      const { data, state } = res.data;
      if (state == 'ok') {
        // 用不到了，发现实际需求不需要显示科目，注释了。2022-11-30 12:22:00
        // 给每个作业添加学科 id 属性
        // const tasks = data.map(function (i) {
        //   i.sid = sid;
        //   return i;
        // });
        // 依据时间由近到远排序，并赋值到对应的学科
        this.tasks[sid] = data.sort((a, b) =>
          moment(a.finishTime).isBefore(b.finishTime) ? -1 : 1
        );
      }
    },
  },
});

export default useTasksStore;
