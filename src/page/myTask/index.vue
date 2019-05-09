<template>
  <div class="main" style="padding-top:1.2rem;">
    <!-- <van-nav-bar title="我的任务" left-arrow @click-left="$backTo(-1)"/> -->
    <Xheader back="-1" title="我的任务"/>
    <Mtab :remainingTaskCount="remainingTaskCount" finishTaskCount=0 style="position:fixed;top:1.2rem;left:0;width:100%;z-index:5"/>
    <!-- 今日剩余 -->
    <ul class="remainingTask" v-show="get_tab==='remainingTask'?true:false">
      <li v-for="(item,i) in list" :key="i" @click="select(item.taskId,i)" :class="selected.indexOf(item.taskId)===-1?'':'selected'">
        <div class="checkbox"></div>
        <div class="li_title">{{item.taskKindName+'-'+item.taskName}}</div>
        <div class="li_con">{{item.companyName?item.companyName:item.taskContent}}</div>
        <div class="li_btn" @click="btn_click(item.taskId)" @click.stop>详情</div>
      </li>
      <div class="btn" :class="btnActive?'btnActive':''" @click="btnActive && start()">去完成</div>
    </ul>
    <!-- 今日完成任务 -->
    <ul class="finishTask" v-show="get_tab==='finishTask'?true:false">
      <!-- <li v-for="(item,i) in list" :key="i">
        <div class="li_title">{{item.taskName}}</div>
        <div class="li_con">{{item.taskKind}}</div>
        <div class="li_btn" @click="btn_click(item.taskId)" @click.stop>详情</div>
        <div class="li_state" v-if="item.state==='finished'">{{item.state}}</div>
        <div class="li_state" style="color:red" v-else-if="item.state==='unfinished'">{{item.state}}</div>
      </li> -->
    </ul>
  </div>
</template>
<script>

import { getUserInfo } from '../../api/login.js';
import * as api from "./api/index.js";
import Xheader from '../../layouts/Xheader.vue';
import Mtab from './Mtab.vue';
export default {
  components:{
    Xheader,
    Mtab
  },
  computed: {
    get_tab() {
      return this.$store.state.myTaskDetail.tab;
    },
    remainingTaskCount(){
      return this.list.length
    },
  },
  data() {
    return {
      btnActive: false,
      selected:[],
      list:[
        // {
        //   taskId:347,
        //   taskName:"123456789",
        //   taskKind:"tkLegBus",
        //   taskKindName:"商事外勤",
        //   taskContent:"123456789",
        //   companyName:"广州云馨心理卫生服务中心有限公司"
        // }
      ]
    }
  },
  methods: {
    select(id,i){
      this.selected.indexOf(id)===-1?this.selected.push(id):this.selected.splice(this.selected.indexOf(id),1);
      if(this.selected.length>0){
        this.btnActive = true;
      }else {
        this.btnActive = false;
      }
    },
    btn_click(taskId){
      this.get_taskPropertyDetailByTaskId(taskId);
    },
    start(){
      console.log(this.selected);
      this.set_selected(this.selected);
      console.log(this.$router);
      this.$router.push({path:'/field'})
    },
    set_selected(i){
      this.$store.commit("myTaskDetail/set_selected",i)
    },
    async get_userInfo() {
      const user = await getUserInfo();
      console.log(user);
    },
    async get_toDoTaskListByUserId() {
      const config = {
        params:{
          userId: '10059',
          date: '2019-05-07'
        }
      }
      let res = await api.getToDoTaskListByUserId(config);
      console.log(res);
      this.list = JSON.parse(JSON.stringify(res));
    },
    async get_taskPropertyDetailByTaskId(taskId){
      const config = {
        params:{
          taskId: taskId
        }
      };
      let res = await api.getTaskPropertyDetailByTaskId(config);
      console.log(res);
    }
  },
  created(){
    this.get_userInfo();
    this.get_toDoTaskListByUserId();
  },
  beforeCreate() {
    //背景色
    document.querySelector('body').setAttribute('style', 'background-color:rgb(247, 247, 247)')
  },
  beforeDestroy() {
    //背景色
    document.querySelector('body').removeAttribute('style')
  }
}
</script>
<style scoped lang="scss"> 
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }   
  .remainingTask {
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
      margin-bottom: .25rem;
      position: relative;
      .li_title {
        width: 80%;
        height: 0.8rem;
        font-size: 0.5rem;
        font-weight: 600;
        line-height: 0.8rem;
        overflow:hidden;
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
        overflow:hidden;
        border-top: 1px solid rgb(204, 204, 204);
        padding: 0.2rem 0.2rem 0.15rem 0.15rem;
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
        content: "";
        position: absolute;
        left: 0.14rem;
        top: 0.20rem;
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
        color:#fff;
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
      position:fixed;
      width: 100%;
      height: 1.3rem; 
      font-size: 0.5rem;
      line-height: 1.3rem;
      bottom: 0;
      background-color: rgb(197, 120, 120);
      color:#fff;
      border-radius: 0.18rem;
      margin-left: -0.2rem;
    }
    .btnActive {
      background-color: rgb(156, 36, 0);
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
      margin-bottom: .25rem;
      position: relative;
      .li_title {
        width: 60%;
        height: 0.8rem;
        font-size: 0.5rem;
        font-weight: 600;
        line-height: 0.8rem;
        overflow:hidden;
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
        overflow:hidden;
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
        color:#fff;
      }
      .li_state {
        position: absolute;
        right:2rem;
        top: 0.2rem;
        width: 2rem;
        height: 0.8rem;
        // background-color: pink;
        color:rgb(51, 179, 0);
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

</style>