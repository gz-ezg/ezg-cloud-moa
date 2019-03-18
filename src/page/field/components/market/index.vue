<template>
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
                        placeholder="请选择拜访企业"
                        @click.native="open_company_select(company)"
                    />
                    <van-field
                        :value="company.customerName"
                        required
                        clearable
                        readonly
                        placeholder="客户名称"
                        @click.native="open_customer_select(customer)"
                    />
                    <van-field
                        :value="fieldType.typename"
                        required
                        clearable
                        readonly
                        placeholder="请选择外勤类型"
                        @click.native="open_fieldType_select"
                    />
                </van-cell-group>
                <upload-img></upload-img>
                <div style="width:80%;margin:auto;margin-top:0.6rem">
                    <van-cell-group>
                        <van-field
                            v-model="memo"
                            type="textarea"
                            placeholder="打卡说明（必填）"
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
    </van-row>
</template>

<script lang="ts">
import uploadImg from '../common/main-components/uploadImg.vue'
import localInit from '../common/main-components/localInit.vue'
import schema from 'async-validator'

import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
import * as commonApi from '../../api/common/index'
import * as clockApi from '../../api/clock/index'
import { Toast } from 'vant';

@Component({
    components: {
        uploadImg,
        localInit
    }
})
export default class marketIndex extends Vue {
    buttonLoading: boolean = false
    memo = ""

    get company(){
        return this.$store.state.fieldDetail.company
    }
    get customer(){
      return this.$store.state.fieldDetail.customer
    }
	
    get fieldType(){
        return this.$store.state.fieldDetail.fieldType
    }
    get uploadImg(){
        return this.$store.state.fieldDetail.uploadImg
    }
    open_company_select(id){
        this.$store.commit("fieldDetail/change_company_modal_status")
    }
	
	open_customer_select(id){
		this.$store.commit("fieldDetail/change_customer_modal_status")
	}

    open_fieldType_select(){
        this.$store.commit("fieldDetail/change_fieldType_modal_status")
    }

    async created(){
        let config = {
            params: {
                groupCodes:"market_field_type"
            }
        }
        let { market_field_type } = await commonApi.getDictionary(config)
        this.$store.commit("fieldDetail/set_fieldTypeList", market_field_type)
    }

    data_check(){
      let _self = this
      //  表单验证
      var descriptor = {
        // company: { type: "number", required: true, message: "请选择服务企业！"},
        type_typecode: { type: "string", required: true, message: "请选择外勤类型！"},
        img_array: { type: "array", required:true, message: "请选择照片！"},
        // addr: {type: "string", required:true, message: "获取定位失效，请重开窗口！"}
      }
      var validator = new schema(descriptor);
      validator.validate(
        {
        //   company: _self.company.companyid,
          type_typecode: _self.fieldType.typecode,
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
      formdata.append('companyId', _self.company.companyid)
      formdata.append('beginAddress', this.$store.state.fieldDetail.addr)
      formdata.append('customerId', _self.company.customerid)
      formdata.append('synergyFlag', _self.fieldType.typecode)
      formdata.append('beginMemo',_self.memo)
      for(let i = 0;i<_self.uploadImg.length;i++){
        formdata.append('files',_self.uploadImg[i],"file_" + new Date() + ".jpg")
      }
      try {
        let { status, data } = await clockApi.saveLegworkVisitMsg(formdata)
        if(status){
          console.log(data)
          _self.$toast.loading({
            message: "正在跳转至离开打卡界面...",
            duration: 1000
          })
          this.$store.commit("fieldDetail/remove_all")
          setTimeout(()=>{
            this.$router.push({
              name: "marketLeave"
            })
          }, 1000)
        }
      } catch (error) {
        console.log(error)
      }
      this.buttonLoading = false
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
</style>
