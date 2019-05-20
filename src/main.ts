import Vue from 'vue';
import Vant, { Toast } from 'vant';
import App from './App.vue';
import router from './router';
import store from './store/index';
import 'vant/lib/index.css';
//  引入rem插件
import 'amfe-flexible';
//  引入字体图标
import './iconfont/iconfont.css';

// import { $Get,$Post } from './api/index';

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(Toast);

// eslint-disable-next-line func-names
Vue.config.devtools = true;//devtools

Vue.prototype.$backTo = function (reback = -1) {
  this.$router.go(reback);
};//返回多少层

Vue.prototype.$taskKindToChinese = function(taskKind){
  switch(taskKind){
      case 'tkFollow':
      return '跟进任务'; 
      break;
      case "tkRemind":
      return '提醒任务';
      break;
      case "tkAudit":
      return '审批任务';
      break;
      case "tkShare":
      return '分配任务';
      break;
      case "tkClue":
      return '线索任务';
      break;
      case "tkLeg":
      return '普通外勤';
      break;
      case "tkLegBus":
      return '商事外勤';
      break;
      case "tkLegBusAss":
      return '工单协助';
      break;
      case "tkLegAcc":
      return '会计外勤';
      break;
      case "tkLegAccCyc":
      return '会计代账';
      break;
      case "tkLegAccHom":
      return '会计到家';
      break;
      case "tkLegMar":
      return '市场外勤';
      break;
      case "tkLegCycAss":
      return '代账协助';
      break;
      default:
      return "未知任务";
  }//任务类型转中文
}
//$Get & $Post
// Vue.prototype.$Get = $Get;
// Vue.prototype.$Post = $Post;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
