<template>
  <div
    class="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
  >
    <div class="max-w-max mx-auto">
      <div class="sm:flex">
        <p class="text-4xl font-extrabold text-primary-500 sm:text-5xl">503</p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1
              class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
              >服务不可用</h1
            >
            <p class="mt-2 text-base text-gray-500"
              >我们都希望有幻想乡般的假期。<br /><i>别点追问了，累了。</i></p
            >
          </div>
          <div
            class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6"
          >
            <button
              @click="isInfoAlertDialogOpen = true"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              追问？
            </button>
            <button
              href=""
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-500 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              睡觉
            </button>
          </div>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="isInfoAlertDialogOpen">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="isInfoAlertDialogOpen = false"
      >
        <!-- 在 md 尺寸上给模态框 fixed 属性会导致后方元素被顶上去，先用 relative 相克以保证效果 -->
        <div
          class="flex items-end justify-center min-h-full px-4 text-center sm:block sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <!-- 这个元素是为了欺骗浏览器将模态内容置于中心位置 -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="relative inline-block align-middle bg-white rounded-lg px-4 text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-sm w-full p-6"
            >
              <div>
                <div class="text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    发生了什么？
                  </DialogTitle>
                  <div>
                    <p class="mt-2 text-sm text-gray-500">
                      没什么，不过是又有用户违反不宣传原则罢了。
                    </p>
                    <p class="mt-2 text-sm text-gray-500">
                      暂时停服冷却，恢复时间待定。
                    </p>
                    <p class="mt-2 text-sm text-gray-500">
                      上次还是在 11 月 31 日，距今仅仅十二天，令人感叹。
                    </p>
                    <!-- <p class="mt-2 text-sm text-gray-500">
                      (A-Z)
                    </p>
                    <DialogTitle
                      as="h3"
                      class="mt-4 text-lg leading-6 font-medium text-gray-900"
                    >
                      @Junical
                    </DialogTitle>
                    <p class="mt-2 text-sm text-gray-500">
                      助手解一时之愁，难解一世之苦。<br />
                      愿你在每次打开助手之时，<br />
                      能够回头审视一下自己的成绩硬实力。
                    </p>
                    <DialogTitle
                      as="h3"
                      class="mt-4 text-lg leading-6 font-medium text-gray-900"
                    >
                      @Kwaain
                    </DialogTitle>
                    <p class="mt-2 text-sm text-gray-500">
                      我们都希望有个幻想乡般的假期，<br />
                      让现实承载一切不想写的作业。<br />
                      但生活总归要回到现实。
                    </p>
                    <DialogTitle
                      as="h3"
                      class="mt-4 text-lg leading-6 font-medium text-gray-900"
                    >
                      @YouXam
                    </DialogTitle>
                    <p class="mt-2 text-sm text-gray-500">
                      希望大家能找到自己人生的真正使命，<br />
                      无论是众人眼中的成家立业、<br />
                      还是自己心中的诗和远方。
                    </p>
                    <DialogTitle
                      as="h3"
                      class="mt-4 text-lg leading-6 font-medium text-gray-900"
                    >
                      鸣谢
                    </DialogTitle>
                    <p class="mt-2 text-sm text-gray-500">
                      为助手做出过贡献的个人(A-Z)：<br />
                      - @Hissin<br />
                      - @Junical<br />
                      - @Kwaain<br />
                      - @YouXam<br />
                      - @yuanzhidao<br />
                      以及社会组织团体：<br />
                      - @GeekPara 极客学园<br />
                      - @Paraject 社团<br />
                      还有使用助手的广大用户们<br />
                      <br />
                      <i><strong>———包括你。</strong></i>
                    </p> -->
                    <p class="mt-4 text-sm text-gray-500"
                      >以上。<br />二〇二二年十二月十二日戌时<br />PARAJECT
                      社团</p
                    >
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                  @click="isInfoAlertDialogOpen = false"
                >
                  好的。
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
const isInfoAlertDialogOpen = ref(false);
</script>
