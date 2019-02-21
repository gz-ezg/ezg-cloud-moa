import Index from '../layouts/index.vue';
import Login from '../layouts/login.vue';
import fieldRouter from '../page/field/router.js';

export const loginRouter = {
  path: '/login',
  name: 'Login',
  component: Login,
};

export const IndexRouter = {
  path: '/',
  name: 'Index',
  component: Index,
};

export const PageRouter = [
  fieldRouter,
];


export const routers = [
  loginRouter,
  IndexRouter,
  ...PageRouter,
];
