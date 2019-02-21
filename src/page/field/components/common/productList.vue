<template>
	<van-dialog v-model="type_open" :show-confirm-button="false" :close-on-click-overlay="true">
		<van-radio-group v-model="select_type_id">
			<van-cell-group>
				<van-cell v-for="item in product" :key="item.id" clickable @click="choose(item)">
					<van-col span="22">
						<div>{{item.typename}}</div>
					</van-col>
					<van-col span="2">
						<van-radio :name="item.typecode"/>
					</van-col>
				</van-cell>
			</van-cell-group>
		</van-radio-group>
	</van-dialog>
</template>

<script>
export default {
	data() {
		return {
			searchcompanyname: "",
			type_open: false,
			select_type_id: "",
			product: [
				{
					id: 5,
					typename: "无",
					typecode: "无"
				},
				{
					id: 1,
					typename: "代理记账",
					typecode: "代理记账",
				},
				{
					id: 2,
					typename: "审计报告",
					typecode: "审计报告",
				},
				{
					id: 3,
					typename: "科财顾问",
					typecode: "科财顾问"
				},
				{
					id: 4,
					typename: "内审",
					typecode: "内审"
				},
			]
			// companyList:""
		}
	},
	methods: {
		choose(e) {
			this.select_type_id = e.typecode
			// console.log(e)
			this.$bus.emit('update_product', e)
			this.type_open = false
		},
	},
	created() {
		let _self = this
		this.$bus.on('open_Product_list', (e) => {
			_self.type_open = true
		})
	},
	// watch:{
	//     'searchcompanyname':'search'
	// }
}
</script>

