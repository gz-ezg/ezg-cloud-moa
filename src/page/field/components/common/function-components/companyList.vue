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
// 	get companyList(){
// 		return this.$store.state.fieldDetail.companyList
// 	}

    get selectCompany(){
        return this.$store.state.fieldDetail.company
    }

    get OpenCompany(){
        return this.$store.state.fieldDetail.companyModalStatus
    }

    choose(company){
        this.$store.commit("fieldDetail/change_company_modal_status")
		if(company.companyname != "空"){
			this.$store.commit("fieldDetail/set_company", company)
			this.$store.commit("fieldDetail/set_company_ID", company.id)
			this.$store.commit("fieldDetail/set_customer_ID", company.customerId)
		}else{
			let customer = this.$store.state.fieldDetail.customer
			// console.log(customer)
			this.$store.commit("fieldDetail/set_company",{companyname:'空',id:'',customerName:customer.NAME,id:customer.ID})
		}
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
				pageSize: 4,
                companyname: this.searchCompanyname,
				customerId:this.customerId
            }
        }
        let {rows, total } = await commonApi.fieldCompanyList(config)
//      this.companyList = rows
// 		this.$store.commit("fieldDetail/set_company_list",rows)
// 		this.companyList.push({companyname:'空',id:''})
		
		this.companyList = rows
		this.companyList.push({companyname:'空',id:''})
    }

    
}
</script>

<style>
.van-field__clear, .van-field__icon{
    margin-right:0px
}
</style>
