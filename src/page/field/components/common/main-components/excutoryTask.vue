<template>
  <div>
    <ul class="excutoryTask">
      <li v-for="(item,i) in list" :key="i">
        <div class="checkbox"></div>
        <div class="li_title">{{item.taskKindName+'-'+item.taskName}}</div>
        <div class="li_con">{{item.companyName?item.companyName:item.taskContent}}</div>
        <div class="li_btn" @click="btn_click(item.taskId)">详情</div>
        <div class="li_process">{{item.followResultName}}</div>
      </li>
    </ul>
    <van-dialog
      v-model="showDialog"
      :title="taskPropertyDetail.taskName"
      @confirm="deleteTask(taskPropertyDetail.taskId)"
      show-cancel-button
      confirm-button-text="删除任务"
    >
      <ul class="taskDetail">
        <li>任务时间：{{taskPropertyDetail.planDate}}</li>
        <li>任务内容：{{taskPropertyDetail.taskContent}}</li>
        <li>任务类型：{{taskPropertyDetail.taskKindName}}</li>
      </ul>
    </van-dialog>
  </div>
</template>
<script>
import * as commonApi from "../../../api/common/index.js";
import { async } from "q";
export default {
  data() {
    return {
      showDialog: false,
      taskPropertyDetail: {},
      list: [
        // {
        //   taskId:347,
        //   taskName:"123456789",
        //   taskKind:"tkLegBus",
        //   taskKindName:"商事外勤",
        //   taskContent:"123456789",
        //   companyName:"广州云馨心理卫生服务中心有限公司"
        // }
      ],
      selectedId: []
    };
  },
  computed: {},
  methods: {
    get_selected() {
      this.selectedId = this.$store.state.myTaskDetail.selected;
    },
    async get_list() {
      let config = {
        params: {
          taskId: this.selectedId.join(",")
        }
      };
      let res = await commonApi.getTaskPropertyDetailByTaskId(config);
      this.list = res;
    },
    async btn_click(taskId) {
      let res = await this.show_taskPropertyDetailByTaskId(taskId);
      this.showDialog = true;
    },

    deleteTask(id) {
      this.$store.commit("myTaskDetail/set_selected", id);
      this.get_selected();
      this.get_list();
    },
    //获取任务详情并展示
    async show_taskPropertyDetailByTaskId(taskId) {
      const config = {
        params: {
          taskId: taskId
        }
      };
      let res = await commonApi.getTaskPropertyDetailByTaskId(config);
      this.taskPropertyDetail = JSON.parse(JSON.stringify(res[0]));
      console.log(this.taskPropertyDetail);
    }
  },
  async created() {
    this.get_selected();
    let config = {
      params: {
        taskId: this.selectedId.join(",")
      }
    };
    let res = await commonApi.getTaskPropertyDetailByTaskId(config);

    this.list = res;
  }
};
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  transition: all 0.2s ease;
}
.excutoryTask {
  padding: 0.4rem 0.2rem 0.4rem 0.2rem;
  li {
    border-radius: 0.15rem;
    width: 100%;
    height: 2.1rem;
    overflow: hidden;
    /* background-color: rgb(255, 0, 170); */
    padding: 0.3rem 0.5rem 0 0.3rem;
    font-size: 0.4rem;
    text-align: left;
    background-color: rgb(255, 255, 255);
    margin-bottom: 0.25rem;
    position: relative;
    .li_title {
      width: 80%;
      height: 0.8rem;
      font-size: 0.5rem;
      font-weight: 600;
      line-height: 0.8rem;
      overflow: hidden;
      padding: 0 0 0 0.2rem;
      /* background-color: skyblue; */
    }
    .li_con {
      width: 80%;
      height: 0.95rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-height: 0.65rem;
      overflow: hidden;
      border-top: 1px solid rgb(204, 204, 204);
      padding: 0.2rem 0.2rem 0.15rem 0.15rem;
    }
    .li_btn {
      position: absolute;
      right: 0.1rem;
      top: 0.6rem;
      width: 1.5rem;
      height: 0.7rem;
      line-height: 0.7rem;
      /* border: 0.03rem solid rgb(214, 54, 5); */
      border-radius: 0.5rem;
      text-align: center;
      /* color: rgb(214, 54, 5); */
      background-color: rgb(214, 54, 5);
      color: #fff;
    }
    .li_state {
      position: absolute;
      right: 2rem;
      top: 0.2rem;
      width: 2rem;
      height: 0.8rem;
      // background-color: pink;
      color: rgb(51, 179, 0);
      font-weight: 600;
      text-align: center;
      line-height: 1rem;
      font-size: 0.5rem;
    }
    .li_process {
      position: absolute;
      right: 0.3rem;
      top: 1.4rem;
      color: #000;
      font-size: 0.4rem;
    }
  }
}
.taskDetail {
  margin-bottom: 0.7rem;
  padding-left: 1rem;
  padding-top: 0.7rem;
  li {
    text-align: left;
    height: 0.7rem;
    line-height: 0.7rem;
    overflow: hidden;
  }
}
</style>
