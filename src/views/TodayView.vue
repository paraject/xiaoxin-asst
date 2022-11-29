<template>
  <div v-if="isViewShow" class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <RouterLink to="/"
                ><img class="h-8 w-8" src="/img/logo-icon.png" alt="Logo"
              /></RouterLink>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <RouterLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="[
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</RouterLink
                >
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- 用户菜单 -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton
                    class="max-w-xs bg-gray-800 text-gray-400 hover:text-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span class="sr-only">打开用户菜单</span>
                    <UserIcon class="h-6 w-6" aria-hidden="true" />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="py-1">
                      <MenuItem>
                        <span class="block px-4 pt-2 text-sm text-gray-700">{{
                          user.name
                        }}</span>
                      </MenuItem>
                      <MenuItem>
                        <span class="block px-4 pb-2 text-sm text-gray-500"
                          >UID: {{ user.uid }}</span
                        >
                      </MenuItem>
                    </div>
                    <div class="border-t py-1">
                      <MenuItem
                        v-for="item in userNavigation"
                        :key="item.name"
                        v-slot="{ active }"
                      >
                        <RouterLink
                          :to="item.to"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ]"
                          >{{ item.name }}</RouterLink
                        >
                      </MenuItem>
                    </div>
                    <div class="border-t py-1">
                      <MenuItem v-slot="{ active }">
                        <a
                          @click="doLogout"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ]"
                          >退出登录</a
                        >
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>

          <!-- 移动端导航栏控制按钮 -->
          <div class="-mr-2 flex md:hidden">
            <DisclosureButton
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <!-- /移动端导航栏控制按钮 -->
        </div>
      </div>

      <!-- 移动端导航栏 -->
      <DisclosurePanel class="md:hidden">
        <!-- 第一部分 -->
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <!-- 页面菜单 -->
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
          >
            <DisclosureButton>{{ item.name }}</DisclosureButton>
          </RouterLink>
        </div>
        <!-- 第二部分 -->
        <div class="py-3 border-t border-b-8 border-gray-700">
          <!-- 用户菜单 -->
          <div class="flex justify-between items-center px-5 py-2">
            <!-- 左侧显示用户信息 -->
            <div>
              <div class="text-base font-medium leading-none text-white">{{
                user.name
              }}</div>
              <div class="pt-2.5 text-sm font-normal leading-none text-gray-400"
                >UID: {{ user.uid }}</div
              >
            </div>
            <!-- 右侧功能按钮（移动端用图标按钮做菜单交互） -->
            <div>
              <!-- 设置按钮 -->
              <button
                type="button"
                class="bg-gray-800 flex-shrink-0 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <CogIcon class="h-6 w-6" aria-hidden="true" />
              </button>
              <!-- 退出登录按钮 -->
              <button
                type="button"
                @click="doLogout"
                class="bg-gray-800 ml-4 flex-shrink-0 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <LogoutIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </DisclosurePanel>
      <!-- /移动端导航栏 -->
    </Disclosure>

    <!-- 顶栏 -->
    <header class="bg-white shadow">
      <!-- 标题栏 -->
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">今天</h1>
      </div>
    </header>

    <main>
      <!-- 主体部分 -->
      <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <!-- 警示用户 banner -->
        <div class="max-w-7xl mx-auto pt-2 sm:px-6 lg:px-8">
          <div class="mt-4 px-4 rounded-md bg-blue-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <InformationCircleIcon
                  class="h-5 w-5 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 flex-1 md:flex md:justify-between">
                <p class="text-sm text-blue-700"
                  >本页面显示的今日学科任务可能不符合您所在班级或任课教师的要求，请注意核查。</p
                >
              </div>
            </div>
          </div>
        </div>

        <!-- 已逾期的作业 -->
        <div>
          <h2
            class="max-w-7xl mx-auto mt-6 px-4 text-lg leading-6 font-medium text-red-500 sm:px-6 lg:px-8"
            >已逾期</h2
          >

          <!-- 表格：已逾期的作业（仅 sm 断点） -->
          <div class="shadow sm:hidden">
            <ul
              role="list"
              class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
            >
              <li v-for="task in overdueTasks" :key="task.tsakId">
                <a class="block px-4 py-4 bg-white hover:bg-gray-50">
                  <span class="flex items-center space-x-4">
                    <span class="flex-1 flex space-x-2 truncate">
                      <DocumentTextIcon
                        class="flex-shrink-0 h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                      <span
                        class="flex flex-col text-gray-500 text-sm truncate"
                      >
                        <span class="truncate">{{ task.subName }}</span>
                        <span
                          ><span class="text-gray-900 font-medium">{{
                            task.taskName
                          }}</span>
                          {{ task.taskId }}</span
                        >
                        <time :datetime="task.finishTime">{{
                          task.finishTime
                        }}</time>
                      </span>
                    </span>
                    <ChevronRightIcon
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            </ul>

            <div class="bg-white px-4 py-3 border-t border-gray-200">
              <p class="text-sm text-gray-700">
                已展示全部{{ ' ' }}
                <span class="font-medium">{{ overdueTasks.length }}</span>
                {{ ' ' }}
                个作业
              </p>
            </div>
          </div>

          <!-- 数据少，就不用分页了 -->
          <!-- <nav
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
            aria-label="Pagination"
          >
            <div class="flex-1 flex justify-between">
              <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                上一页
              </a>
              <a
                href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                下一页
              </a>
            </div>
          </nav> -->

          <!-- 表格：已逾期的作业（sm 断点及以上） -->
          <div class="hidden sm:block">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col mt-2">
                <div
                  class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
                >
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >作业名称</th
                        >
                        <th
                          class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >科目</th
                        >
                        <th
                          class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                          >状态</th
                        >
                        <th
                          class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >日期</th
                        >
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr
                        v-for="task in overdueTasks"
                        :key="task.taskId"
                        class="bg-white"
                      >
                        <td
                          class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          <div class="flex">
                            <a
                              :href="task.href"
                              class="group inline-flex space-x-2 truncate text-sm"
                            >
                              <DocumentTextIcon
                                class="flex-shrink-0 h-5 w-5 text-red-500 group-hover:text-red-400"
                                aria-hidden="true"
                              />
                              <p
                                class="text-gray-900 truncate group-hover:text-gray-900"
                              >
                                {{ task.taskName }}
                              </p>
                              <span class="text-gray-500">{{
                                task.taskId
                              }}</span>
                            </a>
                          </div>
                        </td>
                        <td
                          class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500"
                        >
                          <span class="text-gray-500">{{ task.subName }} </span>
                        </td>
                        <td
                          class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block"
                        >
                          <span
                            :class="[
                              statusStyles[task.submitState],
                              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                            ]"
                          >
                            {{ task.submitState }}
                          </span>
                        </td>
                        <td
                          class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500"
                        >
                          <time :datetime="task.finishTime">{{
                            task.finishTime
                          }}</time>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- 分页导航 -->
                  <nav
                    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div>
                      <p class="text-sm text-gray-700">
                        已载入全部{{ ' ' }}
                        <span class="font-medium">{{
                          overdueTasks.length
                        }}</span>
                        {{ ' ' }}
                        个作业任务
                      </p>
                    </div>
                    <!-- 数据少，就不用分页了 -->
                    <!-- <div class="flex-1 flex justify-between sm:justify-end">
                      <a
                        href="#"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        上一页
                      </a>
                      <a
                        href="#"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        下一页
                      </a>
                    </div> -->
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 未完成的作业 -->
        <div>
          <h2
            class="max-w-7xl mx-auto mt-6 px-4 text-lg leading-6 font-medium text-gray-800 sm:px-6 lg:px-8"
            >未完成</h2
          >

          <!-- 表格：未完成的作业（仅 sm 断点） -->
          <div id="#todo" class="shadow sm:hidden">
            <ul
              role="list"
              class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
            >
              <li v-for="task in todoTasks" :key="task.tsakId">
                <a class="block px-4 py-4 bg-white hover:bg-gray-50">
                  <span class="flex items-center space-x-4">
                    <span class="flex-1 flex space-x-2 truncate">
                      <DocumentTextIcon
                        class="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span
                        class="flex flex-col text-gray-500 text-sm truncate"
                      >
                        <span class="truncate">{{ task.subName }}</span>
                        <span
                          ><span class="text-gray-900 font-medium">{{
                            task.taskName
                          }}</span>
                          {{ task.taskId }}</span
                        >
                        <time :datetime="task.finishTime">{{
                          task.finishTime
                        }}</time>
                      </span>
                    </span>
                    <ChevronRightIcon
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            </ul>

            <div class="bg-white px-4 py-3 border-t border-gray-200">
              <p class="text-sm text-gray-700">
                已展示全部{{ ' ' }}
                <span class="font-medium">{{ todoTasks.length }}</span>
                {{ ' ' }}
                个作业
              </p>
            </div>
          </div>

          <!-- 数据少，就不用分页了 -->
          <!-- <nav
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
            aria-label="Pagination"
          >
            <div class="flex-1 flex justify-between">
              <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                上一页
              </a>
              <a
                href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                下一页
              </a>
            </div>
          </nav> -->

          <!-- 表格：未完成的作业（sm 断点及以上） -->
          <div class="hidden sm:block">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col mt-2">
                <div
                  class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
                >
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >作业名称</th
                        >
                        <th
                          class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >科目</th
                        >
                        <th
                          class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                          >状态</th
                        >
                        <th
                          class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >日期</th
                        >
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr
                        v-for="task in todoTasks"
                        :key="task.taskId"
                        class="bg-white"
                      >
                        <td
                          class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          <div class="flex">
                            <a
                              :href="task.href"
                              class="group inline-flex space-x-2 truncate text-sm"
                            >
                              <DocumentTextIcon
                                class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <p
                                class="text-gray-900 truncate group-hover:text-gray-900"
                              >
                                {{ task.taskName }}
                              </p>
                              <span class="text-gray-500">{{
                                task.taskId
                              }}</span>
                            </a>
                          </div>
                        </td>
                        <td
                          class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500"
                        >
                          <span class="text-gray-500">{{ task.subName }} </span>
                        </td>
                        <td
                          class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block"
                        >
                          <span
                            :class="[
                              statusStyles[task.submitState],
                              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                            ]"
                          >
                            {{ task.submitState }}
                          </span>
                        </td>
                        <td
                          class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500"
                        >
                          <time :datetime="task.finishTime">{{
                            task.finishTime
                          }}</time>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- 分页导航 -->
                  <nav
                    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div>
                      <p class="text-sm text-gray-700">
                        已载入全部{{ ' ' }}
                        <span class="font-medium">{{ todoTasks.length }}</span>
                        {{ ' ' }}
                        个作业任务
                      </p>
                    </div>
                    <!-- 数据少，就不用分页了 -->
                    <!-- <div class="flex-1 flex justify-between sm:justify-end">
                      <a
                        href="#"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        上一页
                      </a>
                      <a
                        href="#"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        下一页
                      </a>
                    </div> -->
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /主体部分结束 -->
    </main>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import {
  CogIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  LogoutIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from '@heroicons/vue/outline';

import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

import useUserStore from '@/stores/user';
import useSubjectsStore from '@/stores/subjects';
import useTasksStore from '@/stores/tasks';
import useTodayStore from '@/stores/today';

const userStore = useUserStore();
const subjectsStore = useSubjectsStore();
const tasksStore = useTasksStore();
const todayStore = useTodayStore();

const user = {
  name: userStore.user.realName,
  uid: userStore.user.userName,
};
const navigation = [
  { name: '今天', to: '/today', current: true },
  { name: '作业', to: '/tasks', current: false },
];
const userNavigation = [
  { name: '偏好设置', to: '#' },
  { name: '关于', to: '#' },
];

const overdueTasks = todayStore.today.overdue || [];
const todoTasks = todayStore.today.todo || [];
const doneTasks = todayStore.today.done || [];

const statusStyles = {
  已提交: 'bg-green-100 text-green-800',
  未提交: 'bg-yellow-100 text-yellow-800',
  已批改: 'bg-gray-100 text-gray-800',
};

const isViewShow = ref(false);

const doGetTodayTasks = () => {
  todayStore.doGetTodayTasks();
};

const doGetSubjects = () => {
  subjectsStore.doGetSubjects();
};

const doGetAllTasks = () => {
  tasksStore.doGetAllTasks();
};

const doLogout = () => {
  userStore.logout();
};

// 监听todayStore数据改动，有改动时刷新页面

onMounted(() => {
  doGetTodayTasks();
  doGetSubjects();
  doGetAllTasks();

  // 给数据请求留时间
  setTimeout(() => {
    isViewShow.value = true;
  }, 500);
});
</script>
