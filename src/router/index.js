import { createRouter, createWebHistory } from 'vue-router';

import TodayView from '@/views/TodayView.vue';
import TasksView from '@/views/TasksView.vue';
import TaskSubmit from '@/views/TaskSubmit.vue';
import LoginIdentifierView from '@/views/login/IdentifierView.vue';
import LoginChallengeView from '@/views/login/ChallengeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录页面
    {
      path: '/login',
      redirect: '/login/identifier',
      children: [
        {
          path: 'identifier',
          name: 'login-identifier',
          component: LoginIdentifierView,
          meta: { isLoginView: true, keepAlive: false },
        },
        {
          path: 'challenge',
          name: 'login-challenge',
          component: LoginChallengeView,
          meta: { isLoginView: true, keepAlive: false },
        },
      ],
    },

    // 主页
    {
      path: '/',
      redirect: '/today',
    },
    {
      path: '/today',
      name: 'today',
      component: TodayView,
      meta: { requiresAuth: true, keepAlive: true },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: { requiresAuth: true, keepAlive: true },
    },
    {
      path: '/tasks/submit/:taskId',
      name: 'task-submit',
      component: TaskSubmit,
      meta: { requiresAuth: true, keepAlive: true },
    },
    // 404 Not Found
    {
      hide: true,
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
    },
  ],
});

router.beforeEach(async (to) => {
  // 加载条开始
  window.$loadingBar.start();
  // 未登录时守卫路由
  const isLogin = !localStorage.user
    ? false
    : !JSON.parse(localStorage.user).user.token
    ? false
    : true;
  // 开发环境跳过登录
  if (!import.meta.env.DEV) {
    if (to.meta.requiresAuth && !isLogin) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      };
    }

    // 已登录时不允许进入登录页
    if (to.meta.isLoginView && isLogin) {
      return {
        path: '/',
      };
    }
  }
});

router.afterEach(() => {
  // 加载条结束
  window.$loadingBar.finish();
});

export default router;
