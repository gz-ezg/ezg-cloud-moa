<template>
    <van-dialog
        :value="true"
        :close-on-click-overlay="false"
        @confirm="close"
        >
        <van-checkbox-group v-model="selectArray">
            <van-cell-group>
                <van-cell v-for="(item, index) in nationLocalType" :key="item.id" :title="item.typename" @click="choose(index)" >
                    <van-checkbox :name="item" ref="checkboxes" />
                </van-cell>
            </van-cell-group>
        </van-checkbox-group>
    </van-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class nationTaxList extends Vue {
  selectArray = []
  nationLocalType:Array<Object> = [
    {
      id:1,
      typecode:"addedvaluetax",
      typename:"增值税"
    },
    {
      id:2,
      typecode:"Incometax",
      typename:"所得税"
    }
  ]
  choose(index) {
    this.$refs.checkboxes[index].toggle()
  }
  close(){
    this.$emit("change-nation", this.selectArray)
  }
}
</script>

