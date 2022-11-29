import { defineStore } from 'pinia';
import { getSubjects } from '@/api/subjects';

const useSubjectsStore = defineStore('subjects', {
  state: () => ({
    subjects: [],
  }),

  // 持久化
  persist: true,

  getters: {
    // subjects: (state) => state.subjects,
  },

  actions: {
    async doGetSubjects() {
      const res = await getSubjects();
      const { data, state } = res.data;
      if (state == 'ok') {
        this.subjects = data;
      }
    },
  },
});

export default useSubjectsStore;
