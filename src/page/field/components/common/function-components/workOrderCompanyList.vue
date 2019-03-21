<template>
    <van-dialog
        :value="OpenWorkOrderCompany"
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
// 	get companyList(){
// 		return this.$store.state.fieldDetail.companyList
// 	}

    get selectCompany(){
        return this.$store.state.fieldDetail.workOrderCompany
    }

    get OpenWorkOrderCompany(){
        return this.$store.state.fieldDetail.workOrderCompanyModalStatus
    }

    choose(company){
        this.$store.commit("fieldDetail/change_workOrder_company_modal_status")
		this.$store.commit("fieldDetail/set_workOrder_company", company)
		this.$store.commit("fieldDetail/add_workOrderList", company)
    }

    close(){
        this.$store.commit("fieldDetail/change_workOrder_company_modal_status")
    }

    
    @Watch('searchCompanyname', {immediate: true})
    async get_data(){
        try{
        	let config = {
        	    params: {
        			page: 1,
        			pageSize: 5,
        	        companyname: this.searchCompanyname
        	    }
        	}
        	let {rows , total} = await commonApi.fieldWorkOrderCompanyList(config)
        	this.companyList = rows
			// console.log(rows)
        }catch(e){
			console.log("error")
        	console.log(e)
        }
    }

    
}
</script>

<style>
.van-field__clear, .van-field__icon{
    margin-right:0px
}
</style>
