import * as vueRouter from "vue-router";
const home = () => import('./components/home.vue')
const login = () => import('./components/login.vue')
const task = () => import('./components/task.vue')

const routes = [
    {path:'/login',component:login},
    {name:'home',path: '/',component: home} ,
    {name:'task',path: '/task',component: task} 
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes: routes
});
export default router;


