<template>
  <div>
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
    <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8" v-if="isViewShow">
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
      </div>

      <div class="flex justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-lg leading-6 font-medium text-gray-900">客观题</h2>
        <div class="flex">
          <p class="text-gray-500">答案预测</p>
          <Switch
            v-model="isKeyPredictionOn"
            :class="[
              isKeyPredictionOn ? 'bg-green-500' : 'bg-gray-200',
              'mx-2 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
            ]"
          >
            <span
              aria-hidden="true"
              :class="[
                isKeyPredictionOn ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
              ]"
            />
          </Switch>
        </div>
      </div>

      <div
        class="my-2 sm:mx-6 bg-white divide-y divide-gray-100 overflow-hidden shadow sm:rounded-lg"
      >
        <!-- 循环所有客观题 -->
        <div v-for="obj in tea.object" :key="obj" class="px-4 py-3 sm:p-4">
          <!-- 单选题 -->
          <RadioGroup v-model="obj.selected">
            <div class="flex items-center space-x-3">
              <div class="w-6 text-base text-center bg-gray-100">{{
                obj.teaCode
              }}</div>
              <RadioGroupOption
                as="template"
                v-for="opt in obj.options"
                :key="opt"
                :value="opt.name"
                v-slot="{ active, checked }"
              >
                <div
                  :class="[
                    optionSelectedStyles[opt.pr],
                    active && checked ? 'ring ring-offset-1' : '',
                    !active && checked ? 'ring-2' : '',
                    '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      isKeyPredictionOn ? optionBgStyles[opt.pr] : '',
                      'h-8 w-8 border border-black border-opacity-10 rounded-full text-lg text-center text-gray-400',
                    ]"
                    >{{ isKeyPredictionOn ? '' : opt.name }}</span
                  >
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
          <!-- 多选题 -->
          <!-- 写烦了，不想写多选组件，取消多选功能，一律按单选处理 -->
        </div>
      </div>

      <div class="py-2 flex justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-lg leading-6 font-medium text-gray-900">主观题</h2>
      </div>

      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div
          class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        >
          <div class="space-y-1 text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label
                for="file-upload"
                class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <span @click="open = true">从网络选择</span>
              </label>
              <p class="pl-1">本地上传已禁用</p>
            </div>
            <p class="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
          </div>
        </div>
      </div>

      <TransitionRoot as="template" :show="open">
        <Dialog
          as="div"
          class="fixed inset-0 overflow-hidden"
          @close="open = false"
        >
          <div class="absolute inset-0 overflow-hidden">
            <DialogOverlay class="absolute inset-0" />

            <div
              class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
            >
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <div class="pointer-events-auto w-screen max-w-md">
                  <div
                    class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                  >
                    <div
                      class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6"
                    >
                      <div class="px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                          <DialogTitle
                            class="text-lg font-medium text-gray-900"
                          >
                            主观题在线上传
                          </DialogTitle>
                          <div class="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              @click="onOpenSubjectSelectDialog"
                            >
                              <span class="sr-only">Close panel</span>
                              <XIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="relative mt-6 flex-1 px-4 sm:px-6">
                        <!-- 弹窗主体 -->
                        <ul
                          role="list"
                          class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                        >
                          <li
                            v-for="file in files"
                            :key="file.source"
                            class="relative"
                          >
                            <div
                              class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
                            >
                              <img
                                :src="file.source"
                                alt=""
                                class="object-cover pointer-events-none group-hover:opacity-75"
                              />
                              <button
                                type="button"
                                class="absolute inset-0 focus:outline-none"
                              />
                            </div>
                            <p
                              class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none"
                              >{{ file.title }}</p
                            >
                            <p
                              class="block text-sm font-medium text-gray-500 pointer-events-none"
                              >{{ file.size }}</p
                            >
                          </li>
                        </ul>
                        <!-- 弹窗主体结束 -->
                      </div>
                    </div>
                    <div class="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        @click="open = false"
                        >Cancel</button
                      >
                      <button
                        type="submit"
                        class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >Save</button
                      >
                    </div>
                  </div>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import { onActivated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// icons
import { ChevronLeftIcon } from '@heroicons/vue/solid';
import { XIcon } from '@heroicons/vue/outline';
// store
import useTaskInfoStore from '@/stores/taskInfo';
import useKeysStore from '@/stores/keys';
// components
import {
  RadioGroup,
  RadioGroupOption,
  Switch,
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
// api
import { getTaskRank } from '@/api/rank';

const route = useRoute();
const router = useRouter();

const taskInfoStore = useTaskInfoStore();
const keysStore = useKeysStore();

const isViewShow = ref(false);
const isKeyPredictionOn = ref(false);
const open = ref(false);

const files = [
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  // More files...
];

const onOpenSubjectSelectDialog = async() => {
  await getTaskRank({
    taskId: route.params.taskId,
    page: 1,
    limit: 10
  })
  // @todo 随机二卷没做呢
  open.value = true;
};

const optionBgStyles = {
  0.0: 'bg-gray-300',
  0.1: 'bg-gray-400',
  0.2: 'bg-red-400',
  0.3: 'bg-purple-400',
  0.4: 'bg-indigo-400',
  0.5: 'bg-blue-400',
  0.6: 'bg-yellow-400',
  0.7: 'bg-indigo-400',
  0.8: 'bg-pink-400',
  0.9: 'bg-green-400',
};

const optionSelectedStyles = {
  0.0: 'ring-gray-300',
  0.1: 'ring-gray-400',
  0.2: 'ring-red-400',
  0.3: 'ring-purple-400',
  0.4: 'ring-indigo-400',
  0.5: 'ring-blue-400',
  0.6: 'ring-yellow-400',
  0.7: 'ring-indigo-400',
  0.8: 'ring-pink-400',
  0.9: 'ring-green-400',
};

const tea = ref({});

// 计算客观题每题每选项的正确概率
const doGetOptions = async () => {
  await keysStore.setObject(route.params.taskId).then(() => {
    let object = [];
    let subject = [];
    taskInfoStore.taskInfo.data.map((i) => {
      let j = {};
      j.options = [];
      if (i.teaQueType === '单选题') {
        j.isMutiple = 0;
        j.selected = '';
        i.teaOption.map((ii) => {
          let pr = Math.floor((Math.random() * (0 - 0.9) + 0.9) * 10) / 10;
          if (ii === keysStore.keys.object[i.teaCode]) {
            pr = 0.9;
          }
          j.options.push({ name: ii[0], pr: pr });
        });
        Object.assign(i, j);
        object.push(i);
      } else if (i.teaQueType === '多选题') {
        j.isMutiple = 1;
        j.selected = [];
        i.teaOption.map((ii) => {
          let pr = Math.floor((Math.random() * (0 - 0.9) + 0.9) * 10) / 10;
          if (keysStore.keys.object[i.teaCode].indexOf(ii) !== -1) {
            pr = 0.9;
          }
          j.options.push({ name: ii[0], pr: pr });
        });
        Object.assign(i, j);
        object.push(i);
      } else {
        subject.push(i);
      }
    });
    tea.value.object = object;
    tea.value.subject = subject;
    console.log(keysStore.keys);
    console.log(tea.value);
  });
};

onActivated(() => {
  isViewShow.value = false;
  taskInfoStore.set(route.params.taskId).then(() => {
    doGetOptions().then(() => {
      setTimeout(() => {
        isViewShow.value = true;
      }, 500);
    });
  });
});
</script>
