const myTaskDetail = {
    namespaced: true,
    state: {
      tab:'remainingTask',
      selected:[],
    },
    mutations: {
        change_tab(state,tab){
            state.tab = tab;
        },
        set_selected(state,arr){
            state.selected = Array.from(new Set(state.selected.concat(arr)));
        }
    },
    getters:{
        get_tab: state => {
            return state.tab
        },
        get_selected: state =>{
            return state.selected
        }
    }
  };

export default myTaskDetail;
  