/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import { getInterfaceItemByUserId, getUserInfo } from '../api/login';
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
      state.aliasCode = info.currentDepart.aliasCode;
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
    async updateAccess({ commit }) {
      console.log('updateAccess');
      const { interfaces } = await getInterfaceItemByUserId();
      commit('setUserAccess', interfaces);
      commit('updateMenu', []);
      // console.log(PageRouter);
      const tempMenu = [];
      for (let i = 0; i < PageRouter.length; i++) {
        if (this.state.userAccess.includes(PageRouter[i].access)) {
          tempMenu.push(PageRouter[i]);
        }
      }
      commit('updateMenu', tempMenu);
    },
    async getUserInfo({ commit, dispatch }) {
      console.log('getUserInfo');
      // const { id, realname, currentDepart } = await getUserInfo();
      const info = {
        id: 10059,
        realname: 'realname',
        currentDepart: { aliasCode: 'depart' },
      };
      console.log(info);
      commit('setUserInfo', info);
      dispatch('updateAccess');
    },
  },
  modules: {
    fieldDetail,
  },
});
