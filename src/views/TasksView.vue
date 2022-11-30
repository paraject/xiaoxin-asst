<template>
  <div class="min-h-full">
    <!-- 标题栏 -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">今天</h1>
      </div>
    </div>
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
                    <span class="flex flex-col text-gray-500 text-sm truncate">
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
                            <span class="text-gray-500">{{ task.taskId }}</span>
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
                      <span class="font-medium">{{ overdueTasks.length }}</span>
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
                    <span class="flex flex-col text-gray-500 text-sm truncate">
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
                            <span class="text-gray-500">{{ task.taskId }}</span>
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
import NavBar from '@/components/NavBar.vue';
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

const overdueTasks = todayStore.today.overdue || [];
const todoTasks = todayStore.today.todo || [];
const doneTasks = todayStore.today.done || [];

const statusStyles = {
  已提交: 'bg-green-100 text-green-800',
  未提交: 'bg-yellow-100 text-yellow-800',
  已批改: 'bg-gray-100 text-gray-800',
};

const doLogout = () => {
  userStore.logout();
};
</script>
