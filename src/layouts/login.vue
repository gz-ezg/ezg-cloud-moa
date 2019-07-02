<template>
  <van-row style="overflow-x: hidden">
    <van-row>
      <div style="height: 150px;margin-top: 5rem">
        <center>
          <img style="height: 80px" src="@assets/logo.png">
        </center>
      </div>
      <div style="width:80%;margin:auto">
        <van-cell-group>
          <van-field required v-model="username" label="用户名" placeholder="请输入用户名称"/>
          <van-field required v-model="password" type="password" label="密码" placeholder="请输入密码"/>
        </van-cell-group>
      </div>
      <van-row style="width:80%;margin:auto;margin-top:60px">
        <van-button size="large" type="primary" @click="login">登 录</van-button>
      </van-row>
    </van-row>
  </van-row>
</template>

<script>
import Cookies from 'js-cookie';
import { userLogin } from '@api/login';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        return this.$toast.fail('账号或密码不能为空');
      }
      const config = {
        username: this.username,
        password: this.password,
      };
      try {
        const { data } = await userLogin(config);
        // this.$store.commit('setUserInfo', data.data.user);
        //  设置标志位表示已登录，用于首页跳转
        Cookies.set('userId', '10000');
        this.$router.push({
          name: 'Index',
        });
      } catch (error) {
        return this.$toast.fail(error);
      }
    },
  },
  //   autologin(code) {
  //     let _self = this
  //     let url = `api/legwork/apiLoginByWechatCode`
  //     let formdata = new FormData()
  //     formdata.append("agentId", "1000013")
  //     formdata.append("code", code)

  //     this.$http.post(url, formdata).then(function (res) {
  //       if (res.data.msgCode == 40000) {
  //         localStorage.setItem('realname', res.data.data.user.realname)
  //         localStorage.setItem('id', res.data.data.user.id)
  //         //  获取权限菜单
  //         _self.get_menu(res.data.data.user.id)
  //         // _self.getRole(localStorage.getItem("id"))
  //         _self.$router.push({
  //           name: 'index'
  //         })
  //       } else {
  //         _self.$toast.fail("免登陆失败！请登陆！")
  //       }
  //     }).catch(function (err) {
  //       _self.$toast.fail("免登陆失效，请登录！")
  //     })
  //   },

  //   loading() {
  //     let _self = this
  //     let str = location.href
  //     let temp = str.split("?")
  //     let temp2 = str.split("&")
  //     let params = temp2[0].split("=")
  //     console.log(params)
  //     if (params.length == "1") {
  //       _self.$toast.fail("免登陆失效，请登录！")
  //     } else {
  //       console.log(params[1])
  //       this.autologin(params[1])
  //     }
  //   },
};
</script>
