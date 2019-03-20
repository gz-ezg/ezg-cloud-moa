<template>
    <van-dialog
        :value="OpenCustomer"
        :show-confirm-button="false"
        :close-on-click-overlay="false"
        show-cancel-button
        @cancel="close"
        >
        <form action="/">
            <van-search placeholder="请输入客户名称或电话" v-model="searchParams" @click="get_data"/>
        </form>
        <van-radio-group :value="selectCustomer.ID">
            <van-cell-group>
                <van-cell v-for="item in customerList" :key="item.id" clickable @click="choose(item)">
                    <van-col span="22"><div>{{item.NAME}}</div></van-col>
                    <van-col span="2"><van-radio :name="item.ID" /></van-col>
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
    searchParams = ""
    customerList:Object[] = []
// 	get customerList(){
// 		 return this.$store.state.fieldDetail.customerList
// 	}

    get selectCustomer(){
		// console.log(this.$store.state.fieldDetail.customer)
        return this.$store.state.fieldDetail.customer
    }

    get OpenCustomer(){
        return this.$store.state.fieldDetail.customerModalStatus
    }

    choose(customer){
		this.$store.commit("fieldDetail/set_customer", customer)
		this.$store.commit("fieldDetail/change_customer_modal_status")
		
        if(customer.NAME != "空"){
			this.$store.commit("fieldDetail/change_company_modal_status")
			this.$store.commit("fieldDetail/change_customer_ID",customer.ID)
		}else{
			console.log(customer)
			this.$store.commit("fieldDetail/set_company",{companyname:'空',id:'',customerName:'空',id:''})
		}
    }

    close(){
        this.$store.commit("fieldDetail/change_customer_modal_status")
    }

    @Watch('searchParams', {immediate: true})
    async get_data(){
        let config = {
            params: {
                telOrName: this.searchParams,
				page: 1,
				pageSize: 4,
            }
        }
        let {rows} = await commonApi.fieldCustomerList(config)
        this.customerList = rows
		// this.$store.commit("fieldDetail/set_customer_list",rows)
		this.customerList.push({NAME:'空',ID:''})
    }
}
</script>

<style>
.van-field__clear, .van-field__icon{
    margin-right:0px
}
</style>
