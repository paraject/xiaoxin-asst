<template>
  <!-- ==============================
  @author Kwaain
  @time 20221126 2023
  代码没解藕，组件还没来得及封装，目前是仅仅能用的状态，不建议分支开发。
  临时写一些规范：
  品牌色：colors.green
  链接颜色：文字 text-primary-600，有焦点时文字 text-primary-500
  主要按钮颜色：文字 bg-white，背景 bg-primary-500，聚焦时背景 bg-primary-600，聚焦时边框 ring-primary-500
  info 警示信息的颜色：blue；透明度：背景 50，提示图标 400，文字 700，文字聚焦时 600
  ============================== -->

  <!-- h-screen 在 md 适配有问题，临时用 absolute 和 inset-0 保证效果 -->
  <div class="max-h-full md:absolute md:inset-0 flex">
    <!-- 假加载特效之遮罩层 -->
    <div
      v-if="isLoadingLayerShow"
      class="fixed inset-0 bg-white bg-opacity-50"
    ></div>
    <!-- 展示“登录方式变更通知”详细信息的模态窗口 -->
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
                    登录方式变更通知
                  </DialogTitle>
                  <div>
                    <p class="mt-2 text-sm text-gray-500">
                      每当新假期到来时，小鑫作业会给学生分配新的账户，而旧账户会被删除。账户的用户名是您的唯一号，初始密码可以在鑫考云校园客户端内查询。
                    </p>
                    <p class="mt-2 text-sm text-gray-500">
                      当您初次登录到小鑫作业官网时，会被强制要求修改密码，并绑定手机号，以提高账户安全等级。
                    </p>
                    <p class="mt-2 text-sm text-gray-500">
                      因此，为了保护您的账户安全，自 2022 年 11 月 30 日起，小鑫
                      Plus
                      将仅允许使用手机号登录。若您从未登录过您的账户，您应该先在官网登录，按照指引修改密码并绑定手机号。
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                  @click="isInfoAlertDialogOpen = false"
                >
                  我知道了
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Background -->
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover inline"
        src="/img/login-bg.png"
        alt=""
      />
    </div>

    <!-- Login Form -->
    <div
      class="flex-1 flex flex-col justify-center py-12 px-8 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <!-- Form Header -->
        <div class="text-center lg:text-left">
          <img
            class="inline h-11 w-auto lg:block"
            src="/img/logo-icon.png"
            alt="Xiaoxin Logo"
          />
          <h2 class="mt-6 text-2xl lg:text-3xl font-medium text-gray-900">
            登录到小鑫 Plus
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            使用您的
            <a
              href="https://homework.xinkaoyun.com/"
              class="font-medium text-primary-600 hover:text-primary-500"
            >
              小鑫作业
            </a>
            账户
          </p>
        </div>

        <div class="mt-7 rounded-md bg-blue-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <InformationCircleIcon
                class="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm text-blue-700">
                自从 2022 年 11 月 30 日起，小鑫 Plus 将不再支持唯一号登录。
                <a
                  @click="onInfoAlertDialogOpen"
                  class="cursor-pointer whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                  >了解详情 <span aria-hidden="true">&rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Form Main -->
        <div class="mt-7">
          <div class="space-y-6">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                手机号
              </label>
              <div class="mt-1">
                <input
                  v-model="userName"
                  @input="onUserNameInput"
                  @keyup.enter="onNext"
                  ref="userNameInput"
                  type="tel"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <!-- Next Button -->
            <div>
              <button
                @click="onNext"
                type="button"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                下一步
              </button>
            </div>

            <!-- Agreement Notice -->
            <p class="mt-2 text-xs text-gray-600">
              登录即视为您同意
              {{ ' ' }}
              <a
                href="#"
                class="font-medium text-primary-600 hover:text-primary-500"
              >
                《用户服务协议和隐私政策》
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue';

import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

import { InformationCircleIcon } from '@heroicons/vue/solid';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

const route = useRoute();
const router = useRouter();

const userNameInput = ref(null); // 用户名输入框
const isLoadingLayerShow = ref(false); // 假加载特效之遮罩层
const isInfoAlertDialogOpen = ref(false); // 通知详情弹窗

const userName = ref(route.query.userName || '');

const onInfoAlertDialogOpen = () => {
  isInfoAlertDialogOpen.value = true;
};

const onNext = () => {
  if (!userName.value) {
    window.$message.warning('请输入手机号码');
  } else {
    isLoadingLayerShow.value = true; // 假的加载
    window.$loadingBar.start(); // 假的加载
    // 假的加载
    setTimeout(() => {
      // 携带参数路由到密码认证页
      router.push({
        path: '/login/challenge',
        query: { ...route.query, redirect: route.query.redirect },
      });

      isLoadingLayerShow.value = false;
      window.$loadingBar.finish();
    }, 500);
  }
};

const onUserNameInput = () => {
  // 自动更新路由参数
  // router.push(`${route.path}?${route.query}userName=${userData.userName}`);
  router.push({
    path: route.path,
    query: { ...route.query, userName: userName.value },
  });
};

onMounted(() => {
  // 自动聚焦到手机号输入框
  nextTick(() => {
    userNameInput.value.focus();
  });
});
</script>
