<template>
    <van-dialog
        :value="fieldTypeModalStatus"
        :show-confirm-button="false"
        :close-on-click-overlay="false"
        show-cancel-button
        @cancel="close"
        >
        <van-radio-group :value="fieldType.typecode">
            <van-cell-group>
                <van-cell v-for="item in fieldTypeList" :key="item.id" clickable @click="choose(item)">
                    <van-col span="22"><div>{{item.typename}}</div></van-col>
                    <van-col span="2"><van-radio :name="item.typecode" /></van-col>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import * as commonApi from '../../../api/common/index.js'

@Component
export default class typeList extends Vue{
    get fieldTypeModalStatus(){
        return this.$store.state.fieldDetail.fieldTypeModalStatus
    }
    get fieldTypeList(){
        return this.$store.state.fieldDetail.fieldTypeList
    }
    get fieldType(){
        return this.$store.state.fieldDetail.fieldType
    }

    choose(type){
        this.$store.commit("fieldDetail/set_fieldType", type)
        this.$store.commit("fieldDetail/change_fieldType_modal_status")
    }

    close(){
        this.$store.commit("fieldDetail/change_fieldType_modal_status")
    }
}
</script>

