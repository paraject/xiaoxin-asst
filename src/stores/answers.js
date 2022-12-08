import { defineStore } from 'pinia';
import { getObjectAnswer } from '@/api/answers';
import { useUserStore } from '@/stores/user';

const useAnswersStore = defineStore('answers', {
  state: () => ({
    keys: {},
  }),

  actions: {
    /**
     * 获取客观题答案
     * @param {Number} taskId 作业id
     * @returns {Promise}
     * @returns {Object[String]} object 客观题答案 示例：{ '1': 'C', '2': 'C', '3': 'B' }
     */
    async setObject(taskId) {
      const userStore = useUserStore();
      const res = await getObjectAnswer({
        type: 'query',
        sid: taskId,
        userid: userStore.user.userId,
        username: userStore.user.realName,
        userrole: userStore.user.userRole,
        schoolid: userStore.user.schoolId,
        schoolname: userStore.user.schoolName,
        token: userStore.user.token,
      });
      const { code, answer, time } = res;
      if (code === 0) {
        this.answers.object = Object.fromEntries(
          answer
            .split('\n')
            .map((i) => i.split('. '))
            .map((i) => new Array(i[0], i[1]))
        );
        this.answers.time = time;
      }
    },
  },
});

export default useAnswersStore;
