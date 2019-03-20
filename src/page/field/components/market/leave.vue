<template>
    <van-row style="overflow-x: hidden">
        <van-row style="padding-bottom:1.75rem">
            <van-nav-bar title="普通外勤打卡" />
                <local-init></local-init>
                <van-row>
                    <center style="padding:20px;font-size: 16px">{{clockDetail.companyname}}</center>
                    <van-col span="12" offset="6" style="font-size: 16px">本次外勤时间：{{timeTamp}}</van-col>
                </van-row>
								<div>
									<van-button 
										type="default" 
										v-for="(item,index) of buttonList"
										@click="choose_radio(index,item)"
										:class="index===current?'buttonCurrent':null"
										:key="index"
									>
										{{item.typename}}
									</van-button>
								</div>
                <div style="width:80%;margin:auto;margin-top:20px">
                    <van-cell-group>
                        <van-field
                          :value="fieldType.typename"
                          required
                          clearable
                          readonly
                          placeholder="请选择外勤结果"
                          @click.native="open_fieldType_select"
                        />
                        <van-field
                            required
                            v-model="remark"
                            type="textarea"
                            placeholder="本次外勤总结（必填）"
                            rows="3"
                            autosize
                        />
                    </van-cell-group>
                </div>
                <upload-img></upload-img>
        </van-row>
        <van-tabbar style="margin-top:1.25rem;">
            <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px" @click="data_check" :loading="buttonLoading">结束打卡</van-button>
        </van-tabbar>
    </van-row>
</template>

<script lang="ts">
import uploadImg from '../common/main-components/uploadImg.vue'
import localInit from '../common/main-components/localInit.vue'
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
import * as commonApi from '../../api/common/index'
import * as clockApi from '../../api/clock/index'
import schema from 'async-validator'

@Component({
    components: {
        uploadImg,
        localInit
    }
})
export default class marketLeave extends Vue {
  remark = ""
  buttonLoading:Boolean = false
  timeTamp = "0时0分"
	current = 0
	buttonType = ""
	buttonList = []
  clockDetail = {
    id: "",
    clocktime: ""
  }
	
	 get fieldType(){
    return this.$store.state.fieldDetail.fieldType
  }
	
  get uploadImg(){
    return this.$store.state.fieldDetail.uploadImg
  }
	
	choose_radio(index,item){
		this.current = index
		this.buttonType = item
		console.log(this.buttonType)
	}
	
  open_fieldType_select(){
    this.$store.commit("fieldDetail/change_fieldType_modal_status")
  }
  data_check(){
    let _self = this
            //  表单验证
    var descriptor = {
      remark: { type: "string", required: true, message: "请输入外勤总结！"},
      img_array: { type: "array", required:true, message: "请选择照片！"},
      // addr: {type: "string", required:true, message: "获取定位失效，请重开窗口！"}
    }
    var validator = new schema(descriptor);
      validator.validate(
        {
          remark: _self.remark,
          img_array: _self.uploadImg,
          // addr: _self.$store.state.filedDetail.addr
        }, (errors, fields) => {
          if(errors) {
        _self.$toast.fail(errors[0].message)
      return 1;
        }else{
          _self.finish_clock_work()
        }
      }
    );
  }

  async finish_clock_work(){
    let _self = this
    let formdata = new FormData()
    this.buttonLoading = true
    formdata.append('id', this.clockDetail.id)//id
		formdata.append('maintainResult', this.fieldType.typecode)//外勤结果
    formdata.append('endAddress', this.$store.state.fieldDetail.addr)//结束地址
    formdata.append('resultSummary', this.remark)//外勤总结
    formdata.append('legworkSubtype', this.buttonType.typecode)//外勤类型
    for(let i = 0;i<this.uploadImg.length;i++){
      formdata.append('files',this.uploadImg[i],"file_" + new Date() + ".jpg")//照片
    }
		try{
			console.log(formdata)
			let data = await clockApi.saveLegworkLeaveVisitMsg(formdata)
			console.log("data")
			console.log(data)
			if(data){
			  this.$store.commit("fieldDetail/remove_all")
			  this.$store.commit("fieldDetail/set_finalTime", this.timeTamp)
			  setTimeout(()=>{
			    this.$router.push({
			      name: "Success"
			    })
			  }, 500)
			}
		}catch(error){
			console.log(error)
		}
    this.buttonLoading = false
  }
  async created(){
    let data = await clockApi.queryUnfinishedPunchCard()
    if(data){
      // this.clockDetail = data.data.unfinishedPunchCard.date
			this.clockDetail = {id: data.id,clocktime: data.begin_time}
			
      let time = new Date(this.clockDetail.clocktime.replace(/\-/g, "/"))
      this.$store.commit("fieldDetail/update_clockTime", time)

      let time1 = setInterval(()=>{
        let now = new Date()
        let tampDateTime = new Date(now.getTime() - time.getTime())
        this.timeTamp = `${tampDateTime.getHours()-8>=0?tampDateTime.getHours()-8:tampDateTime.getHours()+16}时${tampDateTime.getMinutes()}分`
      },1000)

      this.$once('hook:beforeDestroy', () => {
        clearInterval(time1);
      })
    }

		let config = {
			params: {
			    groupCodes:"legwork_customer_maintain_type,market_status"
			}
		}
// 		外勤类型:button_status
// 		外勤结果:market_status
		let { button_status , market_status } = await commonApi.getDictionary(config)
		this.buttonList = button_status.legwork_customer_maintain_type
		this.$store.commit("fieldDetail/set_fieldTypeList", market_status)
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
