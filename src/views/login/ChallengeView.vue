<template>
  <!-- h-screen 在 md 适配有问题，临时用 absolute 和 inset-0 保证效果 -->
  <div class="max-h-full md:absolute md:inset-0 flex">
    <!-- 加载遮罩层 -->
    <div
      v-if="isLoadingLayerShow"
      class="fixed inset-0 bg-white bg-opacity-50"
    ></div>

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
            src="/img/xiaoxin-logo-icon.png"
            alt="Xiaoxin Logo"
          />
          <h2 class="mt-6 text-2xl lg:text-3xl font-medium text-gray-900">
            登录到小鑫助手
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            使用账户
            <a
              href=""
              class="font-medium text-primary-600 hover:text-primary-500"
              @click="onBackToIndentifier"
            >
              {{ route.query.userName }}
            </a>
          </p>
        </div>

        <!-- Form Main -->
        <div class="mt-7">
          <div class="space-y-6">
            <div class="space-y-1">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                密码
              </label>
              <div class="mt-1">
                <input
                  v-model="userPass"
                  @keyup.enter="onLogin"
                  ref="userPassInput"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <!-- @todo 现在没做舍弃 token 的逻辑，即使不勾选也是保持登录。上线后会马上做。20221127 1946 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  class="ml-2 block text-sm text-gray-900"
                >
                  在该设备上保持登录
                </label>
              </div>

              <!-- @todo 现在没做，但以后还是会做的，先把主要功能实现再说。目前是直接跳转小鑫官网。20221127 1944 -->
              <div class="text-sm">
                <a
                  href="https://homework.xinkaoyun.com"
                  class="font-medium text-primary-600 hover:text-primary-500"
                >
                  忘记密码？
                </a>
              </div>
            </div>

            <!-- Login Button -->
            <div>
              <button
                @click="onLogin"
                type="button"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                登录
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
import { onMounted, nextTick, reactive, ref } from 'vue';

import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import useUserStore from '@/stores/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const userPassInput = ref(null); // 密码输入框
const isLoadingLayerShow = ref(false); // 加载遮罩

const userPass = ref('');

// 点击用户名，可路由回 Identifier 修改用户名（没什么卵用，因为很少有人会点这东西）
const onBackToIndentifier = () => {
  router.push({
    path: '/login/identifier',
    query: { userName: route.query.userName },
  });
};

const onLogin = async () => {
  if (!userPass.value) {
    window.$message.warning('请输入密码');
  } else {
    isLoadingLayerShow.value = true;

    const userLoginData = reactive({
      userName: route.query.userName,
      userPass: userPass.value,
      platform: route.query.platform,
      deviceNo: route.query.deviceNo,
    });
    await userStore.login(userLoginData, route.query.redirect);
    isLoadingLayerShow.value = false;
  }
};

onMounted(() => {
  // 自动聚焦到密码输入框
  nextTick(() => {
    userPassInput.value.focus();
  });

  // 自动携带平台参数
  router.push({
    path: route.path,
    query: { ...route.query, platform: 'pc', deviceNo: 'Pc_Hello' },
  });

  // 如果用户直接访问本页面，是没有用户名参数的，驳回并路由到 Identifier 页面
  if (!('userName' in route.query)) {
    router.push('/login');
  }
});
</script>
