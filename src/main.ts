import Vue from 'vue';
import Vant, { Toast } from 'vant';
import App from './App.vue';
import router from './router';
import store from './store/index';
import 'vant/lib/index.css';
//  引入rem插件
import 'amfe-flexible';

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(Toast);

// eslint-disable-next-line func-names
Vue.prototype.$backTo = function () {
  this.$router.go(-1);
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
