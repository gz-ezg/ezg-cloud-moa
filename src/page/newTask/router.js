import Main from '@layouts/main.vue';
import newTaskIndex from './index.vue';

const myTaskRouter = {
  path: '/newTask',
  meta: {},
  title: '新增任务',
  component: Main,
  children: [
    {
      path: 'index',
      name: 'newTaskIndex',
      component: newTaskIndex,
    },
  ],
};

export default myTaskRouter;
