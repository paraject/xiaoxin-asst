import { defineStore } from 'pinia';
import { getSubjects } from '@/api/subjects';

const useSubjectsStore = defineStore('subjects', {
  state: () => ({
    subjects: [],
  }),

  // 持久化
  persist: true,

  actions: {
    async set() {
      const res = await getSubjects();
      const { data, state } = res.data;
      if (state == 'ok') {
        this.subjects = data;
      }
    },
  },
});

export default useSubjectsStore;
