import { createApp } from 'vue'
//import * as Vue from 'vue';
import App from './App.vue';
import './index.css';
import router from './router.js';

import Qs from 'qs';
import Cookies from 'js-cookie';


const app = createApp(App);


app.use(router).mount('#app');
app.config.globalProperties.Qs = Qs;
app.config.globalProperties.Cookies = Cookies;
app.config.globalProperties.backhome = () => {
    self.location.href = "/";
};
app.config.globalProperties.logout = () => {
    Cookies.remove('token');
    self.location.href = "/login";
};