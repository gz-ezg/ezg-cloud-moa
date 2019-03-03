/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';
import Toast from 'vant/lib/toast';
import 'vant/lib/toast/style';
import { routers } from './routes';
import store from '../store/index';
import { getUserInfo } from '../api/login';

Vue.use(Router);

const router = new Router({
  routes: routers,
});

//  允许使用的设备类型
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

router.beforeEach(async (to, from, next) => {
  //  缓存设备信息
  if (!store.state.deviceType) {
    let type;
    type = browserType() ? 'pc' : 'mobile';
    if (type === 'mobile') {
      type = isWeixn() ? 'wx' : 'mobile';
    }
    store.commit('setDeviceType', type);
  }

  //  进入登录页清空缓存
  if (to.name === 'Login') {
    store.commit('clearAll');
    Cookies.remove('userId');
    next();
  }

  //  首页判断
  //  待优化，后端如何返回还未决定
  //  当cookie获取不到时，应该在路由拦截器中执行获取登录信息登录，如果无登录信息，则跳回login，有登录信息则设置cookie并跳过拦截器
  if (!Cookies.get('userId') && to.name !== 'Login') {
    try {
      const data = await getUserInfo();
      if (data.id) {
        store.commit('setUserInfo', data);
        Cookies.set('userId', '10000');
      }
    } catch (error) {
      next('/login');
    }
  }

  //  权限及设备拦截器
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
