<template>
  <!-- NavBar -->
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
                  $route.path == item.to
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
                        userStore.user.realName
                      }}</span>
                    </MenuItem>
                    <MenuItem>
                      <span class="block px-4 pb-2 text-sm text-gray-500"
                        >UID: {{ userStore.user.userName }}</span
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
            $route.path == item.to
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
              userStore.user.realName
            }}</div>
            <div class="pt-2.5 text-sm font-normal leading-none text-gray-400"
              >UID: {{ userStore.user.userName }}</div
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
  <!-- /NavBar -->
</template>

<script setup>
// components
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/vue';
// icons
import {
  MenuIcon,
  UserIcon,
  XIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/vue/outline';
// router
import { RouterLink } from 'vue-router';
// stores
import useUserStore from '@/stores/user';

const userStore = useUserStore();

// navigation items data
const navigation = [
  { name: '今天', to: '/today' },
  { name: '作业', to: '/task' },
];

const userNavigation = [
  { name: '偏好设置', to: '#' },
  { name: '关于', to: '#' },
];

const doLogout = () => {
  userStore.logout();
};
</script>
