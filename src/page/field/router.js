import Main from '@layouts/main.vue';

const fieldRouter = {
  path: '/field',
  access: 6001,
  meta: {
    access: 6001,
  },
  title: '外勤管理',
  component: Main,
  children: [
    {
      meta: {
        access: 6001,
      },
      path: '/',
      redirect: 'index',
    },
    // 鉴权页
    {
      meta: {
        access: 6001,
      },
      path: 'index',
      name: 'fieldIndex',
      component: () => import( /* webpackChunkName: "market" */ './index.vue'),
    },
    // 市场部分
    {
      meta: {
        access: 6001,
      },
      path: 'marketIndex',
      name: 'marketIndex',
      component: () => import( /* webpackChunkName: "market" */ './components/market/index.vue'),
    },
    {
      meta: {
        access: 6001,
      },
      path: 'marketLeave',
      name: 'marketLeave',
      component: () => import( /* webpackChunkName: "market" */ './components/market/leave.vue'),
    },
    //  商事部部分
    {
      meta: {
        access: 6001,
      },
      path: 'commericalIndex',
      name: 'commericalIndex',
      component: () => import( /* webpackChunkName: "commerical" */ './components/commerical/index.vue'),
    },
    {
      meta: {
        access: 6001,
      },
      path: 'commericalLeave',
      name: 'commericalLeave',
      component: () => import( /* webpackChunkName: "commerical" */ './components/commerical/leave.vue'),
    },
    // //  会计部门
    {
      meta: {
        access: 6001,
      },
      path: 'accountIndex',
      name: 'accountIndex',
      component: () => import( /* webpackChunkName: "account" */ './components/account/index.vue'),
    },
    {
      meta: {
        access: 6001,
      },
      path: 'accountLeave',
      name: 'accountLeave',
      component: () => import( /* webpackChunkName: "account" */ './components/account/index.vue'),
    },
    {
      meta: {
        access: 6001,
      },
      path: 'accountComfirm',
      name: 'accountComfirm',
      component: () => import( /* webpackChunkName: "account" */ './components/account/index.vue'),
    },
    {
      meta: {
        access: 6001,
      },
      path: 'comfirmsuccess',
      name: 'comfirmsuccess',
      component: () => import( /* webpackChunkName: "account" */ './components/account/index.vue'),
    },
    //  企划部门
    {
      meta: {
        access: 6001,
      },
      path: 'planIndex',
      name: 'planIndex',
      component: () => import( /* webpackChunkName: "plan" */ './components/plan/index.vue'),
    },
    {
      meta: {
        access: 6001,
      },
      path: 'planLeave',
      name: 'planLeave',
      component: () => import( /* webpackChunkName: "plan" */ './components/plan/index.vue'),
    },
    //  其他部门
    {
      meta: {
        access: 6001,
      },
      path: 'otherIndex',
      name: 'otherIndex',
      component: () => import( /* webpackChunkName: "other" */ './components/other/index.vue'),
    },
    {
      meta: {
        access: 6001,
      },
      path: 'otherLeave',
      name: 'otherLeave',
      component: () => import( /* webpackChunkName: "other" */ './components/other/index.vue'),
    },
    //  结束打卡
    {
      meta: {
        access: 6001,
      },
      path: 'Success',
      name: 'Success',
      component: () => import( /* webpackChunkName: "market" */ './components/common/field_success.vue'),
    },
  ],
};

export default fieldRouter;
