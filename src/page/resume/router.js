import Main from '@layouts/main.vue';
import resumeCreate from './components/create';
import resumeDetail from './components/detail';
import resumeIndex from './components/index';

const resumeRouter = {
  path: '/resume',
  // access: 6001,
  meta: {
    //   access: 6001,
  },
  title: '简历管理',
  component: Main,
  children: [{
    meta: {
      //   access: 6001,
    },
    path: '/',
    redirect: 'index',
  }, {
    path: 'index',
    name: 'ResumeIndex',
    component: resumeIndex,
    meta: {
      keepAlive: true,
    },
  }, {
    path: 'create',
    name: 'resumeCreate',
    component: resumeCreate,
  }, {
    path: 'detail',
    name: 'resumeDetail',
    component: resumeDetail,
    meta: {
      keepAlive: false,
    },
  }],
};

export default resumeRouter;
