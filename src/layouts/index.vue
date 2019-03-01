<template>
  <div>
    <van-nav-bar title="移动亿账柜" left-arrow @click-left="$backTo()"/>
    <van-button to="/field">外勤打卡</van-button>
    <van-button to="/resume">简历管理</van-button>
    <van-button to="/field1">外勤打卡1</van-button>
    <van-button to="/field2">外勤打卡2</van-button>
    <van-button to="/field3">外勤打卡3</van-button>
    <van-button to="/field4">外勤打卡4</van-button>
    <van-button to="/field5">外勤打卡5</van-button>
    <van-button to="/login">退出系统</van-button>
    <div v-if="!menuList.length">
      <!-- 骨架屏 -->
      <ul class="skeleton-tabs">
        <li v-for="i in 8" class="skeleton-tabs-item" :key="i">
          <span></span>
        </li>
      </ul>
    </div>
    <div v-else>
      <div v-for="(x, index) in menuList" :key="index">{{x.title}}</div>
    </div>
  </div>
</template>

<script>
//  渲染九宫格效果；获取用户菜单值，与vuex交互，如果vuex中menu无数据，这请求渲染，如果有数据，则利用旧数据进行渲染，此部分放在vuex中action目测比较合适
export default {
  data() {
    return {
      // menuList: [],
    };
  },
  methods: {
    //  获取权限
  },
  computed: {
    menuList() {
      return this.$store.state.menu;
    },
  },
  created() {
    if ( !this.$store.state.userId ) {
      this.$store.dispatch('getUserInfo');
    }
    if (this.$store.state.userAccess.length === 0 || this.$store.state.menu.length === 0) {
      this.$store.dispatch('updateAccess');
    }
    // if (this.$store.state.menu.length === 0) {
    //   this.$store.dispatch('updateMenu');
    //   console.log('需要渲染菜单！');
    // }
  },
};
</script>

<style>
.skeleton-tabs {
  list-style: none;
  padding: 0;
  margin: 15px 15px;
  display: flex;
  flex-wrap: wrap;
}
.skeleton-tabs-item {
  width: 33%;
  /* height: 55px; */
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 15px;
}
</style>

