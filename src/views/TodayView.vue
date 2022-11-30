<template>
  <div class="min-h-full">
    <!-- 标题栏 -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900"
          >今天
          <span class="text-2xl ml-1 font-extralight text-gray-600"
            >{{new Date().getMonth()+1+' '}}月{{' '+new Date().getDate()+' '}}日</span
          >
        </h1>
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
      <!-- 警示用户 -->
      <InfoAlert class="pt-4 sm:px-6 lg:px-8"
        >本页面显示的今日学科任务可能不符合您所在班级或任课教师的要求，请注意核查。
      </InfoAlert>

      <!-- 已逾期的作业 -->
      <div>
        <h2
          class="max-w-7xl mx-auto mt-6 px-4 text-lg leading-6 font-medium text-red-500 sm:px-6 lg:px-8"
          >已逾期</h2
        >

        <!-- 表格：已逾期的作业（仅 sm 断点） -->
        <div class="shadow sm:hidden" v-if="isViewShow">
          <ul
            role="list"
            class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
          >
            <li v-for="task in todayTasks.overdue" :key="task.tsakId">
              <p
                @click="goTaskWhere(task.taskId, task.submitCode)"
                class="block px-4 py-4 bg-white hover:bg-gray-50"
              >
                <span class="flex items-center space-x-4">
                  <span class="flex-1 flex space-x-2 truncate">
                    <DocumentTextIcon
                      class="flex-shrink-0 h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                    <span class="flex flex-col text-gray-500 text-sm truncate">
                      <span class="truncate">{{ task.submitState }}</span>
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
              </p>
            </li>
          </ul>

          <div class="bg-white px-4 py-3 border-t border-gray-200">
            <p class="text-sm text-gray-700">
              已展示全部{{ ' ' }}
              <span class="font-medium">{{ todayTasks.overdue.length }}</span>
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
        <div class="hidden sm:block" v-if="isViewShow">
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
                      <!-- <th
                        class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >科目</th
                      > -->
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
                      v-for="task in todayTasks.overdue"
                      :key="task.taskId"
                      class="bg-white"
                    >
                      <td
                        class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        <div class="flex">
                          <p
                            @click="goTaskWhere(task.taskId, task.submitCode)"
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
                          </p>
                        </div>
                      </td>
                      <!-- <td
                        class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500"
                      >
                        <span class="text-gray-500">{{ task.subName }} </span>
                      </td> -->
                      <td
                        class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block"
                      >
                        <span
                          :class="[
                            statusStyles[task.submitCode],
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
                        todayTasks.overdue.length
                      }}</span>
                      {{ ' ' }}
                      个作业
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
        <div id="#todo" class="shadow sm:hidden" v-if="isViewShow">
          <ul
            role="list"
            class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
          >
            <li v-for="task in todayTasks.todo" :key="task.tsakId">
              <p
                @click="goTaskWhere(task.taskId, task.submitCode)"
                class="block px-4 py-4 bg-white hover:bg-gray-50"
              >
                <span class="flex items-center space-x-4">
                  <span class="flex-1 flex space-x-2 truncate">
                    <DocumentTextIcon
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="flex flex-col text-gray-500 text-sm truncate">
                      <span class="truncate">{{ task.submitState }}</span>
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
              </p>
            </li>
          </ul>

          <div class="bg-white px-4 py-3 border-t border-gray-200">
            <p class="text-sm text-gray-700">
              已展示全部{{ ' ' }}
              <span class="font-medium">{{ todayTasks.todo.length }}</span>
              {{ ' ' }}
              个作业
            </p>
          </div>
        </div>

        <!-- 表格：未完成的作业（sm 断点及以上） -->
        <div class="hidden sm:block" v-if="isViewShow">
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
                      v-for="task in todayTasks.todo"
                      :key="task.taskId"
                      class="bg-white"
                    >
                      <td
                        class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        <div class="flex">
                          <p
                            @click="goTaskWhere(task.taskId, task.submitCode)"
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
                          </p>
                        </div>
                      </td>
                      <td
                        class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block"
                      >
                        <span
                          :class="[
                            statusStyles[task.submitCode],
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
                        todayTasks.todo.length
                      }}</span>
                      {{ ' ' }}
                      个作业
                    </p>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 已提交的作业 -->
      <div>
        <h2
          class="max-w-7xl mx-auto mt-6 px-4 text-lg leading-6 font-medium text-gray-800 sm:px-6 lg:px-8"
          >已提交</h2
        >

        <!-- 表格：已提交的作业（仅 sm 断点） -->
        <div id="#todo" class="shadow sm:hidden" v-if="isViewShow">
          <ul
            role="list"
            class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
          >
            <li v-for="task in todayTasks.done" :key="task.tsakId">
              <p
                @click="goTaskWhere(task.taskId, task.submitCode)"
                class="block px-4 py-4 bg-white hover:bg-gray-50"
              >
                <span class="flex items-center space-x-4">
                  <span class="flex-1 flex space-x-2 truncate">
                    <DocumentTextIcon
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="flex flex-col text-gray-500 text-sm truncate">
                      <span class="truncate">{{ task.submitState }}</span>
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
              </p>
            </li>
          </ul>

          <div class="bg-white px-4 py-3 border-t border-gray-200">
            <p class="text-sm text-gray-700">
              已展示全部{{ ' ' }}
              <span class="font-medium">{{ todayTasks.done.length }}</span>
              {{ ' ' }}
              个作业
            </p>
          </div>
        </div>

        <!-- 表格：已提交的作业（sm 断点及以上） -->
        <div class="hidden sm:block" v-if="isViewShow">
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
                      v-for="task in todayTasks.done"
                      :key="task.taskId"
                      class="bg-white"
                    >
                      <td
                        class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        <div class="flex">
                          <p
                            @click="goTaskWhere(task.taskId, task.submitCode)"
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
                          </p>
                        </div>
                      </td>
                      <td
                        class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block"
                      >
                        <span
                          :class="[
                            statusStyles[task.submitCode],
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
                        todayTasks.done.length
                      }}</span>
                      {{ ' ' }}
                      个作业
                    </p>
                  </div>
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
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
// components
import InfoAlert from '@/components/InfoAlert.vue';
// icons
import { DocumentTextIcon, ChevronRightIcon } from '@heroicons/vue/outline';
// stores
import useSubjectsStore from '@/stores/subjects';
import useTasksStore from '@/stores/tasks';

import moment from 'moment';
import router from '@/router';

const subjectsStore = useSubjectsStore();
const tasksStore = useTasksStore();

const isViewShow = ref(false);
const todayTasks = ref({ overdue: [], todo: [], done: [] });

const statusStyles = {
  2: 'bg-green-100 text-green-800',
  0: 'bg-yellow-100 text-yellow-800',
  1: 'bg-gray-100 text-gray-800',
};

// 计算今日任务
const doGetAllTasks = async () => {
  // 所有科目 id 放到一个数列用于 promise 请求
  const sids = subjectsStore.subjects.map((i) => i.sid);
  await Promise.all(sids.map((sid) => tasksStore.set(sid))) //设置状态：所有科目作业

    .then(() => {
      // 开始计算
      let allTasks = [];
      // 从数据列表生成数据源
      sids.map((sid) => allTasks.push(...tasksStore.tasks[sid]));
      // 筛选截止日期为今天及今天之前且未提交的作业
      const today = moment().format('YYYY-MM-DD 23:59:59');
      const overdueTasks = allTasks.filter(
        (i) => moment(i.finishTime).isBefore(today) && i.submitCode == 0
      );
      // 筛选截止日期为今天且未提交的作业
      const todoTasks = allTasks.filter(
        (i) => moment(i.finishTime).isSame(today, 'day') && i.submitCode == 0
      );
      // 筛选截止日期为今天且已提交的作业
      const doneTasks = allTasks.filter(
        (i) => moment(i.finishTime).isSame(today, 'day') && i.submitCode == 1
      );
      // 按照截止日期由近到远排序
      overdueTasks.sort((a, b) =>
        moment(a.finishTime).isBefore(b.finishTime) ? -1 : 1
      );
      todoTasks.sort((a, b) =>
        moment(a.finishTime).isBefore(b.finishTime) ? -1 : 1
      );
      doneTasks.sort((a, b) =>
        moment(a.finishTime).isBefore(b.finishTime) ? -1 : 1
      );
      todayTasks.value = {
        overdue: overdueTasks,
        todo: todoTasks,
        done: doneTasks,
      };
      isViewShow.value = true;
    });
};

// 判断跳转到作业详情（已提交）或作业提交（未提交）
const goTaskWhere = (taskId, submitCode) => {
  if (submitCode == 0) {
    router.push('/tasks/submit/' + taskId);
  } else {
    router.push('/tasks/detail/' + taskId);
  }
};

onMounted(() => {
  subjectsStore.set();
  doGetAllTasks();
});
</script>
