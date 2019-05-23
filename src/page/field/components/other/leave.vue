<template>
  <van-row style="overflow-x: hidden">
    <van-row style="padding-bottom:1.75rem">
      <!-- <van-nav-bar title="普通外勤打卡" /> -->
      <Xheader back="-1" title="外勤打卡"></Xheader>
      <local-init></local-init>
      <OngoingTask ref="OngoingTask"></OngoingTask>
      <!-- <van-row>
                    <center style="padding:20px;font-size: 16px">{{clockDetail.companyname}}</center>
                    <van-col span="12" offset="6" style="font-size: 16px">本次外勤时间：{{timeTamp}}</van-col>
      </van-row>-->
      <!-- <div style="width:80%;margin:auto;margin-top:20px">
                    <van-cell-group>
                        <van-field
                            v-model="remark"          /
                            type="textarea"
                            placeholder="本次外勤总结（必填）"
                            rows="3"
                            autosize
                        />
                    </van-cell-group>
      </div>-->
    </van-row>
    <van-tabbar style="margin-top:1.25rem;">
      <van-button
        type="primary"
        bottom-action
        style="font-size:20px;border-radius:5px"
        @click="data_check"
        :loading="buttonLoading"
      >{{legworkStatus=='begin'?'结束打卡':'上传图片'}}</van-button>
    </van-tabbar>
  </van-row>
</template>

<script lang="ts">
import uploadImg from "../common/main-components/uploadImg.vue";
import localInit from "../common/main-components/localInit.vue";
import OngoingTask from "../common/main-components/OngoingTask.vue";
import Xheader from "../../../../layouts/Xheader.vue";
import { Component, Vue, Watch, Mixins } from "vue-property-decorator";
import * as clockApi from "../../api/clock/index";
import * as commonApi from "../../api/common/index";
import schema from "async-validator";
import { constants } from "crypto";

@Component({
  components: {
    uploadImg,
    localInit,
    OngoingTask,
    Xheader
  }
})
export default class OtherLeave extends Vue {
  remark = "";
  buttonLoading: Boolean = false;
  timeTamp = "0时0分";
  clockDetail = {
    id: "",
    clocktime: ""
  };

  legworkStatus = localStorage.getItem("legwork_status");

  get uploadImg() {
    return this.$store.state.fieldDetail.uploadImg;
  }

  async data_check() {
    // let _self = this
    //  表单验证
    // var descriptor = {
    //   // remark: { type: "string", required: true, message: "请输入外勤总结！"},
    //   // img_array: { type: "array", required:true, message: "请选择照片！"},
    //   // addr: {type: "string", required:true, message: "获取定位失效，请重开窗口！"}
    // }
    // var validator = new schema(descriptor);
    //   validator.validate(
    //     {
    //       remark: _self.remark,
    //       img_array: _self.uploadImg,
    //       // addr: _self.$store.state.filedDetail.addr
    //     }, (errors, fields) => {
    //       if(errors) {
    //     _self.$toast.fail(errors[0].message)
    //   return 1;
    //     }else{
    //       _self.finish_clock_work()
    //     }
    //   }
    // );

    const { OngoingTask } = this.$refs;
    let taskData = JSON.parse(OngoingTask["legwork_task_json"]) || [];

    // 上传图片校验
    if (
      this.legworkStatus !== "begin" &&
      taskData.filter(v => {
        return !v.imgList.length;
      }).length
    ) {
      return this.$toast.fail("请上传图片");
    }

    // 描述内容校验

    if (
      taskData.filter(e => {
        if (e.required && !e.memo) {
          return true;
        }
      }).length
    ) {
      console.log(taskData);
      return this.$toast.fail("请填写任务描述原因");
    }

    let formdata = new FormData();
    formdata.append("legwork_id", OngoingTask["taskId"]);
    formdata.append(
      "legwork_task_json",
      JSON.stringify(
        taskData.map(v => {
          return { legwork_task_id: v.legwork_task_id, memo: v.memo };
        })
      )
    );
    // formdata.append("end_address", this.$store.state.fieldDetail.addr);
    formdata.append("end_address", this.$store.state.fieldDetail.addr);

    // let config = {
    //   legwork_id:65,
    //   legwork_task_json:this.$refs.OngoingTask.legwork_task_json,
    //   end_address:'广州'
    // }
    // console.log(config)

    try {
      let res = await commonApi.endLegwork(formdata);
      this.$toast.success('打卡成功');
      localStorage.getItem("legwork_status");
      localStorage.clear();
      setTimeout(() => {
        this.$router.push({
          path: "/myTask"
        });
      }, 500);
    } catch (error) {}
  }

  async handleStartWork() {
    let config = {
      task_ids: 65,
      files: this.$store.state.fieldDetail.uploadImg,
      begin_address: "广州"
    };
    let formdata = new FormData();
    this.$store.state.fieldDetail.uploadImg.forEach((e, i) => {
      formdata.append(
        "files",
        e,
        "file_" + i + new Date() + ".jpg"
      );
    });

    formdata.append("task_ids", "65");
    formdata.append("begin_address", "广州");

    let res = await commonApi.beginLegwork(config);
    console.log(formdata);
  }

  async finish_clock_work() {
    let _self = this;
    let formdata = new FormData();
    this.buttonLoading = true;
    formdata.append("id", this.clockDetail.id);
    formdata.append("address2", this.$store.state.fieldDetail.addr);
    formdata.append("remark", this.remark);
    for (let i = 0; i < this.uploadImg.length; i++) {
      formdata.append("file", this.uploadImg[i], "file_" + new Date() + ".jpg");
    }
    let { status, data } = await clockApi.saveLegworkLeaveVisitMsg(formdata);
    if (status) {
      console.log(data);
      this.$store.commit("fieldDetail/remove_all");
      this.$store.commit("fieldDetail/set_finalTime", this.timeTamp);
      setTimeout(() => {
        // this.$router.push({
        //   name:
        // });
      }, 500);
    }

    this.buttonLoading = false;
  }
  created() {
    // let { status, data } = await clockApi.queryUnfinishedPunchCard()
    // if(status){
    //   console.log(data.data.unfinishedPunchCard.date)
    //   this.clockDetail = data.data.unfinishedPunchCard.date
    //   let time = new Date(this.clockDetail.clocktime.replace(/\-/g, "/"))
    //   this.$store.commit("fieldDetail/update_clockTime", time)
    //   let time1 = setInterval(()=>{
    //     let now = new Date()
    //     let tampDateTime = new Date(now.getTime() - time.getTime())
    //     this.timeTamp = `${tampDateTime.getHours()-8>=0?tampDateTime.getHours()-8:tampDateTime.getHours()+16}时${tampDateTime.getMinutes()}分`
    //   },1000)
    //   this.$once('hook:beforeDestroy', () => {
    //     clearInterval(time1);
    //   })
    // }
  }
}
</script>

<style>
.select {
  color: rgba(214, 2, 2, 0.966);
}
#address .van-cell__value--alone {
  text-align: center;
}

.van-button--primary {
  background-color: rgba(199, 0, 0, 0.883) !important;
}
.upload {
  padding-bottom: 1.75rem;
}
</style>
