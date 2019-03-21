<template>
    <van-row style="overflow-x: hidden">
        <van-row style="padding-bottom:1.75rem">
            <van-nav-bar title="普通外勤打卡" />
                <local-init></local-init>
                <van-row>
										<ul>
											<!-- legwork_work_order_id -->
											<li 
												ref="lis"
												style="display: flex; justify-content: space-between; font-size: 0.2rem;"
												v-for="(item,i) of clockDetail.detail"
											>
												<div class="left">
													<p class="companyName">{{item.companyname}}</p>
													<p class="workOrder">{{item.alisname}}</p>
												</div>
												<div class="right">
													<van-radio-group v-model="radio">
														<van-radio 
															v-for="radioItem of radioList"
															:name="radioItem.typecode"
															@click="chooseRadio(radioItem)"
														>
															{{radioItem.typename}}
														</van-radio>
													</van-radio-group>
												</div>
											</li>
										</ul>
									
                    <!-- <center style="padding:20px;font-size: 0.5rem">{{clockDetail.companyname}}</center>
                    <van-row>
											<van-col span="4" offset="4" style="font-size:0.3rem">工单内容：</van-col>
											<van-row>
												<van-col span="12" style="font-size:12px">{{clockDetail.productname}}</van-col>
											</van-row>
										</van-row> -->
                    <van-row style="margin-top:10px"><van-col span="6"  offset="4"  style="font-size:0.3rem">外勤类型：</van-col><van-col style="font-size:12px">{{clockDetail.assiststatus}}</van-col></van-row>
                    <van-row style="margin-top:10px"><van-col span="12" offset="6" style="font-size:0.4rem">本次外勤时间：{{timeTamp}}</van-col></van-row>
                </van-row>
                <!-- 国地税报道结果填写 -->
                <!-- <div style="width:80%;margin:auto;margin-top:10px" v-if="taxOpen">
                  <van-cell-group>
                    <van-field v-model="nationalnum" type="text" placeholder="国税账号"/>
                    <van-field v-model="nationalpsw" type="text" placeholder="国税密码"/>
                    <van-field v-model="LocalNationName" @click.native="openNationTaxType=true" placeholder="选择国税类型"/>
                  </van-cell-group>
                  <van-cell-group style="margin-top:10px">
                    <van-field v-model="Localnum" type="text" placeholder="地税账号"/>
                    <van-field v-model="Localpsw" type="text" placeholder="地税密码"/>
                    <van-field v-model="LocalTaxName" @click.native="openLocalTaxType=true" placeholder="选择地税类型"/>
                    </van-cell-group>
                </div> -->

                <!-- 社保结果填写 -->
                <!-- <div style="width:80%;margin:auto;margin-top:10px" v-if="socialsecurityOpen">
                  <van-cell-group>
                    <van-field v-model="socialsecuritypsw" type="text" placeholder="社保密码"/>
                    </van-cell-group>
                </div> -->

                <!-- 公积金结果填写 -->
                <!-- <div style="width:80%;margin:auto;margin-top:20px" v-if="providentfundOpen">
                  <van-cell-group>
                    <van-field v-model="Providentfundnum" type="text" placeholder="公积金账号"/>
                    <van-field v-model="Providentfundpsw" type="text" placeholder="公积金密码"/>
                    </van-cell-group>
                </div> -->
                <div style="width:80%;margin:auto;margin-top:20px">
                    <van-cell-group>
                        <!-- <van-field
                          :value="fieldType.typename"
                          required
                          clearable
                          readonly
                          placeholder="请选择外勤状态"
                          @click.native="open_fieldType_select"
                        /> -->
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
                <nation-tax-type v-if="openNationTaxType" @change-nation="change_nation" ></nation-tax-type>
                <local-tax-type v-if="openLocalTaxType" @change-local="change_local" ></local-tax-type>
        </van-row>
        <van-tabbar style="margin-top:1.25rem;">
            <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px" @click="data_check" :loading="buttonLoading">结束打卡</van-button>
        </van-tabbar>
    </van-row>
</template>

<script lang="ts">
import uploadImg from '../common/main-components/uploadImg.vue'
import localInit from '../common/main-components/localInit.vue'
import localTaxType from './localTaxType.vue'
import nationTaxType from './nationTaxType.vue'
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
import * as commonApi from '../../api/common/index'
import * as clockApi from '../../api/clock/index'
import schema from 'async-validator'

@Component({
    components: {
        uploadImg,
        localInit,
        localTaxType,
        nationTaxType
    }
})

export default class marketLeave extends Vue {
  selectLocalType = []
  selectNationType = []
  remark = ""
  buttonLoading:Boolean = false
  taxOpen: Boolean = false
  socialsecurityOpen: Boolean = false
  providentfundOpen: Boolean = false
  openLocalTaxType: Boolean = false
  openNationTaxType: Boolean = false
  timeTamp = "0时0分"
  clockDetail = {
    id: "",
    clocktime: "",
		detail:[]
//     assiststatus: "",
//     productname: "",
//     workorderid: ""
  }
	radioList = []
	radio = "valid"

  nationalnum = ''
  nationalpsw = ''
  NationTaxName = ''

  Localnum = ''
  Localpsw = ''

  socialsecuritypsw = ''

  Providentfundnum = ''
  Providentfundpsw = ''
  get LocalTaxName(){
    let temp = []
    temp = this.selectLocalType.map((item)=>{
      return item.typename
    })
    return temp.join(",")
  }

  get LocalNationName(){
    let temp = []
    temp = this.selectNationType.map((item)=>{
      return item.typename
    })
    return temp.join(",")
  }

  get uploadImg(){
    return this.$store.state.fieldDetail.uploadImg
  }

  get fieldType(){
    return this.$store.state.fieldDetail.fieldType
  }

	

  change_local(e){
    console.log(e)
    this.selectLocalType = e
    this.openLocalTaxType = false
  }
  change_nation(e){
    this.selectNationType = e
    this.openNationTaxType = false
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
    // formdata.append('id', this.clockDetail.id) //外勤打卡ID
    formdata.append('address2', this.$store.state.fieldDetail.addr) //结束地址
    formdata.append('remark', this.remark) //外勤总结
    formdata.append('resulttype', this.fieldType.typecode) //外勤类型
    for(let i = 0;i<this.uploadImg.length;i++){
      formdata.append('file',this.uploadImg[i],"file_" + new Date() + ".jpg") //照片
    }
		
		
		
		formdata.append('workOrderIdJson',{
			'workOrderId':_self.clockDetail.detail[i].legwork_work_order_id
			// 'status':
			})

//     if(this.taxOpen){
//       formdata.append('nationalnum', this.nationalnum)
//       formdata.append('nationalpsw', this.nationalpsw)
//       for(let i = 0; i< this.selectNationType.length; i++){
//         formdata.append(this.selectNationType[i].typecode, 'Y')
//       }
//       formdata.append('Localnum', this.Localnum)
//       formdata.append('Localpsw', this.Localpsw)
//       for(let i = 0; i< this.selectLocalType.length; i++){
//         formdata.append(this.selectLocalType[i].typecode, 'Y')
//       }
//     }
// 
//     if(_self.socialsecurityOpen){
//       formdata.append('socialsecuritypsw', this.socialsecuritypsw)
//     }
// 
//     if(_self.providentfundOpen){
//       formdata.append('Providentfundnum', this.Providentfundnum)
//       formdata.append('Providentfundpsw', this.Providentfundpsw)
//     }

    let { status, data } = await clockApi.saveLegworkLeaveVisitMsg(formdata)
    if(this.fieldType.typecode == 'hit' && this.clockDetail.workorderid){
      let config = {
        workOrderId: this.clockDetail.workorderid,
        backup: this.remark
      }
      try {
        let {status:statusFlow, data: dataFlow} = await clockApi.orderNext(config)
      } catch (error) {
        console.log(error)
      }
    }
    if(status){
      this.$store.commit("fieldDetail/remove_all")
      this.$store.commit("fieldDetail/set_finalTime", this.timeTamp)
      setTimeout(()=>{
        this.$router.push({
          name: "Success"
        })
      }, 500)
    }

    this.buttonLoading = false
  }
  async created(){
// 		let aaa = await clockApi.aaa()
// 		let bbb = await clockApi.bbb()
// 		console.log("aaa")
// 		console.log(aaa)
// 		console.log("bbb")
// 		console.log(bbb)
		
		
    let data = await clockApi.queryUnfinishedPunchCard()
		console.log("data")
		console.log(data)
    if(data){
      // this.clockDetail = data.data.unfinishedPunchCard.date
			this.clockDetail = {id: data.id,clocktime: data.begin_time,detail:data.detail}
//       if(this.clockDetail.assiststatus == 'Y'){
//         this.clockDetail.assiststatus = "协助外勤"
//       }else{
//         this.clockDetail.assiststatus = "非协助外勤"
//       }

//       if(this.clockDetail.productname){
//         if(this.clockDetail.productname.match("国地税报道") != null){
//           this.taxOpen = true
//         }
//         if(this.clockDetail.productname.match("社保开户") != null){
//           this.socialsecurityOpen = true
//         }
//         if(this.clockDetail.productname.match("公积金开户") != null){
//           this.providentfundOpen = true
//         }
//       }
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
            groupCodes:"commercial_status"
        }
    }
    let {commercial_status} = await commonApi.getDictionary(config)
		this.radioList = commercial_status
		console.log("radioList")
		console.log(this.radioList)
    // this.$store.commit("fieldDetail/set_fieldTypeList", commercial_status)
		
		console.log(this.$refs.lis)
		
  }
	async mounted(){
		console.log("aaaaa")
		console.log(document.querySelectorAll(".van-radio__icon--checked"))
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
