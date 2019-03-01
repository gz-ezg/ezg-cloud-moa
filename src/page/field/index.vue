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
  // async login() {
  //   let config = {
  //     username: this.username,
  //     password: this.password
  //   };

  //   // console.log(this.$store)
  //   try {
  //     let { status, data } = await loginApi.userLogin(config);
  //     if (status) {
  //       Cookies.set("user", this.username);
  //       Cookies.set("password", this.password);
  //       this.$store.commit("set_realName", data.data.user.realname);
  //       this.$store.commit("set_id", data.data.user.id);
  //       this.get_role(data.data.user.id);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async get_role(id) {
    let roleArray = await loginApi.checkUserRoleByUserId(id);
    // console.log(roleArray);
    this.$store.commit("setUserRole", roleArray);
    this.check_unfinish();
  }
  async check_unfinish() {
    try {
      let {
        status,
        data
      } = await loginApi.checkLoginUserlegworkPunchcardStatus();
      console.log(data);
      if (status) {
        if (data.data == "unfinished") {
          this.to_leave();
        } else if (data.data == "affirm") {
          setTimeout(() => {
            this.$router.push({
              name: "accountComfirm"
            });
          }, 500);
        } else {
          this.to_index();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  to_index() {
    this.roleArray.every((item, index) => {
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
  // async autologin(code) {
  //   let formdata = new FormData();
  //   formdata.append("agentId", "1000022");
  //   formdata.append("code", code);
  //   let { status, data } = await loginApi.loginByWechatCode(formdata);
  //   if (status) {
  //     Cookies.set("user", this.username);
  //     Cookies.set("password", this.password);
  //     this.$store.commit("set_realName", data.data.user.realname);
  //     this.$store.commit("set_id", data.data.user.id);
  //     this.get_role(data.data.user.id);
  //   } else {
  //     this.$toast.fail("免登陆失效，请登录！");
  //   }
  // }

  loading() {
    let _self = this;
    let str = location.href;
    if (str.indexOf("?")) {
      let query = str.split("?");
      let queryItem = str.split("&");
      let params = queryItem[0].split("=");
      if (params[1] == "null") {
        this.$toast.fail("免登陆失效，请登录！");
      } else {
        // this.autologin(params[1]);
      }
    }
  }
  created() {
    // this.loading();
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

