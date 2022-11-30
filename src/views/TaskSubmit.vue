<template>
  <div v-if="isViewShow">
    <!-- 标题栏 -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-4 px-4 flex items-start sm:px-6 lg:px-8">
        <a
          @click="router.go(-1)"
          class="ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900"
        >
          <ChevronLeftIcon
            class="h-5 w-5 text-blue-gray-400"
            aria-hidden="true"
          />
          <p class="text-base">作业提交</p>
        </a>
      </div>
    </div>

    <!-- 主体 -->
    <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div
          class="md:flex md:items-center md:justify-between md:space-x-4 border-b pb-6"
        >
          <div>
            <h1 class="text-2xl pb-1 font-bold text-gray-900">{{
              taskInfoStore.taskInfo.task.taskName
            }}</h1>
            <p class="mt-2 text-sm text-gray-500"
              >#{{ taskInfoStore.taskInfo.task.taskId }} 截止于 {{ ' '
              }}<span href="#" class="font-medium text-gray-900">{{
                taskInfoStore.taskInfo.task.finishTime
              }}</span></p
            >
          </div>
          <div class="mt-4 flex space-x-3 md:mt-0">
            <span
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
            >
              <svg
                class="-ml-1 mr-1.5 h-2 w-2 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 8 8"
              >
                <circle cx="4" cy="4" r="3" />
              </svg>
              未提交
            </span>
          </div>
        </div>
        <div class="pt-6">
          <h2 class="text-lg leading-6 font-medium text-gray-900 pb-2"
            >客观题</h2
          >
          <!-- @todo: 展示客观题列表还没做完，考完试继续。2022-11-30 18:52 -->
          <ul
            role="list"
            class="grid grid-cols-6 gap-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            <li
              v-for="(objItem, teaId) in taskInfoStore.taskInfo.data"
              :key="teaId"
              class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div class="w-full items-center p-3">
                <div class="text-center text-lg font-medium text-gray-900"
                  >A
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onActivated, onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
// icons
import { ChevronLeftIcon } from '@heroicons/vue/solid';
// store
import useTaskInfoStore from '@/stores/taskInfo';
// components
import InfoAlert from '@/components/InfoAlert.vue';

const route = useRoute();
const router = useRouter();
const taskInfoStore = useTaskInfoStore();
const isViewShow = ref(false);

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
];

onActivated(() => {
  isViewShow.value = false;
  taskInfoStore.set(route.params.taskId).then(() => {
    isViewShow.value = true;
  });
});
</script>
