<template>
  <div>
    <van-nav-bar title="简历库" class="navBarStyle" @click-left="$backTo()" left-arrow/>
    <van-search placeholder="输入姓名筛选" v-model="searchName" @search="get_data"/>
    <van-row style="padding-bottom:60px">
      <!-- <van-loading v-if="loading" style="top:10vh;left:45vw"></van-loading> -->
      <van-cell-group v-for="(item, index) in allNameList" :key="index">
        <van-cell
          :title="item.name"
          :value="item.updatedate.slice(0,10)"
          :label="item.post"
          is-link
          center
          @click="open_detail(item)"
        >
          <div slot="icon">
            <i class="iconfont icon-nan" v-if="item.sex" style="margin-right:10px;color:#d81e06"></i>
            <i class="iconfont icon-nv" v-else style="margin-right:10px;color:#d81e06"></i>
          </div>
        </van-cell>
      </van-cell-group>
      <van-row style="position:fixed;bottom:0;width:100%">
        <center>
          <van-button
            size="large"
            style="width:100%;"
            type="danger"
            @click="open_create_resume"
          >新增简历</van-button>
        </center>
      </van-row>
    </van-row>
  </div>
</template>

<script>
import { resumeList } from '../api/index';

export default {
  data() {
    return {
      allNameList: [],
      searchName: '',
      loading: false,
    };
  },
  methods: {
    async get_data() {
      const config = {
        params: {
          page: 1,
          pageSize: 30,
          sortField: 'id',
          name: this.searchName,
        },
      };
      const { rows: data } = await resumeList(config);

      this.allNameList = data;
    },
    open_detail(e) {
      this.$router.push({
        name: 'resumeDetail',
      });
      localStorage.setItem('resume', JSON.stringify(e));
    },
    open_create_resume() {
      this.$router.push({
        name: 'resumeCreate',
      });
    },
  },
  created() {
    this.get_data();
  },
};
</script>
