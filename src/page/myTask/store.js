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
        set_selected(state,id){
            state.selected.indexOf(id)===-1?state.selected.push(id):state.selected.splice(state.selected.indexOf(id),1);
            state.selected = Array.from(new Set(state.selected));
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
  