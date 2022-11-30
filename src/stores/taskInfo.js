import { defineStore } from 'pinia';
import { getTaskInfo } from '@/api/tasks';

const useTaskInfoStore = defineStore('task-info', {
  state: () => ({
    taskInfo: {},
  }),

  actions: {
    async set(taskId) {
      // 请求获取作业详细信息
      const res = await getTaskInfo({ taskId: taskId });
      const { task, data, state } = res.data;
      if (state == 'ok') {
        this.taskInfo = { task, data };
        console.log(this.taskInfo);
      }
    },
  },
});

export default useTaskInfoStore;
