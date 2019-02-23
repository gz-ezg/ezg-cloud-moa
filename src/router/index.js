import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';
import Toast from 'vant/lib/toast';
import 'vant/lib/toast/style';
import { routers } from './routes';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
  routes: routers,
});

router.beforeEach((to, from, next) => {
  // Toast.loading({
  //   duration: 0,
  //   mask: true,
  //   message: '加载中...',
  // });
  console.log(store.state);
  // console.log(to);
  if (to.name === 'Login') {
    store.commit('clearAll');
    next();
  }
  if (!Cookies.get('userId') && to.name !== 'Login') {
    next({
      name: 'Login',
    });
  }
  if (to.meta.access && !store.state.userAccess.includes(to.meta.access)) {
    // console.log('1234');
    Toast.fail('权限不足！');
    next(false);
  } else {
    // console.log('error');
    next();
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
