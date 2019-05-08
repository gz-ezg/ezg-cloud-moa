import Main from '@layouts/main.vue';
// import resumeCreate from './components/create';
// import resumeDetail from './components/detail';
import myTaskIndex from './index';

const myTaskRouter = {
  path: '/myTask',
  // access: 6001,
  meta: {
    //   access: 6001,
  },
  title: '我的任务',
  component: Main,
  children: [{
    meta: {
      //   access: 6001,
    },
    path: '/',
    redirect: 'index',
  }, {
    path: 'index',
    name: 'myTaskIndex',
    component: myTaskIndex,
    // meta: {
    //   keepAlive: true,
    // },
  }],
};

export default myTaskRouter;
