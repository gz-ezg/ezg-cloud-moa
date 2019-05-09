<template>
    <div>
        <ul class="excutoryTask">
            <li v-for="(item,i) in list" :key="i">
                <div class="checkbox"></div>
                <div class="li_title">{{item.taskKindName+'-'+item.taskName}}</div>
                <div class="li_con">{{item.companyName?item.companyName:item.taskContent}}</div>
                <div class="li_btn">详情</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
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
    computed: {
        
    },
    methods: {
        set_selected(i){
            this.$store.commit("myTaskDetail/set_selected",i)
        },
        get_selected() {
            this.list = this.$store.state.myTaskDetail.selected;
        },
    },
    created(){
        this.get_selected();
    }
}
</script>
<style lang="scss" scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        transition: all 0.2s ease;
    }   
  .excutoryTask {
    padding: 0.2rem 0.2rem 1.4rem 0.2rem;
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
  }
</style>
