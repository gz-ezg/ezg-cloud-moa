/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import { getInterfaceItemByUserId } from '../api/login';
import { PageRouter } from '../router/routes';
import fieldDetail from '../page/field/store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    userName: '',
    userRole: [],
    userAccess: [],
    menu: [],
    aliasCode: '',
    deviceType: '',
  },
  mutations: {
    setUserInfo(state, info) {
      state.userId = info.id;
      state.userName = info.realname;
      // 接口返回值问题，待后台修复之后启用，数据需要与login返回值中的user对象一致
      // state.aliasCode = info.currentDepart.aliasCode || '';
      // 每当刷新用户数据之后，就将权限值置空
      state.menu = [];
      state.userAccess = [];
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    setUserAccess(state, access) {
      state.userAccess = access;
    },
    updateMenu(state, menuList) {
      state.menu = menuList;
    },
    clearAll(state) {
      console.log('clearAll');
      state.userId = '';
      state.userName = '';
      state.userRole = [];
      state.userAccess = [];
      state.menu = [];
    },
    setDeviceType( state, type) {
      state.deviceType = type;
    },
  },
  actions: {
    //  更新权限值并刷新菜单
    async updateAccess({ commit }) {
      console.log('updateAccess');
      const { interfaces } = await getInterfaceItemByUserId();
      commit('setUserAccess', interfaces);
      commit('updateMenu', []);
      const tempMenu = [];
      for (let i = 0; i < PageRouter.length; i++) {
        if (this.state.userAccess.includes(PageRouter[i].access) || !PageRouter[i].access) {
          tempMenu.push(PageRouter[i]);
        }
      }
      commit('updateMenu', tempMenu);
    },
  },
  modules: {
    fieldDetail,
  },
});
