<template>
  <div>
    <van-nav-bar title="普通外勤打卡"/>
    <van-row class="field-skeleton-head"></van-row>
    <van-row class="field-skeleton-body"></van-row>
    <van-row class="field-skeleton-footer"></van-row>
    <van-row class="field-skeleton-button"></van-row>
  </div>
</template>

<script lang="ts">
import * as loginApi from "./api/login/index.js";
import { getUserInfo } from '@/api/login.js';
import { Component, Prop, Emit, Vue, Watch } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  username = "";
  password = "";
  roleMapIndex = new Map([
    ["salers", "marketIndex"],
    ["kj", "accountIndex"],
    ["kjbgd", "accountIndex"],
    ["jzkj", "accountIndex"],
    ["servicer", "commericalIndex"],
    ["ssbgd", "commericalIndex"],
    ["planner", "planIndex"],
    ["qhbgd", "planIndex"]
  ]);
  roleMapLeave = new Map([
    ["salers", "marketLeave"],
    ["kj", "accountLeave"],
    ["kjbgd", "accountLeave"],
    ["jzkj", "accountLeave"],
    ["servicer", "commericalLeave"],
    ["ssbgd", "commericalLeave"],
    ["planner", "planLeave"],
    ["qhbgd", "planLeave"]
  ]);

  get roleArray() {
    return this.$store.state.userRole;
  }
  //  后期可以迁移至store中，角色部分
  async get_role(id) {
		const {roles, user, departs} = await getUserInfo();
		if (user.id) {
		  this.$store.commit('setUserInfo', user);
		  // Cookies.set('userId', '10000');
		}
		this.$store.commit("setUserRole", roles);
    // let roleArray = await loginApi.checkUserRoleByUserId(id);
    // console.log(roleArray);
    // this.$store.commit("setUserRole", roleArray);
    this.check_unfinish();
		// console.log(this.$store)
  }
  async check_unfinish() {
		// console.log(this.$store.state)
		// console.log("123456")
    try {
			// this.to_index()
			// console.log(this.roleArray)
      let data = await loginApi.checkLoginUserlegworkPunchcardStatus();
      console.log(data);
      // if (status) {
        if (data == "unfinished") {
          this.to_leave();
        } else if (data == "affirm") {
          setTimeout(() => {
            this.$router.push({
              name: "accountComfirm"
            });
          }, 500);
        } else {
          this.to_index();
        }
      // }
    } catch (error) {
      console.log(error);
    }
  }
  to_index() {
    this.roleArray.every((item, index) => {
			// console
			// console.log(this.roleMapIndex.get(item.rolecode))
      if (this.roleMapIndex.get(item.rolecode)) {
        setTimeout(() => {
          this.$router.push({
            name: this.roleMapIndex.get(item.rolecode)
          });
        }, 300);
        return false;
      } else {
        if (index == this.roleArray.length - 1) {
          setTimeout(() => {
            this.$router.push({
              name: "otherIndex"
            });
          }, 300);
        } else {
          return true;
        }
      }
    });
  }
  to_leave() {
    this.roleArray.every((item, index) => {
      if (this.roleMapLeave.get(item.rolecode)) {
        setTimeout(() => {
          this.$router.push({
            name: this.roleMapLeave.get(item.rolecode)
          });
        }, 300);
        return false;
      } else {
        if (index == this.roleArray.length - 1) {
          setTimeout(() => {
            this.$router.push({
              name: "otherLeave"
            });
          }, 300);
        } else {
          return true;
        }
      }
    });
  }
  created() {
    this.get_role(this.$store.state.userId);
  }
  mounted() {}
}
</script>

<style scoped>
.field-skeleton-head{
  width: 80%;
  height: 2.5rem;
  margin: auto;
  background-color: #eee;
  border-radius: 10px;
  margin-top: 1rem;
}
.field-skeleton-body{
  width: 80%;
  height: 4rem;
  margin: auto;
  background-color: #eee;
  border-radius: 10px;
  margin-top: 1rem;
}
.field-skeleton-footer{
  width: 80%;
  height: 2rem;
  margin: auto;
  background-color: #eee;
  border-radius: 10px;
  margin-top: 0.6rem;
}
.field-skeleton-button{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.33333rem;
  background-color: #eee;
  border-radius: 5px;
}
</style>

