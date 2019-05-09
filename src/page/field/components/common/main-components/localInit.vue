<template>
  <div style="background-color:#fff">
    <div style="width:80%;margin:auto;margin-top:1rem" @click="get_wx_local">
      <van-cell-group v-if="localLoading">
        <center style="padding:0.25rem"><van-loading type="spinner" size="30px" /></center>
      </van-cell-group>
      <van-cell-group v-else>
        <center style="padding-top:0.5rem;display: flex;justify-content:center;align-items:center;"><van-icon name="aim" style="padding-right:0.1333rem;font-size:0.5rem"/><span style="font-size:0.333rem">当前定位地址</span></center>
        <van-cell :value="addr"  style="text-align:center" id="address"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { yasuo } from './img_beforeUpload'
import * as commonApi from '../../../api/common/index.js'

@Component
export default class localInit extends Vue {
  localLoading: boolean = false
  returnNumber = 0
  get addr(){
    return this.$store.state.fieldDetail.addr
  }

  async wx_init(){
    let _self = this
      let config = {
        params:{
            agentId: "1000028",
            url: location.href.split('#')[0]
          }
      }
      let data = await commonApi.getWxTicker(config)
      wx.config({
        beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx7666e5cbbd22b505', // 必填，企业微信的corpID
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.sign,// 必填，签名，见附录1
        jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.error(function(res){
        console.log(res)
        _self.$toast.fail(res.errMsg)
        _self.returnNumber = _self.returnNumber + 1
        if(_self.returnNumber < 5){
          _self.wx_init()
        }else{
          _self.$toast.fail("js-sdk异常，已超过最大重试次数 ！")
        }
      });
  }

  get_wx_local(){
      let _self = this
      _self.localLoading = true
      wx.ready(function(){
          wx.getLocation({
              type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02',兼容腾讯地图
              success: function (res) {
                _self.get_real_name(res)
              }
          });
      });
    }
  async get_real_name(res){
      let _self = this
      var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      var speed = res.speed; // 速度，以米/每秒计
      var accuracy = res.accuracy; // 位置精度

      let config = {
        params:{
            lat: latitude,
            lng: longitude
        }
      }

      let data = await commonApi.getRealAdd(config)
      this.localLoading = false
      let temp = JSON.parse(data)
      console.log(temp)
      if(temp.result.hasOwnProperty("formatted_addresses")){
        this.$store.commit("fieldDetail/update_addr", temp.result.address + `(${temp.result.formatted_addresses.recommend})`)
      }else{
        this.$store.commit("fieldDetail/update_addr", temp.result.address)
      }
    }

    async created() {
    try {
      await this.wx_init()
      await this.get_wx_local()
    } catch (error) {
      this.$toast.fail("获取地址失败！请退出重试！")
    }
  }
}
</script>

<style>

</style>
