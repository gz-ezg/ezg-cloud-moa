<template>
  <div class="main" style="padding-top:1.2rem;">
    <!-- <van-nav-bar title="我的任务" left-arrow @click-left="$backTo(-1)"/> -->
    <Xheader back="-1" title="外勤打卡"/>
    <Mtab
      :remainingTaskCount="remainingTaskCount"
      :finishTaskCount="finishTaskCount"
      style="position:fixed;top:1.2rem;left:0;width:100%;z-index:5"
    />
    <!-- 今日剩余 -->
    <ul class="remainingTask" v-show="get_tab==='remainingTask'?true:false">
      <li
        v-for="(item,i) in remainList"
        :key="i"
        @click="select(item.taskId)"
        :class="selected.indexOf(item.taskId)===-1?'':'selected'"
      >
        <!-- 点击选中即commit vuex -->
        <div class="checkbox"></div>
        <div v-if="!!item.productName" class="li_title">{{item.productName}}</div>
        <div v-else class="li_title">{{item.taskKindName+'-'+item.taskName}}</div>
        <div class="li_con">{{item.companyName?item.companyName:item.taskContent}}</div>
        <div v-if="item.follow_result_name" class="li_process">{{item.follow_result_name}}</div>
        <div v-if="!item.follow_result_name" class="li_process">{{item.taskKindName}}</div>
        <div class="li_btn" @click="btn_click(item.taskId,'')" @click.stop>详情</div>
        <!-- 点击详情可以展示详情页面 -->
      </li>
      <div class="btn" :class="btnActive?'btnActive':''" @click="btnActive && start()">去完成</div>
      <!-- 去完成即将任务进入待开始打卡 -->
    </ul>

    <!-- 今日完成任务 -->
    <ul class="finishTask" v-show="get_tab==='finishTask'?true:false">
      <li v-for="(item,i) in finishList" :key="i">
        <div class="li_title">{{item.task_name}}</div>
        <div class="li_con">{{item.task_content}}</div>
        <div
          class="li_btn"
          style="background-color:#d63605"
          @click="btn_click(item.task_id,item.finish_status)"
          @click.stop
        >详情</div>
        <div v-if="item.follow_result_name" class="li_process">{{item.follow_result_name}}</div>
        <div
          v-if="item.task_kind=='tkLegBus'||item.task_kind=='tkLegBusAss'||item.task_kind=='tkLegAcc'"
          class="li_state"
        >{{taskState[item.finish_status]}}</div>
        <div v-else class="li_state">{{taskState1[item.finish_status]}}</div>
      </li>
    </ul>
    <!-- 详情弹出框 -->
    <van-dialog
      v-if="get_tab==='remainingTask'"
      v-model="showDialog"
      :title="taskPropertyDetail.taskName"
      @confirm="select(taskPropertyDetail.taskId)"
      show-cancel-button
      :confirm-button-text="dialogBtn"
    >
      <ul class="taskDetail">
        <li>任务时间：{{taskPropertyDetail.planDate}}</li>
        <li>任务内容：{{taskPropertyDetail.taskContent}}</li>
        <template
          v-if="taskPropertyDetail.taskKind == 'tkLegAccHom'||taskPropertyDetail.taskKind == 'tkLegAccCyc'"
        >
          <li v-if="taskPropertyDetail.legType">任务类型：{{taskPropertyDetail.legType}}类</li>
          <li>服务内容：{{taskPropertyDetail.taskKindName}}</li>
        </template>

        <li v-else>任务类型：{{taskPropertyDetail.taskKindName}}</li>
        <li v-if="taskPropertyDetail.executorName">执行者: {{taskPropertyDetail.executorName}}</li>
        <!-- <li>任务地点：{{taskPropertyDetail.taskArea}}</li> -->
        <li>公司名称：{{taskPropertyDetail.companyName}}</li>
        <li v-if="taskPropertyDetail.taskArea">任务地点：{{taskPropertyDetail.taskArea}}</li>
        <li v-if="taskPropertyDetail.taskPlace">公司地点：{{taskPropertyDetail.taskPlace}}</li>
      </ul>
    </van-dialog>

    <van-dialog
      v-if="get_tab==='finishTask'"
      v-model="showDialog"
      :title="taskPropertyDetail.taskName"
    >
      <ul class="taskDetail">
        <li>任务对象：{{taskPropertyDetail.companyName}}</li>
        <li>任务详情：{{taskPropertyDetail.taskContent}}</li>
        <li>任务状态：{{taskState[finishState]}}</li>
        <li
          v-if="taskPropertyDetail.finishMemo"
        >任务{{taskState[finishState]}}原因：{{taskPropertyDetail.finishMemo}}</li>
        <li>任务类型：{{taskPropertyDetail.taskKindName}}</li>
        <li v-if="taskPropertyDetail.executorName">执行者: {{taskPropertyDetail.executorName}}</li>
        <li v-if="taskPropertyDetail.planDate">计划时间：{{taskPropertyDetail.planDate}}</li>
        <li v-if="taskPropertyDetail.taskArea">任务地点：{{taskPropertyDetail.taskArea}}</li>
        <li v-if="taskPropertyDetail.taskPlace">公司地点：{{taskPropertyDetail.taskPlace}}</li>
        <div v-if="taskPropertyDetail.pictures" class="taskDetail__pic">
          <img
            :key="index"
            v-for="(item,index) in taskPropertyDetail.pictures"
            class="taskDetail__pic-item"
            :src="item"
          >
          <!-- <van-row>
            <van-col
              v-for="(item,index) in taskPropertyDetail.pictures"
              :key="index"
              style="margin-left:3px;margin-right:3px"
            >
              <div class="img-content" style="margin-bottom:0.1rem;">
                <img
                  :src="item.src||item"
                  alt="Ballade"
                  style="max-width:2rem;max-height:1.5rem;margin-bottom:0.1rem;"
                >
              </div>
            </van-col>
          </van-row>-->
        </div>
      </ul>
    </van-dialog>

    <div v-if="sideButton" class="side-buttom" @click="handleNewTask">
      <van-icon size="0.8rem" color="white" name="plus"/>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '../../api/login.js';
import * as api from './api/index.js';
import { AjaxDic } from '@api/index';
import Xheader from '../../layouts/Xheader.vue';
import Mtab from './Mtab.vue';
import { constants } from 'crypto';
import { Promise } from 'q';
let _this = this;
let gzbusinessarea = [];
let gzbusinessplace = [];
let followStage = [];
export default {
  async beforeRouteEnter(to, from, next) {
    try {
      let resp = await api.getCheckTaskLegwork();
      if (!resp) {
        next();
      } else {
        next(vm => {
          console.log(resp);
          vm.$store.commit('fieldDetail/change_legwork_status', resp.legwork_status);
          vm.$router.replace({ path: '/field/otherLeave' });
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  components: {
    Xheader,
    Mtab,
  },
  computed: {
    get_tab() {
      // 当前点击的标签，切换‘今日剩余’或‘今日完成任务’标签
      return this.$store.state.myTaskDetail.tab;
    },
    remainingTaskCount() {
      //今日剩余任务数量
      return this.remainList.length;
    },
    finishTaskCount() {
      return this.finishList.length;
    },
    selected() {
      //获取已选的任务，并确定按钮是否高亮
      if (this.$store.state.myTaskDetail.selected.length > 0) {
        this.btnActive = true;
      } else {
        this.btnActive = false;
      }
      return this.$store.state.myTaskDetail.selected;
    },
  },
  data() {
    return {
      taskState: {
        youxiao: '命中',
        wuxiao: '无效',
        mingzhong: '命中',
        weiwancheng: '未完成',
        wancheng: '完成',
      },
      taskState1: {
        youxiao: '完成',
        wuxiao: '未完成',
        mingzhong: '命中',
        weiwancheng: '未完成',
        wancheng: '完成',
      },
      finishState: '',
      btnActive: false, //完成按钮高亮
      showDialog: false, //详情展示
      dialogBtn: '添加任务', //详情按钮内容
      remainList: [
        // {
        //   taskId:347,
        //   taskName:"123456789",
        //   taskKind:"tkLegBus",
        //   taskKindName:"商事外勤",
        //   taskContent:"123456789",
        //   companyName:"广州云馨心理卫生服务中心有限公司"
        // }
      ],
      sideButton: false,
      finishList: [
        {
          taskId: 347,
          taskName: '123456789',
          taskKind: 'tkLegBus',
          taskKindName: '商事外勤',
          taskContent: '123456789',
          companyName: '广州云馨心理卫生服务中心有限公司',
          state: 'finished',
        },
      ],
      taskPropertyDetail: {}, //详情弹出框内容
    };
  },
  methods: {
    handleNewTask() {
      this.$router.push({ name: 'newTaskIndex' });
    },
    select(id) {
      // 以任务ID选中即commit进仓库
      this.$store.commit('myTaskDetail/set_selected', id);
    },
    async handleFinishTaskDetail(id) {},

    async btn_click(taskId, finishState) {
      //点击，反选
      let res = await this.show_taskPropertyDetailByTaskId(taskId);
      if (
        this.$store.state.myTaskDetail.selected.indexOf(taskId) === -1
          ? (this.dialogBtn = '添加任务')
          : (this.dialogBtn = '删除任务')
      )
        if (finishState) {
          this.finishState = finishState;
        }
      this.showDialog = true;
    },

    async start() {
      this.$router.push({ path: '/field/otherIndex' });
      //去完成按钮事件，如果有未完成的任务，跳转到外勤打卡结束页面，如果没有，跳转到即将开始打卡页面
      // let res = await api.getCheckTaskLegwork();

      // if (res) {
      //   this.$router.push({ path: "/field/otherLeave" }); //otherLeave
      // } else {
      //   console.log(res);
      //   this.$router.push({ path: "/field" });
      // }
    },

    async get_userInfo() {
      //获取用户信息
      const user = await getUserInfo();
      console.log(user);
    },
    async get_toDoTaskListByUserId() {
      // 获取待进行的任务，并展示将数据展示
      let date = new Date();
      let Month = Number(date.getMonth() + 1) >= 10 ? Number(date.getMonth() + 1) : '0' + Number(date.getMonth() + 1);
      let Day = Number(date.getDate()) >= 10 ? Number(date.getDate()) : '0' + Number(date.getDate());
      const config = {
        params: {
          date: date.getFullYear() + '-' + Month + '-' + Day,
        },
      };

      let res = await api.getToDoTaskListByUserId(config);
      this.remainList = JSON.parse(JSON.stringify(res));
      console.log(followStage);
      // this.remainList = this.remainList.map(v => {
      //   v.follow_result = followStage.find(e => {
      //     e.typecode == v.follow_result;
      //   });
      //   return v;
      // });
      console.log('this.remainList', this.remainList);
      localStorage.setItem('STARTTASK', JSON.stringify(this.remainList));
    },
    async get_FinishTaskListByUserId() {
      let date = new Date();
      let Month = Number(date.getMonth() + 1) >= 10 ? Number(date.getMonth() + 1) : '0' + Number(date.getMonth() + 1);
      let Day = Number(date.getDate()) >= 10 ? Number(date.getDate()) : '0' + Number(date.getDate());
      const config = {
        params: {
          date: date.getFullYear() + '-' + Month + '-' + Day,
        },
      };
      let res = await api.getFinishedLegworkTask(config);
      this.finishList = JSON.parse(JSON.stringify(res));
      // console.log(this.finishList);
      // this.finishList = this.finishList.map(v=>{
      //   if (v.legpicurls) {
      //     v.legpicurls = v.legpicurls.split(",").map(v => {
      //     return "/api/assets/" + v;
      //   });
      //   }
      //   return v;
      // })
    },
    async getDic() {
      let res = await AjaxDic('gzbusinessarea,gzbusinessplace,followStage');
      gzbusinessarea = res.gzbusinessarea;
      gzbusinessplace = res.gzbusinessplace;
      followStage = res.followStage;
    },
    async show_taskPropertyDetailByTaskId(taskId) {
      //获取任务详情并展示
      const config = {
        params: {
          taskId: taskId,
        },
      };
      let res = await api.getTaskPropertyDetailByTaskId(config);

      res.length ? (this.taskPropertyDetail = JSON.parse(JSON.stringify(res[0]))) : null;

      if (this.taskPropertyDetail && this.taskPropertyDetail.legpicurls) {
        this.taskPropertyDetail.pictures = this.taskPropertyDetail.legpicurls.split(',').map(v => {
          return '/api/assets/' + v;
        });
      }
      if (this.taskPropertyDetail && this.taskPropertyDetail.taskPlace) {
        let taskPlace = gzbusinessarea.find(v => {
          return (v.typecode = this.taskPropertyDetail.taskPlace);
        });
        this.taskPropertyDetail.taskPlace = !!taskPlace ? taskPlace.typename : '';
      }
      if (this.taskPropertyDetail && this.taskPropertyDetail.taskArea) {
        let taskArea = gzbusinessplace.find(v => {
          return (v.typecode = this.taskPropertyDetail.taskArea);
        });
        this.taskPropertyDetail.taskArea = !!taskArea ? taskArea.typename : '';
      }
    },
  },
  created() {
    // this.get_userInfo();
    let {
      currentDepart: { aliasCode },
    } = JSON.parse(localStorage.getItem('user'));
    this.sideButton = aliasCode == 'BUSSINESS' || aliasCode == 'MARKET' || aliasCode == 'ACCOUNT' ? true : false;

    this.$store.state.myTaskDetail.selected = [];
    this.get_toDoTaskListByUserId();
    this.get_FinishTaskListByUserId();
    this.getDic();
  },
  mounted() {
    //背景色
    document.querySelector('body').setAttribute('style', 'background-color:rgb(247, 247, 247)');
  },
  beforeDestroy() {
    //背景色
    document.querySelector('body').removeAttribute('style');
  },
};
</script>
<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  transition: all 0.2s ease;
}
.remainingTask,
.finishTask {
  padding: 1.45rem 0.2rem 1.4rem 0.2rem;
  li {
    border-radius: 0.15rem;
    width: 100%;
    height: 2.1rem;
    overflow: hidden;
    /* background-color: rgb(255, 0, 170); */
    padding: 0.3rem 0.5rem 0 1rem;
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
    .li_process {
      position: absolute;
      right: 0.3rem;
      top: 1.4rem;
      color: #000;
      font-size: 0.4rem;
    }
    .checkbox {
      width: 0.6rem;
      height: 0.6rem;
      position: absolute;
      top: 0.6rem;
      left: 0.2rem;
      border: 1px solid rgb(150, 150, 150);
      border-radius: 50%;
    }
    .checkbox::after {
      content: '';
      position: absolute;
      left: 0.14rem;
      top: 0.2rem;
      width: 50%;
      height: 25%;
      border: 0.06rem solid #000;
      border-radius: 0.03px;
      border-top: none;
      border-right: none;
      background: transparent;
      transform: rotate(-45deg);
      border-color: #fff;
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
  }
  .selected {
    background-color: rgba(0, 0, 0, 0.055);
    .checkbox {
      background-color: rgb(214, 54, 5);
      border: 0 none;
    }
  }
  .btn {
    position: fixed;
    width: 100%;
    height: 1.3rem;
    font-size: 0.5rem;
    line-height: 1.3rem;
    bottom: 0;
    background-color: rgb(197, 120, 120);
    color: #fff;
    border-radius: 0.18rem;
    margin-left: -0.2rem;
  }
  .btnActive {
    background-color: rgb(185, 2, 2);
  }
}
.finishTask {
  padding: 1.45rem 0.2rem 1.4rem 0.2rem;
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
      width: 60%;
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
      background-color: rgb(131, 117, 113);
      color: #fff;
    }
    .li_process {
      position: absolute;
      right: 0.3rem;
      top: 1.4rem;
      color: #000;
      font-size: 0.4rem;
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
  }
  .selected {
    background-color: rgba(0, 0, 0, 0.055);
    .checkbox {
      background-color: rgb(214, 54, 5);
      border: 0 none;
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
  .taskDetail__pic {
    margin-top: 0.5rem;
    padding-right: 1rem;
    &-item {
      margin: 5px;
      width: 2.2rem;
    }
  }
}
.side-buttom {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 2rem;
  right: 0.8rem;
  background: rgba(199, 0, 0, 1);
  border-radius: 50%;
  // box-shadow: 0px 2px 0px 0px rgba(226, 22, 22, 1);
  width: 1.3rem;
  height: 1.3rem;
}
</style>