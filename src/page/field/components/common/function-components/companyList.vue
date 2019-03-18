<template>
    <van-dialog
        :value="OpenCompany"
        :show-confirm-button="false"
        :close-on-click-overlay="false"
        show-cancel-button
        @cancel="close"
        >
        <form action="/">
            <van-search placeholder="请输入公司名称搜索" v-model="searchCompanyname" @click="get_data"/>
        </form>
        <van-radio-group :value="selectCompany.id">
            <van-cell-group>
                <van-cell v-for="item in companyList" :key="item.id" clickable @click="choose(item)">
                    <van-col span="22"><div>{{item.companyname}}</div></van-col>
                    <van-col span="2"><van-radio :name="item.id" /></van-col>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import * as commonApi from '../../../api/common/index.js'

//  枚举类型
// enum Color {Red, Green, Blue}

@Component
export default class companyList extends Vue{
    searchCompanyname:String = ""
    companyList:Array<Object> = []

    get selectCompany(){
        return this.$store.state.fieldDetail.company
    }

    get OpenCompany(){
        return this.$store.state.fieldDetail.companyModalStatus
    }

    choose(company){
		console.log(company)
        this.$store.commit("fieldDetail/set_company", company)
        this.$store.commit("fieldDetail/change_company_modal_status")
    }

    close(){
        this.$store.commit("fieldDetail/change_company_modal_status")
		this.$store.commit("fieldDetail/remove_customer_ID")
    }
	get customerId(){
		// return this.$store.state.customerID
		return this.$store.state.fieldDetail.customerID
    }
    
    @Watch('searchCompanyname', {immediate: true})
    @Watch('customerId', {immediate: true})
    async get_data(){
        let config = {
            params: {
				page: 1,
				pageSize: 5,
                companyname: this.searchCompanyname,
				customerId:this.customerId
            }
        }
        let {rows, total } = await commonApi.fieldCompanyList(config)
        this.companyList = rows
    }

    
}
</script>

<style>
.van-field__clear, .van-field__icon{
    margin-right:0px
}
</style>
