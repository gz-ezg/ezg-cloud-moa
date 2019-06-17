<template>
  <div class="main" style="padding-top:1.2rem;">
    <Xheader back="-1" title="新增任务"/>
    <!-- 内容区域 -->
    <van-cell-group class="main-body">
      <van-field class="main-body-text" v-model="username" type="textarea" placeholder="请输入任务内容"/>
      <van-field
        @click="handleCompanySelect"
        v-model="mainFrom.companyname"
        label="任务内容"
        placeholder="请选择任务内容"
      />
      <van-field v-model="mainFrom.name" label="客户" placeholder="请选择客户"/>
      <van-field v-model="mainFrom.tel" type="tel" label="联系电话" placeholder="请输入联系电话"/>
      <van-field :value="currentDate" @click="handleSelectTime" label="代办时间" placeholder="请选择时间"/>
      <van-field v-model="username" @click="handleShowExecutor" label="执行人" placeholder="请选择执行人"/>
    </van-cell-group>

    <!-- 底部按钮 -->
    <div class="main-button">保存</div>

    <!-- 时间选择 -->
    <van-popup class="select" v-model="showSelectTime" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" @confirm="confirmTime"/>
    </van-popup>

    <!-- 执行者选择 -->
    <van-popup class="select" v-model="showExecutor" position="bottom">
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in executorList"
            clickable
            :key="item"
            :title="`复选框 ${item}`"
            @click="toggle(index)"
          >
            <van-checkbox :name="item" ref="checkboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>

    <!-- 公司客户选择 -->
    <van-popup class="select" v-model="showSelectCompany" position="bottom">
      <div class="select-company">
        <van-search
          show-action
          @cancel="CloseCompanySelect"
          @search="CompanySearch"
          v-model="searchValue"
          shape="round"
          clearable
          placeholder="请输入搜索关键词"
        >
          <div @click="changeLabel" slot="label">客户</div>
        </van-search>
        <div
          @click="selectOne(item)"
          class="select-company-list"
          v-for="(item,index) in list"
          :key="index"
        >
          <div class="list-top">
            <div>{{item.name}}</div>
            <div>{{item.tel}}</div>
          </div>
          <div class="list-bottom">{{item.companyname}}</div>
        </div>

        <van-dropdown-menu>
          <van-dropdown-item v-model="title" :options="option1"/>
        </van-dropdown-menu>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { handleSeachCompany, handleUserList, SearchRsp, SearchConfig } from './api';
import Xheader from '../../layouts/Xheader.vue';

@Component({
  components: {
    Xheader,
  },
})
export default class NewsTask extends Vue {
  private title = 'string';
  private mainFrom = {
    companyname: '',
    name: '',
    tel: '',
  };
  private showSelectCompany: boolean = false;
  private showSelectTime: boolean = false;
  private columns = ['杭州', '宁波', '温州', '嘉兴', '湖州'];
  private list: SearchRsp[];
  private searchValue: string;
  private from: SearchConfig = {
    companyname: '',
    customerName: '',
    customerTel: '',
  };
  private showExecutor: boolean = false;
  private executorList = ['a', 'b', 'c'];
  private valueOption: number = 0;
  handleCompanySelect() {
    this.showSelectCompany = true;
    this.CompanySearch();
  }
  CloseCompanySelect() {
    this.showSelectCompany = false;
  }
  changeLabel() {}
  async CompanySearch() {
    let { from, searchValue } = this;
    from = Object.assign(from, { companyname: searchValue });
    this.list = await handleSeachCompany(from);
  }
  handleSelectTime() {
    this.showSelectTime = true;
  }
  confirmTime() {
    this.showSelectTime = false;
  }
  handleShowExecutor() {
    this.showExecutor = true;
  }
  selectOne({ companyname, name, tel }) {
    this.mainFrom = Object.assign(this.mainFrom, {
      companyname,
      name,
      tel,
    });

    this.showSelectCompany = false;
  }

  async created() {
    let resp = await handleUserList();
    if (resp.rows) {
      this.executorList = resp.rows.map(v => {
        return {
          realname: v.realname,
          departname: v.departname,
        };
      });
    }
  }
}
</script>
<style scoped lang="scss">
.main {
  width: 100vw;
  // background-color: rgb(247, 247, 247);

  &-body {
    background-color: rgb(247, 247, 247);
    padding: 0.3rem;
    padding-bottom: 1.4rem;
    &-text {
      margin-top: 0.3rem;
      border: 1px solid rgb(247, 247, 247);
    }
  }

  &-button {
    position: fixed;
    width: 100vw;
    color: white;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: rgba(199, 0, 0, 1);
    height: 1.2rem;
    font-size: 0.5rem;
    line-height: 1.2rem;
    text-align: center;
  }

  .select {
    width: 100vw;

    &-company {
      font-size: 0.37333rem;
      height: 100vh;
      width: 100vw;
      &-list {
        margin: 0.3rem;
        display: flex;
        flex-direction: column;
        align-content: center;
        border-bottom: 1px solid rgba(227, 227, 227, 0.2);

        .list {
          &-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          &-bottom {
            margin: 0.3rem 0;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>