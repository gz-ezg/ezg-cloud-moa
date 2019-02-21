import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';
import Toast from 'vant/lib/toast';
import 'vant/lib/toast/style';
import { routers } from './routes';

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
  if (!Cookies.get('userId') && to.name !== 'Login') {
    next({
      name: 'Login',
    });
  }
  next();
});

router.afterEach(() => {
  Toast.clear();
  window.scrollTo(0, 0);
});

export default router;
