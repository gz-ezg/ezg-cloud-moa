const fieldDetail = {
  namespaced: true,
  state: {
    addr: '暂无',
    showImg: [],
    uploadImg: [],
    fieldType: {},
    fieldTypeList: [],
    fieldDetail: {},
    company: {},
    customer: {},
    clockTime: '',
    finalTime: '',
    customerID: '',
    companyModalStatus: false,
    customerModalStatus: false,
    fieldTypeModalStatus: false,
  },
  mutations: {
    change_company_modal_status(state) {
      state.companyModalStatus = !state.companyModalStatus;
    },
    change_customer_modal_status(state) {
      state.customerModalStatus = !state.customerModalStatus;
    },
    change_fieldType_modal_status(state) {
      state.fieldTypeModalStatus = !state.fieldTypeModalStatus;
    },
    set_accout_status(state, item) {
      state.fieldType = item;
    },
    update_addr(state, addr) {
      state.addr = addr;
    },
    push_img(state, img) {
      state.showImg.push(img);
    },
    push_upload_img(state, img) {
      state.uploadImg.push(img);
    },
    remove_upload_img(state, index) {
      state.uploadImg.splice(index, 1);
      state.showImg.splice(index, 1);
    },
    remove_all(state) {
      state.uploadImg = [];
      state.showImg = [];
      state.addr = '暂无';
      state.fieldType = {};
      state.fieldTypeList = [];
      state.company = {};
      state.customer = {};
    },
    set_fieldTypeList(state, List) {
      state.fieldTypeList = List;
    },
    set_fieldType(state, fieldType) {
      state.fieldType = fieldType;
    },
    set_field_detail(state, detail) {
      state.fieldDetail = detail;
    },
    set_company(state, company) {
      state.company = company;
    },
    set_customer(state, customer) {
      state.customer = customer;
    },
    update_clockTime(state, time) {
      state.clockTime = time;
    },
    set_finalTime(state, finalTime) {
      state.finalTime = finalTime;
    },
    change_customer_ID(state, customerID) {
      state.customerID = customerID;
      state.company = {};
    },
    // remove_customer_ID(){
    //   state.customerID = ''
    // },
    remove_customer_ID(state) {
      state.customerID = '';
    },
  },
  actions: {

  },
  // getters:{
  //   timeTamp: (state) =>{
  //     let nowTime = new Date()
  //     let temp = nowTime.getTime() - state.clockTime
  //     return temp
  //   }
  // }
};

export default fieldDetail;
