<template>
    <van-dialog
        :value="true"
        :show-confirm-button="false"
        :close-on-click-overlay="false"
        show-cancel-button
        @cancel="close"
    >

        <form action="/">
            <van-search placeholder="请输入会计名称搜索" v-model="accountName" @click="get_data"/>
        </form>
        <van-radio-group v-model="selectAccount">
            <van-cell-group>
              <!-- <van-cell v-for="item in workOrderList" :key="item.id" clickable @click="choose(item)">
                    <van-col span="22"><div>{{item.product}}</div></van-col>
                    <van-col span="2"><van-radio :name="item.id" /></van-col>
                </van-cell> -->
                <van-cell v-for="item in accountList" :key="item.id" @click="choose(item)" clickable>
                    <van-col span="22"><div>{{item.realname}}</div></van-col>
                    <van-col span="2"><van-radio :name="item.id" /></van-col>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import * as commonApi from '../../../api/common/index.js'

@Component
export default class accountList extends Vue{
  selectAccount = 0
  accountName = ""
  accountList = []

  @Watch('accountName', {immediate: true})
  async get_data(){
    let formdata = new FormData()
    formdata.append('realname', this.accountName)

    let { status, data } = await commonApi.getAccountList(formdata)
    if(status){
      this.accountList = data.data
    }
  }

  choose(item){
    this.$emit("change-account", item)
  }

  close(){
    this.$emit("close")
  }
}
// export default {
//     data(){
//         return {
//             searchaccountname:"",
//             type_open:false,
//             select_type_id:"",
//             account_list:[

//             ]
//         }
//     },
//     methods:{
//         search(){
//             let _self = this
//             let url = `api/legwork/apiCheckAccountMsg`
//             let formdata = new FormData()
//             formdata.append('realname',_self.searchaccountname)

//             this.$http.post(url, formdata).then(function(res){
//                 if(res.data.msgCode == "40000"){
//                     _self.account_list = res.data.data
//                 }else{
//                     _self.$toast.fail('系统错误！')
//                 }
//             }).catch(function(err){
//                 _self.$toast.fail('网络错误！')
//             })

//         },
//         //  点击全行选中
//         choose(e){
//             this.$bus.emit('update_account',e)
//             this.select_type_id = e.id
//             this.type_open = false
//         },

//     },
//     created(){
//         let _self = this
//         this.$bus.on('open_account_list',(e)=>{
//             _self.type_open = true
//             _self.search()
//         })
//     },
//     watch:{
//         'searchaccountname':'search'
//     }
// }
</script>
