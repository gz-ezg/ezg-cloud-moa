<template>
    <div>
        <div style="width:80%;margin:auto;margin-top:0.5rem">
            <center>
                <van-uploader accept="image/*" :before-read="upload" capture="camera" style="display:flex;justify-content:center;align-items:center">
                    <van-icon name="photograph" style="font-size:0.5rem;line-height:0.5rem" /><span style="font-size:0.333rem;line-height:0.333rem;padding-left:0.2rem">点击拍摄照片</span>
                </van-uploader>
            </center>
        </div>
        <div style="margin-top:0.333rem">
            <van-row>
                <van-col v-for="(item,index) in showImg" :key="index" style="margin-left:3px;margin-right:3px">
                    <div class="img-content" >
                      <img :src="item.src" alt="Ballade" style="width: 100px;height:100px"/>
                      <van-button type="default" size="mini" style="margin-top:4px" @click="remove(index)">移除</van-button>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { yasuo } from './img_beforeUpload'

@Component
export default class uploadImg extends Vue {
    async upload(e){
        let _self = this
        let img = await yasuo(e)//压缩图片
        this.$store.commit("fieldDetail/push_upload_img", img)
        let reader = new FileReader()
        reader.readAsDataURL(e)
        let filename = e.name
        reader.onload = function(e){
            var imgMsg = {
                name:filename,
                src:this.result
            }
            _self.$store.commit("fieldDetail/push_img", imgMsg)
        }
    }
    get showImg(){
        return this.$store.state.fieldDetail.showImg
    }
    remove(index){
      this.$store.commit("fieldDetail/remove_upload_img", index)
    }
}
</script>

<style>
.img-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
</style>
