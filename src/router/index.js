/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
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

const currentDeviceType = 'mobile';

//  微信端判断
function isWeixn() {
  const ua = navigator.userAgent.toLowerCase();
  const isWeixin = ua.indexOf('micromessenger') !== -1;
  if (!isWeixin) {
    return false;
  } else {
    return true;
  }
}

//  移动端判断
function browserType() {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

router.beforeEach((to, from, next) => {
  if (!store.state.deviceType) {
    let type;
    type = browserType() ? 'pc' : 'mobile';
    if (type === 'mobile') {
      type = isWeixn() ? 'wx' : 'mobile';
    }
    store.commit('setDeviceType', type);
    console.log(store.state.deviceType);
  }

  console.log(store.state);
  if (to.name === 'Login') {
    store.commit('clearAll');
    Cookies.remove('userId');
    next();
  }
  if (!Cookies.get('userId') && to.name !== 'Login') {
    next({
      name: 'Login',
    });
  }
  // if (to.meta.access && !store.state.userAccess.includes(to.meta.access)) {
  //   Toast.fail('权限不足！');
  //   next(false);
  // }
  // } else {
  //   next();
  // }
  if (store.state.deviceType === currentDeviceType || to.name === 'DeviceError') {
    if (to.meta.access && !store.state.userAccess.includes(to.meta.access)) {
      Toast.fail('权限不足！');
      next(false);
    } else {
      next();
    }
  } else {
    next('/deviceError');
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
