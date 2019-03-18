<template>
    <van-row style="overflow-x: hidden">
        <van-row style="padding-bottom:80px">
            <van-nav-bar title="商事协助外勤" />
                <div style="width:80%;margin:auto;margin-top:2rem">
                    <van-cell-group>
                        <van-cell>
                            <center style="padding:10px;font-size:16px">{{fieldDetail.companyname}}</center>
                        </van-cell>
                        <van-cell>
                            <van-row style="margin-top:10px"><van-col span="12">外勤类型：</van-col><van-col>协助外勤</van-col></van-row>
                        </van-cell>
                        <van-cell>
                            <van-row style="margin-top:10px"><van-col span="12">本次外勤时间：</van-col><van-col span="9">{{fieldDetail.fieldlength}}</van-col></van-row>
                        </van-cell>
                        <van-cell>
                            <van-row style="margin-top:10px"><van-col span="12">外勤人员：</van-col><van-col span="9">{{fieldDetail.realname}}</van-col></van-row>
                        </van-cell>
                    </van-cell-group>
                </div>
                <div style="width:80%;margin:auto;margin-top:20px">
                    <van-cell-group>
                        <van-cell>
                            <van-radio-group v-model="status">
                                <van-col span="12"><van-radio name="invalid">无效</van-radio></van-col>
                                <van-col span="12"><van-radio name="hit">命中</van-radio></van-col>
                            </van-radio-group>
                        </van-cell>
                    </van-cell-group>
                </div>
        </van-row>
        <van-tabbar style="margin-top:30px;">
            <van-button type="primary" bottom-action style="font-size:20px;border-radius:5px" @click="submit" :loading="buttonLoading">确定</van-button>
        </van-tabbar>
    </van-row>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import * as clockApi from '../../api/clock/index';
import { Toast } from 'vant';

@Component
export default class accountComfirm extends Vue {
    fieldDetail = {
        id: ""
    }
    status = "hit"
    buttonLoading: Boolean = false
    
    async get_data(){
        let {status, data} = await clockApi.getAccountAffirmLegworkMsg()
        if(status){
            this.fieldDetail = data.data.unfinishedPunchCard.date || {}
            Toast.clear()
        }
    }

    async submit(){
        let _self = this
        this.buttonLoading = true
        let formdata = new FormData()
        formdata.append('id', this.fieldDetail.id)
        formdata.append('kjaffirmstatus',this.status)

        let {status, data} = await clockApi.saveAccountAffirmLegworkMsg(formdata)
        if(status){
            setTimeout(()=>{
                this.$router.push({
                name:'comfirmsuccess'
                })
            }, 500)
        }

        this.buttonLoading = false
    }
  created(){
      Toast.loading({
          duration: 0,
          message: "加载中..."
      })
      this.get_data()
  }
}

</script>

<style>

</style>
