/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import fieldDetail from '../page/field/store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    userName: '',
    userRole: [],
    userAccess: [],
    menu: [],
  },
  mutations: {
    setUserInfo(state, info) {
      state.userId = info.id;
      state.userName = info.realname;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    setUserAccess(state, access) {
      state.userAccess = access;
    },
  },
  actions: {

  },
  modules: {
    fieldDetail,
  },
});
