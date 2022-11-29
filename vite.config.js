import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import svgLoader from 'vite-svg-loader';

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: [vue(), svgLoader()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: { 'process.env': {} },
    server: {
      port: 3000,
      proxy: {
        '/intl/api': {
          target: env.VITE_APP_INTERNAL_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/intl\/api/, ''),
        },

        // 外部功能性接口
        '/ext/api': {
          target: env.VITE_APP_EXTERNAL_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ext\/api/, ''),
        },
      },
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
  };
});
