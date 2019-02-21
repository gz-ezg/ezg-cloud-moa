<template>
    <van-dialog
        :value="OpenCustomer"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
        show-cancel-button
        @cancel="close"
        >
        <form action="/">
            <van-search placeholder="请输入公司名称搜索" v-model="searchCompanyname" @click="get_data"/>
        </form>
        <van-radio-group :value="selectCompany.companyid">
            <van-cell-group>
                <van-cell v-for="item in companyList" :key="item.companyid" clickable @click="choose(item)">
                    <van-col span="22"><div>{{item.name}}</div></van-col>
                    <van-col span="2"><van-radio :name="item.companyid" /></van-col>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import * as commonApi from '../../../api/common/index.js'

@Component
export default class customerList extends Vue{
    searchCompanyname:String = ""
    companyList:Object[] = []

    get selectCompany(){
        return this.$store.state.fieldDetail.company
    }

    get OpenCustomer(){
        return this.$store.state.modalStatus.customerModalStatus
    }

    choose(company){
        this.$store.commit("set_company", company)
        this.$store.commit("change_customer_modal_status")
    }

    close(){
        this.$store.commit("change_customer_modal_status")
    }

    @Watch('searchCompanyname', {immediate: true})
    async get_data(){
        let config = {
            params: {
                companyname: this.searchCompanyname
            }
        }
        let data = await commonApi.fieldCompanyList(config)
        this.companyList = data
    }
}
</script>

<style>
.van-field__clear, .van-field__icon{
    margin-right:0px
}
</style>
