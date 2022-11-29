import { defineStore } from 'pinia';

import router from '@/router';

import { postLogin } from '@/api/auth';

const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
  }),

  // 持久化
  persist: true,

  getters: {
    // user: (state) => state.user,
  },

  actions: {
    /**
     * 登录逻辑
     * @param {object} loginData 用于请求 api 的数据
     * @param {string} redirect 登录后重定向地址（可选）
     */
    async login(loginData, redirect) {
      const res = await postLogin(loginData);
      const { data, state } = res.data;
      if (state == 'ok') {
        this.user = data;
        localStorage.setItem('token', data.token); // 将 token 独立存储
        !redirect ? router.push('/') : router.push(redirect);
      }
    },

    logout() {
      this.user = {};
      window.$message.success('您已退出登录');
      localStorage.removeItem('token'); // 移除独立存储的 token
      location.reload();
    },
  },
});

export default useUserStore;
