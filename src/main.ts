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
Vue.config.devtools = true;

Vue.prototype.$backTo = function (reback = -1) {
  this.$router.go(reback);
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
