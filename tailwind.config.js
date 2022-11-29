const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.green,
      green: colors.green,
      gray: colors.gray,
      white: colors.white,
      blue: colors.blue,
      pink: colors.pink,
      indigo: colors.indigo,
      yellow: colors.yellow,
      cyan: colors.cyan,
      purple: colors.purple,
      red: colors.red,
    },
  },
  plugins: [require('@tailwindcss/forms')],
  corePlugins: {
    /** 禁用 Preflight 以免 Tailwindcss 与其它 UI 组件库冲突 20221126
     * 用不到了 20221129
     */
    // preflight: false,
  },
};
