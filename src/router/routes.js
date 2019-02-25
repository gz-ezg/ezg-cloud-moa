import Index from '../layouts/index.vue';
import Login from '../layouts/login.vue';
import fieldRouter from '../page/field/router.js';
import DeviceError from '../layouts/deviceError';

export const loginRouter = {
  path: '/login',
  name: 'Login',
  component: Login,
};

export const BaseRouter = {
  path: '/',
  redirect: '/index',
};

export const IndexRouter = {
  path: '/index',
  name: 'Index',
  component: Index,
};

export const DeviceErrorRouter = {
  path: '/deviceError',
  name: 'DeviceError',
  component: DeviceError,
};

export const PageRouter = [
  fieldRouter,
  {
    path: '/field1',
    meta: {
      access: 6002,
    },
    access: 6002,
    title: '外勤管理1',
  },
  {path: '/field2',
    meta: {
      access: 60000,
    },
    access: 60000,
    title: '外勤管理3',
  },
  {
    path: '/field3',
    meta: {
      access: 60010,
    },
    access: 60010,
    title: '外勤管理4',
  },
  {
    path: '/field4',
    meta: {
      access: 6009,
    },
    access: 6009,
    title: '外勤管理9',
  },
  {
    path: '/field5',
    meta: {
      access: 6100,
    },
    access: 6100,
    title: '外勤管理10',
  },
];


export const routers = [
  loginRouter,
  BaseRouter,
  IndexRouter,
  DeviceErrorRouter,
  ...PageRouter,
];
