<template>
    <van-dialog
        :value="true"
        :show-confirm-button="false"
        :close-on-click-overlay="false"
        show-cancel-button
        @cancel="close"
        >
        <van-radio-group v-model="selectWorkOrder">
            <van-cell-group>
                <van-cell v-for="item in workOrderList" :key="item.id" clickable @click="choose(item)">
                    <van-col span="22"><div>{{item.product}}</div></van-col>
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
export default class workOrderList extends Vue{
  @Prop() companyId
  @Prop() select

  selectWorkOrder = ""
  workOrderList = []

  async get_data(){
    let formdata = new FormData()
    formdata.append('companyid', this.companyId)

    let { status, data } = await commonApi.getWorkOrderByCompanyId(formdata)
    if(status){
      this.workOrderList = data.data
      this.workOrderList.push({product:"空",id:""})
      this.selectWorkOrder = this.select.id
    }
  }

  choose(item){
    this.$emit("chooseWordOrder", item)
  }

  close(){
    this.$emit("close")
  }

  created() {
    this.get_data()
  }
}

</script>

<style>
    .van-field__clear, .van-field__icon{
        margin-right:0px
    }
</style>
