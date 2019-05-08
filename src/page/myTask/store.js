const myTaskDetail = {
    namespaced: true,
    state: {
      tab:'remainingTask',
    },
    mutations: {
        change_tab(state,tab) {
            state.tab = tab;
        }
    },
    getters:{
        get_tab: state => {
            return state.tab
        }
    }
  };

export default myTaskDetail;
  