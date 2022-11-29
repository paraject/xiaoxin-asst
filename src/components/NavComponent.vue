<template>
  <div class="min-h-full">
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
          <div class="-mr-2 flex md:hidden">
            <!-- 移动端导航栏按钮 -->
            <DisclosureButton
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
        <div class="py-3 border-t border-b-8 border-gray-700">
          <div class="flex justify-between items-center px-5 py-2">
            <div>
              <div class="text-base font-medium leading-none text-white">{{
                user.name
              }}</div>
              <div class="pt-2.5 text-sm font-normal leading-none text-gray-400"
                >UID: {{ user.uid }}</div
              >
            </div>
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
    </Disclosure>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">今天</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- 主体部分 -->
        <div class="px-4 py-6 sm:px-0">
          <slot />
        </div>
      </div>
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
} from '@heroicons/vue/outline';

import { RouterLink } from 'vue-router';

import useUserStore from '@/stores/user';

const userStore = useUserStore();

const user = {
  name: userStore.name,
  uid: userStore.username,
};
const navigation = [
  { name: '今天', to: '/today', current: true },
  { name: '作业', to: '/tasks', current: false },
];
const userNavigation = [
  { name: '偏好设置', to: '#' },
  { name: '关于', to: '#' },
];

const doLogout = () => {
  userStore.logout();
};
</script>
