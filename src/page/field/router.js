import Main from '@layouts/main.vue';

const fieldRouter = {
  path: '/field',
  meta: {},
  access: 10000,
  title: '外勤管理',
  component: Main,
  children: [
    {
      path: '/',
      redirect: 'index',
    },
    // 鉴权页
    {
      path: 'index',
      name: 'fieldIndex',
      component: () => import( /* webpackChunkName: "market" */ './index.vue'),
    },
    // 市场部分
    {
      path: 'marketIndex',
      name: 'marketIndex',
      component: () => import( /* webpackChunkName: "market" */ './components/market/index.vue'),
    },
    {
      path: 'marketLeave',
      name: 'marketLeave',
      component: () => import( /* webpackChunkName: "market" */ './components/market/leave.vue'),
    },
    //  商事部部分
    {
      path: 'commericalIndex',
      name: 'commericalIndex',
      component: () => import( /* webpackChunkName: "commerical" */ './components/commerical/index.vue'),
    },
    {
      path: 'commericalLeave',
      name: 'commericalLeave',
      component: () => import( /* webpackChunkName: "commerical" */ './components/commerical/index.vue'),
    },
    // //  会计部门
    {
      path: 'accountIndex',
      name: 'accountIndex',
      component: () => import( /* webpackChunkName: "account" */ './components/account/index.vue'),
    },
    {
      path: 'accountLeave',
      name: 'accountLeave',
      component: () => import( /* webpackChunkName: "account" */ './components/account/index.vue'),
    },
    {
      path: 'accountComfirm',
      name: 'accountComfirm',
      component: () => import( /* webpackChunkName: "account" */ './components/account/index.vue'),
    },
    {
      path: 'comfirmsuccess',
      name: 'comfirmsuccess',
      component: () => import( /* webpackChunkName: "account" */ './components/account/index.vue'),
    },
    //  企划部门
    {
      path: 'planIndex',
      name: 'planIndex',
      component: () => import( /* webpackChunkName: "plan" */ './components/plan/index.vue'),
    },
    {
      path: 'planLeave',
      name: 'planLeave',
      component: () => import( /* webpackChunkName: "plan" */ './components/plan/index.vue'),
    },
    //  其他部门
    {
      path: 'otherIndex',
      name: 'otherIndex',
      component: () => import( /* webpackChunkName: "other" */ './components/other/index.vue'),
    },
    {
      path: 'otherLeave',
      name: 'otherLeave',
      component: () => import( /* webpackChunkName: "other" */ './components/other/index.vue'),
    },
    //  结束打卡
    {
      path: 'Success',
      name: 'Success',
      component: () => import( /* webpackChunkName: "market" */ './components/market/index.vue'),
    },
  ],
};

export default fieldRouter;
