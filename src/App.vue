<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <header>
    <NavBar v-if="$route.meta.keepAlive" />
  </header>

  <main>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <!-- 暂时用不到 keep-alive 了 20221127 1435-->
    <!-- 使用 keep-alive 保证路由后历史页面表单内容不变 20221126 1804 -->
    <!-- <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </RouterView> -->

    <!-- 全局挂载 NaiveUI 脱离上下文的 API -->
    <!-- https://www.naiveui.com/zh-CN/os-theme/components/discrete -->
    <NaiveuiApi />
  </main>
</template>

<script setup>
import NaiveuiApi from '@/components/NaiveuiApi.vue';
import NavBar from './components/NavBar.vue';
</script>
