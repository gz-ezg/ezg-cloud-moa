<template>
  <van-dialog v-model="type_open" :show-confirm-button="false" :close-on-click-overlay="true">
    <form action="/">
      <van-search placeholder="请输入会计名称搜索" v-model="searchaccountname" @click="search"/>
    </form>
    <van-checkbox-group v-model="select_type_id">
      <van-cell-group>
        <van-cell
          v-for="item in account_list"
          :key="item.id"
          :title="item.realname"
          @click="choose(item)"
          @change="choose"
        >
          <van-checkbox :name="item.id"/>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
  </van-dialog>
</template>

<script>
export default {
  data() {
    return {
      searchaccountname: "",
      type_open: false,
      select_type_id: "",
      account_list: [

      ]
    }
  },
  methods: {
    search() {
      const _self = this,
      const url = 'api/legwork/apiCheckAccountMsg',
      let formdata = new FormData(),
      formdata.append('realname', _self.searchaccountname),

      this.$http.post(url, formdata).then(function (res) {
        if (res.data.msgCode == "40000") {
          _self.account_list = res.data.data
        } else {
          _self.$toast.fail('系统错误！')
        }
      }).catch(function (err) {
        _self.$toast.fail('网络错误！')
      })

    },
    //  点击全行选中
    choose(e) {
      this.$bus.emit('update_account', e)
      this.select_type_id = e.id
      this.type_open = false
    },

  },
  created() {
    let _self = this
    this.$bus.on('open_account_list', (e) => {
      _self.type_open = true
      _self.search()
    })
  },
  watch: {
    'searchaccountname': 'search'
  }
}
</script>
