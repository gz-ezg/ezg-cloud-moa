<template>
	<van-row style="overflow-x: hidden">
		<van-row style="padding-bottom:1.75rem">
			<van-nav-bar title="普通外勤打卡" />
			<local-init></local-init>
			<van-row>
				<van-cell-group 
					style="width: 80%;margin:0.3rem auto; padding:0.3rem 0;display: flex; justify-content: space-between; font-size: 0.2rem;" 
					v-for="(item,i) of workOrderList"
				>
					<div class="left" style="text-align: left;">
						<p class="companyName">{{item.companyname}}</p>
						<p class="workOrder">{{item.alisname}}</p>
					</div>
					<div class="right" style="text-align: center;">
						<van-button 
							style="display: block; margin: 0 auto;" 
							round 
							:type="index===current && item.legwork_work_order_id === group?'primary':'default'" 
							size="mini" 
							v-for="(radioItem,index) of radioList"
							:key="radioItem.typecode"
							@click="choose(i,radioItem.typecode,index)"
						>
							{{radioItem.typename}}
						</van-button>
					</div>
				</van-cell-group>
				<!-- <ul>
					<li ref="lis" >
						
					</li>
				</ul> -->

				<van-row style="margin-top:10px">
					<van-col style="font-size:12px">{{clockDetail.assiststatus}}</van-col>
				</van-row>
				<van-row style="margin-top:10px">
					<van-col span="12" offset="6" style="font-size:0.4rem">本次外勤时间：{{timeTamp}}</van-col>
				</van-row>
			</van-row>

			<div style="width:80%;margin:auto;margin-top:20px">
				<van-cell-group>

					<van-field required v-model="remark" type="textarea" placeholder="本次外勤总结（必填）" rows="3" autosize />
				</van-cell-group>
			</div>
			<upload-img></upload-img>
			<nation-tax-type v-if="openNationTaxType" @change-nation="change_nation"></nation-tax-type>
			<local-tax-type v-if="openLocalTaxType" @change-local="change_local"></local-tax-type>
		</van-row>
		<van-tabbar style="margin-top:1.25rem;">
			<van-button type="primary" bottom-action style="font-size:20px;border-radius:5px" @click="data_check" :loading="buttonLoading">结束打卡</van-button>
		</van-tabbar>
	</van-row>
</template>

<script lang="ts">
	import uploadImg from '../common/main-components/uploadImg.vue'
	import localInit from '../common/main-components/localInit.vue'
	import localTaxType from './localTaxType.vue'
	import nationTaxType from './nationTaxType.vue'
	import {
		Component,
		Vue,
		Watch,
		Mixins
	} from 'vue-property-decorator'
	import * as commonApi from '../../api/common/index'
	import * as clockApi from '../../api/clock/index'
	import schema from 'async-validator'

	@Component({
		components: {
			uploadImg,
			localInit,
			localTaxType,
			nationTaxType
		}
	})

	export default class marketLeave extends Vue {
		selectLocalType = []
		selectNationType = []
		remark = ""
		buttonLoading: Boolean = false
		taxOpen: Boolean = false
		socialsecurityOpen: Boolean = false
		providentfundOpen: Boolean = false
		openLocalTaxType: Boolean = false
		openNationTaxType: Boolean = false
		timeTamp = "0时0分"
		clockDetail = {
			id: "",
			clocktime: "",
			detail: []
		}

		workOrderList = []
		arr = []

		radioList = []


		radio = "valid"

		nationalnum = ''
		nationalpsw = ''
		NationTaxName = ''

		Localnum = ''
		Localpsw = ''

		socialsecuritypsw = ''

		Providentfundnum = ''
		Providentfundpsw = ''
		current = Number
		group = Number
		typestatus = ''

		get uploadImg() {
			return this.$store.state.fieldDetail.uploadImg
		}

		get fieldType() {
			return this.$store.state.fieldDetail.fieldType
		}
		

		choose(i,typecode,index){
			this.workOrderList[i].status = typecode
			this.current = index
			this.typestatus = typecode
			this.group = this.workOrderList[i].legwork_work_order_id
			console.log("this.workOrderList.legwork_work_order_id")
		}
		change_local(e) {
			console.log(e)
			this.selectLocalType = e
			this.openLocalTaxType = false
		}
		change_nation(e) {
			this.selectNationType = e
			this.openNationTaxType = false
		}
		open_fieldType_select() {
			this.$store.commit("fieldDetail/change_fieldType_modal_status")
		}
		data_check() {
			let _self = this

			//  表单验证
			var descriptor = {
				typestatus:{
					required:true,
					message:"请选择外勤状态！"
				},
				remark: {
					type: "string",
					required: true,
					message: "请输入外勤总结！"
				},
				img_array: {
					type: "array",
					required: true,
					message: "请选择照片！"
				}
				// addr: {type: "string", required:true, message: "获取定位失效，请重开窗口！"}
			}
			var validator = new schema(descriptor);
			validator.validate({
				remark: _self.remark,
				img_array: _self.uploadImg,
				typestatus:_self.typestatus
				// addr: _self.$store.state.filedDetail.addr
			}, (errors, fields) => {
				if (errors) {
					_self.$toast.fail(errors[0].message)
					return 1;
				} else {
					_self.finish_clock_work()
				}
			});
		}

		async finish_clock_work() {
			let _self = this

			for (let i = 0; i < _self.workOrderList.length; i++) {
				let {
					legwork_work_order_id: workOrderId,
					status: status
				} = _self.workOrderList[i]

				console.log("{workOrderId,status}")
				console.log({
					workOrderId,
					status
				})
				console.log(workOrderId)
				_self.arr.push({
					workOrderId,
					status
				})
			}


			let formdata = new FormData()
			this.buttonLoading = true
			formdata.append('id', this.clockDetail.id) //外勤打卡ID
			formdata.append('endAddress', this.$store.state.fieldDetail.addr) //结束地址
			formdata.append('remark', this.remark) //外勤总结
			for (let i = 0; i < this.uploadImg.length; i++) {
				formdata.append('files', this.uploadImg[i], "file_" + new Date() + ".jpg") //照片
			}

			formdata.append('workOrderIdJson', JSON.stringify(_self.arr))//工单id和状态


			let data = await clockApi.saveLegworkLeaveMsgWorkOrder(formdata)
			this.$store.commit("fieldDetail/remove_all")
			this.$store.commit("fieldDetail/set_finalTime", this.timeTamp)
			if (data) {
				setTimeout(() => {
					this.$router.push({
						name: "Success"
					})
				}, 500)
			}

			this.buttonLoading = false
		}
		async created() {
			let data = await clockApi.queryUnfinishedPunchCard()
			if (data) {
				this.workOrderList = data.detail
				this.workOrderList.forEach(function(item, i) {
					item["status"] = false
				})

				this.clockDetail = {
						id: data.id,
						clocktime: data.begin_time,
						detail: data.detail
					}

				let time = new Date(this.clockDetail.clocktime.replace(/\-/g, "/"))
				this.$store.commit("fieldDetail/update_clockTime", time)

				let time1 = setInterval(() => {
					let now = new Date()
					let tampDateTime = new Date(now.getTime() - time.getTime())
					this.timeTamp =
						`${tampDateTime.getHours()-8>=0?tampDateTime.getHours()-8:tampDateTime.getHours()+16}时${tampDateTime.getMinutes()}分`
				}, 1000)

				this.$once('hook:beforeDestroy', () => {
					clearInterval(time1);
				})
			}
			let config = {
				params: {
					groupCodes: "commercial_status"
				}
			}
			let {
				commercial_status
			} = await commonApi.getDictionary(config)
			this.radioList = commercial_status

		}
	}
</script>

<style>
	.select {
		color: red
	}

	#address .van-cell__value--alone {
		text-align: center
	}

	.current {
		background: red;
	}
</style>
