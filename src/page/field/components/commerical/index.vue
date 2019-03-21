<template>
    <van-row style="overflow-x: hidden">
        <van-row style="padding-bottom:2rem">
            <van-nav-bar title="普通外勤打卡" left-arrow @click-left="$backTo(-2)"/>
                <local-init></local-init>
                <van-cell-group style="width:80%;margin:auto;margin-top:1rem">
                    <van-field
                        :value="workOrderCompany.companyname"
                        required
                        clearable
                        readonly
                        placeholder="请填写公司"
                        @click.native="open_workorder_company_select(company)"
                    />
					<van-field
					    :value="workOrderCompany.alisname"
					    required
					    clearable
					    readonly
					    placeholder="选择工单"
					/>
					<!-- <van-button 
						type="default" 
						v-for="(item,index) of fieldTypeList"
						@click="choose_radio(index,item)"
						:class="index===current?'buttonCurrent':null"
						:key="index"
					>
						{{item.name}}
					</van-button> -->
                    <!-- <van-field
                        :value="company.name"
                        required
                        clearable
                        readonly
                        placeholder="客户名称"
                        @click.native="open_company_select(company)"
                    />
                    <van-field
                        :value="company.tel"
                        required
                        clearable
                        readonly
                        placeholder="客户联系方式"
                        @click.native="open_company_select(company)"
                    />
                    <van-field
                        :value="workOrder.product"
                        required
                        clearable
                        readonly
                        placeholder="请选择工单"
                        @click.native="workOrderListStatus=true"
                        type="textarea"
                    />
                    <van-field
                        :value="fieldType.typename"
                        required
                        clearable
                        readonly
                        placeholder="请选择外勤类型"
                        @click.native="open_fieldType_select"
                    /> -->
					
                </van-cell-group>
				
				<div>
					<van-icon 
						name="add" 
						@click.native="open_workorder_company_select(company)" 
					/>增加公司及工单
				</div>
				
				<van-cell-group>
				  <van-cell
					v-for="(item,i) of workOrderList"
					:title="item.companyname" 
					:label="item.alisname"
				  >
					  <van-icon slot="right-icon" name="clear" class="custom-icon" @click="removeOrederWork(i)" />
				  </van-cell>
				  
				</van-cell-group>
				
                <!-- <div style="width:80%;margin:auto;margin-top:20px" v-if="workOrder.product=='空'">
                    <van-cell-group>
                        <van-cell>
                            <van-radio-group v-model="assiststatus">
                                <van-col span="12"><van-radio name="Y">协助外勤</van-radio></van-col>
                                <van-col span="12"><van-radio name="N">非协助外勤</van-radio></van-col>
                            </van-radio-group>
                        </van-cell>
                        <van-field
                            v-if="assiststatus == 'Y'"
                            :value="account.realname"
                            required
                            clearable
                            readonly
                            placeholder="请选择协助会计"
                            @click.native="accoutList=true"
                        />
                    </van-cell-group>
                </div> -->
				<van-cell-group>
					<van-button 
						type="default" 
						v-for="(item,index) of buttonList"
						@click="choose_radio(index,item)"
						:class="index===current?'buttonCurrent':null"
						:key="index"
					>
						{{item.typename}}
					</van-button>
				</van-cell-group>
				
                <upload-img></upload-img>
                <div style="width:80%;margin:auto;margin-top:0.6rem">
                    <van-cell-group>
                        <van-field
                            v-model="memo"
                            type="textarea"
                            placeholder="打卡说明（选填）"
                            rows="3"
                            autosize
                        />
                    </van-cell-group>
                </div>
        </van-row>
        <van-tabbar style="margin-top:1rem;">
            <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px" :loading="buttonLoading" @click="data_check">开始打卡</van-button>
        </van-tabbar>
        <!-- <work-order-list
          v-if="workOrderListStatus"
          :companyId="company.companyid"
          @chooseWordOrder="change_workorder"
          @close="workOrderListStatus = false"
          :select="workOrder"
        ></work-order-list>
        <account-list
          v-if="accoutList"
          @close="accoutList = false"
          @change-account="change_account"
        ></account-list> -->
		<work-order-companyList></work-order-companyList>
  </van-row>
</template>

<script lang="ts">
import uploadImg from '../common/main-components/uploadImg.vue'
import localInit from '../common/main-components/localInit.vue'
import schema from 'async-validator'
// import workOrderList from '../common/function-components/workOrderList.vue'
import accountList from '../common/function-components/accountList.vue'
import workOrderCompanyList from '../common/function-components/workOrderCompanyList.vue'

import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
// import * as commonApi from '../../../../api/index';
import * as commonApi from '../../api/common/index';
import * as clockApi from '../../api/clock/index';
import { Toast } from 'vant';

@Component({
    components: {
        uploadImg,
        localInit,
        // workOrderList,
        accountList,
		workOrderCompanyList
    }
})
export default class commericalIndex extends Vue {
    buttonLoading: boolean = false
    memo = ""
    workOrderListStatus: boolean = false
    accoutList: boolean = false
	current = 0
    workOrder = {
      id:"",
      product: ""
    }
    assiststatus = 'N'
    account = {
      id: ""
    }
	buttonType = ""
	buttonList = []
	
	get workOrderList(){
		// console.log(this.$store.state.fieldDetail.workOrderList)
		return this.$store.state.fieldDetail.workOrderList
	}

    get fieldType(){
        return this.$store.state.fieldDetail.fieldType
    }
    get uploadImg(){
      return this.$store.state.fieldDetail.uploadImg
    }
	get workOrderCompany(){
		return this.$store.state.fieldDetail.workOrderCompany
	}
	
    open_company_select(id){
        this.$store.commit("fieldDetail/change_company_modal_status")
    }
	open_workorder_company_select(id){
		this.$store.commit("fieldDetail/change_workOrder_company_modal_status")
	}

    open_fieldType_select(){
        this.$store.commit("fieldDetail/change_fieldType_modal_status")
    }

    change_workorder(item){
      this.workOrder = item
      this.workOrderListStatus = false
    }

    change_account(item){
      this.account = item
      this.accoutList = false
    }
	
	choose_radio(index,item){
		this.current = index
		this.buttonType = item
	}
	
	removeOrederWork(i){
		this.$store.commit("fieldDetail/remove_oreder_work",i)
	}

    async created(){
        let config = {
            params: {
                groupCodes:"commercial_field_type"
            }
        }
        let {commercial_field_type} = await commonApi.getFieldTypeList(config)
		this.buttonList = commercial_field_type
		
    }


    data_check(){
      let _self = this
      //  表单验证
      var descriptor = {
        // company: { type: "number", required: true, message: "请选择服务企业！"},
        // workorder: {required:true, message: "请选择工单！"},
        legworkSubtype: { type: "string", required: true, message: "请选择外勤类型！"},
        img_array: { type: "array", required:true, message: "请选择照片！"},
        // addr: {type: "string", required:true, message: "获取定位失效，请重开窗口！"}
      }
      var validator = new schema(descriptor);
      validator.validate(
        {
        //   company: _self.company.companyid,
          // workorder: _self.workOrder,
          legworkSubtype: _self.buttonType.typecode,
          img_array: _self.$store.state.fieldDetail.showImg,
          // addr: _self.$store.state.filedDetail.addr,
        }, (errors, fields) => {
        if(errors) {
          console.log(errors)
          _self.$toast.fail(errors[0].message)
          return 1;
        }else{
          _self.submit()
        }
      });
    }
    async submit(){
      let _self = this
      this.buttonLoading = true
      let formdata = new FormData()
      // formdata.append('workOrderIds', _self.workOrderIDS) //工单的Ids
      formdata.append('beginAddress', this.$store.state.fieldDetail.addr) //开始打卡的地址
      formdata.append('legworkSubtype', _self.buttonType.typecode) //外勤的类型
      formdata.append('beginMemo',_self.memo) //开始打卡的备注

//       if(this.workOrder.id){
//         formdata.append('workorderid',this.workOrder.id)
//       }
//       formdata.append('assiststatus',this.assiststatus)
//       if(this.account.id){
//         formdata.append("accountid",this.account.id)
//       }
//       if(this.workOrder.product == "空"){
//         formdata.append('productname',"")
//       }else{
//         formdata.append('productname',this.workOrder.product)
//       }

      for(let i = 0;i<_self.uploadImg.length;i++){
        formdata.append('files',_self.uploadImg[i],"file_" + new Date() + ".jpg") //照片
      }
	  
	  for(let i = 0;i<_self.workOrderList.length;i++){
		formdata.append('workOrderIds', _self.workOrderList[i].id)  //工单的Ids
	  }
	  
      let { status, data} = await clockApi.saveLegworkVisitMsgWorkOrder(formdata)
      if(status){
		console.log(status)
        console.log(data)
        _self.$toast.loading({
          message: "正在跳转至离开打卡界面...",
          duration: 1000
        })
        this.$store.commit("fieldDetail/remove_all")
        setTimeout(()=>{
          this.$router.push({
            name: "commericalLeave"
          })
        }, 1000)
      }
    }
}
</script>

<style>
.select{
  color: red
}
#address .van-cell__value--alone{
  text-align: center
}
.buttonCurrent{
	background: yellowgreen;
}
</style>

 
 <!-- <template>
	<van-row style="overflow-x: hidden">
	      <van-row style="padding-bottom:2rem">
	          <van-nav-bar title="普通外勤打卡" left-arrow @click-left="$backTo(-2)"/>
	              <local-init></local-init>
	              <van-cell-group style="width:80%;margin:auto;margin-top:1rem">
	                  <van-field
	                      :value="company.companyname"
	                      required
	                      clearable
	                      readonly
	                      placeholder="请填写公司"
	                      @click.native="open_company_select(company)"
	                  />
	                  
	                  <van-field
	                      :value="workOrder"
	                      required
	                      clearable
	                      readonly
	                      placeholder="请选择工单"
	                  />
	                  
	              </van-cell-group>
	              
	              <upload-img></upload-img>
	              <div style="width:80%;margin:auto;margin-top:0.6rem">
	                  <van-cell-group>
	                      <van-field
	                          v-model="memo"
	                          type="textarea"
	                          placeholder="打卡说明（选填）"
	                          rows="3"
	                          autosize
	                      />
	                  </van-cell-group>
	              </div>
	      </van-row>
	      <van-tabbar style="margin-top:1rem;">
	          <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px" :loading="buttonLoading" @click="data_check">开始打卡</van-button>
	      </van-tabbar>
	      
	</van-row> 
 </template>
 
 
 <script lang="ts">
import uploadImg from '../common/main-components/uploadImg.vue'
import localInit from '../common/main-components/localInit.vue'
import schema from 'async-validator'
import workOrderList from '../common/function-components/workOrderList.vue'
import accountList from '../common/function-components/accountList.vue'

import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
import * as commonApi from '../../../../api/index';
import * as clockApi from '../../api/clock/index';
import { Toast } from 'vant';


export default class commericalIndex extends Vue {
	buttonLoading: boolean = false
    memo = ""
	workOrder = ''
	
	get company(){
		console.log(this.$store.state.fieldDetail.company)
	    return this.$store.state.fieldDetail.company
	}
	
	
// 	open_company_select(id){
// 	    this.$store.commit("fieldDetail/change_company_modal_status")
// 	}
		

	async created(){
		console.log("abc")
// 	    let config = {
// 	        params: {
// 	            page:1,
// 				pageSize:10,
// 				companyname:this.company.companyname
// 	        }
// 	    }
// 	    let workOrder = await commonApi.getWorkOrderByCompanyId(config)
// 		console.log("workOrder")
// 	    console.log(workOrder)
	}
}

 </script>
 
 
 <style></style> -->