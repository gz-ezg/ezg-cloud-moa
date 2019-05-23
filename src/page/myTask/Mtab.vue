<template>
  <div>
    <ul class="main">
      <li
        v-for="(item,i) in list"
        :key="i"
        :class="item.name===get_tab?'active':''"
        @click="change_tab(item.name)"
      >
        {{item.title}}
        <span v-show="item.name==='remainingTask'">{{remainingTaskCount}}</span>
        <span v-show="item.name==='finishTask'">{{finishTaskCount}}</span>个
      </li>
    </ul>
  </div>
</template>
<script>
import * as api from "./api/index.js";
import { constants } from "crypto";
export default {
  props: {
    remainingTaskCount: Number,
    finishTaskCount: Number
  },
  data() {
    return {
      active: 0,
      list: [
        {
          title: "今日剩余：",
          name: "remainingTask"
        },
        {
          title: "今日完成任务：",
          name: "finishTask"
        }
      ]
    };
  },
  computed: {
    get_tab() {
      return this.$store.state.myTaskDetail.tab;
    }
  },
  methods: {
    change_tab(i) {
      this.$store.commit("myTaskDetail/change_tab", i);
    }
  },
//   async created() {
//     this.loading = true;
//     let { details } = await api.getCheckTaskLegwork();
//     if (details.length) {
//       this.$router.replace({ path: "/field/otherLeave" });
//     }
//     this.loading = false;
//   }
};
</script>
<style scoped lang="scss">
.main {
  height: 1.2rem;
  width: 100%;
  background-color: rgb(182, 46, 4);
  display: flex;
  li {
    flex: 1;
    font-size: 0.44rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
  }
  .active {
    background-color: #fff;
    color: rgb(211, 49, 0);
  }
}
</style>
