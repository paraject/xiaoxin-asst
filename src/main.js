import { createApp } from 'vue';

import App from './App.vue';

import naiveui from './utils/naiveui';
import pinia from './utils/pinia';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(naiveui);
app.use(pinia);
app.use(router);

app.mount('#app');
