<template>
  <div class="main" style="padding-top:1.2rem;">
    <Xheader back="-1" title="新增任务" />
    <!-- 内容区域 -->
    <van-cell-group class="main-body">
      <!-- <van-field
        v-if="departName !== 'BUSSINESS'"
        class="main-body-text"
        v-model="taskName"
        type="textarea"
        placeholder="请输入任务内容"
      /> -->
      <van-field class="main-body-text" v-model="taskNameBus" type="textarea" placeholder="请输入任务内容" />

      <!-- 市场 -->
      <template v-if="departName == 'MARKET'">
        <van-field
          @click="handleCompanySelect(0)"
          v-model="mainFrom.companyname"
          readonly
          label="企业"
          placeholder="请选择企业"
        />
        <van-field
          readonly
          @click="handleCompanySelect(1)"
          v-model="mainFrom.name"
          label="客户"
          placeholder="请选择客户"
        />
        <van-field
          readonly
          @click="handleCompanySelect(2)"
          v-model="mainFrom.tel"
          type="tel"
          label="联系电话"
          placeholder="请输入联系电话"
        />
        <van-field
          readonly
          @click="handleShowFollowStage"
          :value="followResult.typename"
          label="服务内容"
          placeholder="请选择服务内容"
        />
      </template>

      <!-- 会计 -->
      <template v-if="departName == 'ACCOUNT'">
        <van-field
          @click="handleshowCompany"
          v-model="mainFrom.companyname"
          readonly
          label="公司名称"
          placeholder="请选择公司名称"
        />
        <van-field
          readonly
          @click="hanldeShowProduct"
          v-model="mainFrom.product"
          label="产品"
          placeholder="请选择产品"
        />

        <template v-if="mainFrom.taskKind == 'tkLegAccCyc'">
          <van-field
            readonly
            @click="hanldeShowlegName"
            :value="mainFrom.legName"
            label="外勤名称"
            placeholder="请选择外勤名称"
          />

          <div class="main-body-radio">
            <div class="radio-label">外勤类型</div>
            <van-radio-group @change="changeLegName" class="radio-node" v-model="mainFrom.legType">
              <van-radio name="A">A</van-radio>
              <van-radio name="B">B</van-radio>
              <van-radio name="其他">其他</van-radio>
            </van-radio-group>
          </div>

          <van-field
            readonly
            v-show="mainFrom.legType!=='其他'"
            :value="num"
            label="剩余次数"
          />
        </template>

        <template v-if="mainFrom.taskKind == 'tkLegAcc'">
          <van-field
            v-model="mainFrom.taskArea"
            @click="hanldeShowArea"
            type="tel"
            label="区域"
            readonly
            placeholder="请选择区域"
          />
          <van-field
            @click="hanldeShowPlace"
            v-model="mainFrom.taskPlace"
            type="tel"
            label="地点"
            placeholder="请选择地点"
          />
        </template>
      </template>

      <!-- 商事 -->
      <template v-if="departName == 'BUSSINESS'">
        <!-- <template v-if="true"> -->
        <van-field
          @click="handleshowCompany"
          v-model="mainFrom.companyname"
          readonly
          label="公司名称"
          placeholder="请选择公司名称"
        />
        <van-field
          readonly
          @click="hanldeShowProduct"
          v-model="mainFrom.product"
          label="产品"
          placeholder="请选择产品"
        />
        <van-field
          v-model="mainFrom.taskArea"
          @click="hanldeShowArea"
          type="tel"
          label="区域"
          readonly
          placeholder="请选择区域"
        />
        <van-field
          @click="hanldeShowPlace"
          v-model="mainFrom.taskPlace"
          type="tel"
          label="地点"
          placeholder="请选择地点"
        />
        <div class="main-body-radio">
          <div class="radio-label">正常节点</div>
          <van-radio-group class="radio-node" v-model="mainFrom.workNode">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
          </van-radio-group>
        </div>
      </template>

      <van-field :value="selectDate" @click="handleSelectTime" label="代办时间" placeholder="请选择时间" />

      <div @click="handleShowExecutor" class="main-body-radio">
        <div class="radio-label">执行人</div>
        <div class="radio-node">
          <van-button
            v-for="(item, index) in executorResult"
            :key="index"
            size="small"
            plain
            style="margin:2px"
            type="info"
          >
            {{ item.realname }}
            <van-icon @click.stop="deleteExecutor(index)" style="vertical-align:middle" name="close" />
          </van-button>
          <div style="color:#969799;" class="radio-node" v-if="!executorResult.length">请选择执行人</div>
        </div>
      </div>

      <div style="height:1rem;background:#fff"></div>
    </van-cell-group>

    <!-- 底部按钮 -->
    <div @click="HandleAddLegworkTask" class="main-button">保存</div>

    <!-- 时间选择 -->
    <van-popup class="select" v-model="showSelectTime" position="bottom">
      <van-datetime-picker class="executor-content" v-model="currentDate" type="datetime" @confirm="confirmTime" />
    </van-popup>

    <!-- 服务内容 -->
    <van-popup class="select" v-model="showFollowStage" position="bottom">
      <div class="area-content">
        <div
          class="area-content-item"
          @click="selectFollowStage(item)"
          v-for="(item, index) in followStageList"
          :key="index"
        >
          {{ item.typename }}
        </div>
        <div class="area-content-item" v-if="!followStageList.length">请选择服务内容</div>
      </div>
    </van-popup>

    <!-- 外勤类型 -->
    <van-popup class="select" v-model="showlegName" position="bottom">
      <div class="area-content">
        <div class="area-content-item" @click="selectlegName(item)" v-for="(item, index) in legNameList" :key="index">
          {{ item.legwork_name }}
        </div>
        <div class="area-content-item" v-if="!legNameList.length">暂无产品</div>
      </div>
    </van-popup>

    <!-- 公司选择 -->
    <van-popup class="select" v-model="showCompany" position="bottom">
      <div class="area-content">
        <van-search
          class="area-content-search"
          show-action
          @cancel="handleshowCompany"
          @input="CompanySearch"
          @search="CompanySearch"
          v-model="searchValue"
          shape="round"
          clearable
          placeholder="请输入搜索词"
        ></van-search>
        <div
          class="area-content-item"
          @click="handleselectCompany(item)"
          v-for="(item, index) in companyList"
          :key="index"
        >
          {{ item.companyname }}
        </div>
        <div class="area-content-item" v-if="!companyList.length">暂无产品</div>
      </div>
    </van-popup>

    <!-- 产品选择 -->
    <van-popup class="select" v-model="showProduct" position="bottom">
      <div class="area-content">
        <div class="area-content-item" @click="selectProduct(item)" v-for="(item, index) in productList" :key="index">
          {{ item.product }}
        </div>
        <div class="area-content-item" v-if="!productList.length">暂无产品</div>
      </div>
    </van-popup>

    <!-- 区域选择 -->
    <van-popup class="select" v-model="showArea" position="bottom">
      <div class="area-content">
        <van-search
          show-action
          class="area-content-search"
          @cancel="hanldeShowArea"
          @input="filterSearch"
          @search="filterSearch"
          v-model="searchValue"
          shape="round"
          clearable
          placeholder="请输入搜索词"
        ></van-search>
        <div class="area-content-item" @click="selectArea(item)" v-for="(item, index) in areaList" :key="index">
          {{ item.typename }}
        </div>
        <div class="area-content-item" v-if="!areaList.length">暂无数据</div>
      </div>
    </van-popup>

    <!-- 地点选择 -->
    <van-popup class="select" v-model="showPlace" position="bottom">
      <div class="area-content">
        <van-search
          class="area-content-search"
          show-action
          @cancel="hanldeShowPlace"
          @input="filterSearch"
          @search="filterSearch"
          v-model="searchValue"
          shape="round"
          clearable
          placeholder="请输入搜索词"
        ></van-search>
        <div class="area-content-item" @click="selectPlace(item)" v-for="(item, index) in placeList" :key="index">
          {{ item.typename }}
        </div>
        <div class="area-content-item" v-if="!placeList.length">暂无数据</div>
      </div>
    </van-popup>

    <!-- 执行者选择 -->
    <van-popup class="select" v-model="showExecutor" position="bottom">
      <div class="executor-content">
        <van-search
          show-action
          @cancel="handleShowExecutor"
          @input="handleExecutorSearch"
          @search="handleExecutorSearch"
          v-model="searchValue"
          shape="round"
          clearable
          placeholder="请输入搜索关键词"
        ></van-search>
        <van-checkbox-group v-model="executorResult">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in executorList"
              clickable
              :key="index"
              :title="`${item.realname}(${item.departname})`"
              @click="toggle(index)"
            >
              <van-checkbox :name="item" ref="checkboxes" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </van-popup>

    <!-- 公司客户选择 -->
    <van-popup class="select" v-model="showSelectCompany" position="bottom">
      <div class="select-company">
        <van-search
          show-action
          @cancel="CloseCompanySelect"
          @input="CompanySearch()"
          @search="CompanySearch()"
          v-model="searchValue"
          shape="round"
          clearable
          placeholder="请输入搜索关键词"
        >
          <div @click="changeLabel" slot="label">{{ label == 0 ? '公司' : label == 1 ? '客户' : '电话' }}</div>
        </van-search>
        <div @click="selectOne(item)" class="select-company-list" v-for="(item, index) in companyList" :key="index">
          <div class="list-top">
            <div>{{ item.name }}</div>
            <div>{{ item.encryTel }}</div>
          </div>
          <div class="list-bottom">{{ item.companyname }}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
  handleSeachCompany,
  SearchKJProductByCompanyId,
  SearchProductByCompanyId,
  addLegworkTask,
  addMarketLegworkTask,
  queryCodes,
  handleUserList,
  SearchRsp,
  SearchConfig,
  getLegworkType,
  addAccLegworkTask,
  getNum
} from './api';
import { formatDate } from '@/utils';
import Xheader from '../../layouts/Xheader.vue';
import { watch } from 'fs';

let AreaList: any[] = [];
let PlaceList: any[] = [];
@Component({
  components: {
    Xheader,
  },
})
export default class NewsTask extends Vue {
  private get selectDate() {
    return formatDate(this.currentDate.getTime(), 'yyyy-MM-dd HH:mm:ss');
  }
  private get executName() {
    return this.executorResult.map(v => v.realname).join(',');
  }
  private get executId() {
    return this.executorResult.map(v => v.id).join(',');
  }

  private get taskNameBus() {
    if (this.departName !== 'BUSSINESS' && this.mainFrom.companyname) {
      this.taskName = `${this.mainFrom.companyname}--${this.mainFrom.product}--${this.mainFrom.legName}`;
      return `${this.mainFrom.companyname || ''}--${this.mainFrom.product || ''}--${this.mainFrom.legName || ''}`;
    }
    return this.taskName;
  }
  private set taskNameBus(newVale) {
    this.taskName = newVale;
  }
  private num  : any = 999;
  private numList = {
    remainderA:'',
    remainderB:'',
  };
  private taskName = '';
  private departName = '';
  private mainFrom = {
    businessId: '',
    companyname: '',
    companyId: '',
    name: '',
    taskKind: '',
    tel: '',
    product: '',
    taskPlace: '税局',
    taskArea: '天河',
    taskPlaceCode: 'shuiju',
    taskAreaCode: 'tianhe',
    sPlanDate: '',
    workFlowStatus: '',
    workNode: '是',
    customerid: '',
    legName: '',
    legType: 'A',
    legTypeId: '',
  };
  private label: number = 0; //0 为公司 1 为客户
  private followResult = {
    typecode: '',
    typename: '',
  };
  //控制弹窗进行选择
  private showSelectCompany: boolean = false;
  private showSelectTime: boolean = false;
  private showArea: boolean = false;
  private showPlace: boolean = false;
  private showCompany: boolean = false;
  private showProduct: boolean = false;
  private showFollowStage: boolean = false;
  private showlegName: boolean = false;

  private searchValue: string = '';
  private showExecutor: boolean = false;

  private legNameList: any[] = [];
  private executorList: any[] = [];
  private valueOption: number = 0;
  private currentDate = new Date(new Date().getTime() + 3600000);
  private executorBoxes = [];
  private executorResult = [];

  private followStageList = [];
  private companyList = [];
  private productList = [];
  private areaList = [];
  private placeList = [];

  async handleCompanySelect(label) {
    this.label = label;
    this.showSelectCompany = true;
  }
  CloseCompanySelect() {
    this.showSelectCompany = false;
  }
  changeLabel() {
    this.label = this.label == 0 ? 1 : 0;
  }
  async changeLegName() {
    this.legNameList = await getLegworkType(this.mainFrom.legType);
    if(this.mainFrom.legType =='A'){
      this.num = this.numList.remainderA
    }else if(this.mainFrom.legType =='B'){
      this.num = this.numList.remainderB
    } else {
      this.num = 999

    }
    if (this.legNameList.length) {
      this.selectlegName(this.legNameList[0]);
    }
  }
  async CompanySearch(companyname) {
    let { searchValue, label } = this;
    let config: SearchConfig = {
      companyname: '',
      name: '',
      tel: '',
    };
    if (companyname) {
      config.companyname = companyname;
      this.companyList = await handleSeachCompany(config);
    } else {
      const regMobile = /^0?1[3|4|5|8][0-9]\d{8}$/;
      if (regMobile.test(searchValue) || label == 2) {
        config.tel = searchValue;
      } else {
        label == 0 ? (config.companyname = searchValue) : (config.name = searchValue);
      }

      this.companyList = await handleSeachCompany(config);
      console.log(this.companyList);
    }
  }
  handleSelectTime() {
    this.showSelectTime = true;
  }
  confirmTime() {
    this.showSelectTime = false;
  }
  handleShowExecutor() {
    this.showExecutor = !this.showExecutor;
    this.showExecutor && this.handleExecutorSearch();
  }
  selectOne({ companyname, name, tel,encryTel, customerid, companyid }) {
    this.mainFrom = Object.assign(this.mainFrom, {
      companyname,
      name,
      tel:encryTel,
      customerid,
      companyId: companyid,
    });

    this.showSelectCompany = false;
  }
  selectArea({ typename, typecode }) {
    let { mainFrom } = this;
    mainFrom.taskArea = typename;
    mainFrom.taskAreaCode = typecode;
    this.hanldeShowArea();
  }
  selectPlace({ typename, typecode }) {
    this.mainFrom.taskPlace = typename;
    this.mainFrom.taskPlaceCode = typecode;
    this.hanldeShowPlace();
  }
  selectProduct({ businessId, product, taskKind = '' ,companyid}) {
    this.mainFrom.businessId = businessId;
    this.mainFrom.product = product;
    // this.mainFrom.companyId = companyid;
    // console.log(this.mainFrom.companyId)
    if (this.departName == 'ACCOUNT') {
      this.mainFrom.taskKind = taskKind;
    }
    this.hanldeShowProduct();
  }
  selectlegName({ legwork_name, id }) {
    this.mainFrom.legName = legwork_name;
    this.mainFrom.legTypeId = id;
    this.showlegName = false;
  }
  handleselectCompany({ companyid, companyname }) {
    this.mainFrom.companyname = companyname;
    this.mainFrom.companyId = companyid;

    if (this.departName == 'ACCOUNT') {
      this.handleKJProductList(companyid);
      this.getNum(companyid)
    } else {
      this.handleProductList(companyid);
    }

    this.showCompany = false;
    this.searchValue = '';
  }
  async handleKJProductList(companyid) {
    this.productList = await SearchKJProductByCompanyId(companyid);
    if (this.productList.length) {
      this.mainFrom.product = this.productList[0].product;
      this.mainFrom.businessId = this.productList[0].businessId;
      this.mainFrom.taskKind = this.productList[0].taskKind;
      if (this.mainFrom.taskKind == 'tkLegAccCyc') {
        this.changeLegName();
      }
    } else {
      this.mainFrom.product = '';
      this.mainFrom.businessId = '';
      this.mainFrom.taskKind = '';
    }
  }
  async handleProductList(companyid) {
    this.productList = await SearchProductByCompanyId(companyid);
    if (this.productList.length) {
      this.mainFrom.product = this.productList[0].product;
      this.mainFrom.businessId = this.productList[0].businessId;
    }
  }

  async getNum(companyid) {
      this.numList = await getNum(companyid);
    }

  hanldeShowArea() {
    this.areaList = AreaList;
    this.showArea = !this.showArea;
  }
  hanldeShowPlace() {
    this.placeList = PlaceList;
    this.showPlace = !this.showPlace;
  }
  hanldeShowProduct() {
    this.showProduct = !this.showProduct;
  }

  deleteExecutor(index) {
    this.executorResult.splice(index, 1);
  }

  toggle(index) {
    this.$refs.checkboxes[index].toggle();
    console.log(this.executorResult);
  }
  filterSearch() {
    let { showArea, searchValue } = this;
    if (showArea) {
      this.areaList = AreaList.filter(v => v.typename! == searchValue);
    } else {
      this.placeList = PlaceList.filter(v => v.typename! == searchValue);
    }

    this.searchValue = '';
  }
  selectFollowStage(e) {
    this.followResult = e;
    this.showFollowStage = false;
  }
  handleShowFollowStage() {
    this.showFollowStage = !this.showFollowStage;
  }
  async handleshowCompany() {
    this.showCompany = !this.showCompany;
  }
  async hanldeShowlegName() {
    this.showlegName = !this.showlegName;
    this.legNameList = await getLegworkType(this.mainFrom.legType);
  }
  async HandleAddLegworkTask() {
    const { mainFrom, selectDate, executName, executId, taskName, departName,num } = this;
    // 表单验证
    let sumbitfunc;
    // 组装数据
    let config: any = {
      sPlanDate: selectDate,
      taskName,
      executorName: executName,
      executorId: executId,
      companyId: mainFrom.companyId,
      businessId: mainFrom.businessId,
    };

    if (departName == 'MARKET') {
      config = Object.assign(config, {
        followResult: this.followResult.typecode,
        customerId: mainFrom.customerid,
      });
      if (config.followResult == 'Visit' || config.followResult == 'Party') {
        delete config.companyId;
        delete config.customerId;
      }
      delete config.businessId;
      sumbitfunc = addMarketLegworkTask;
    }

    if (departName == 'BUSSINESS') {
      config = Object.assign(config, {
        workFlowStatus: mainFrom.workNode == '是' ? 'Y' : 'N',
        businessId: mainFrom.businessId,
        taskKind: 'tkLegBus',
        taskPlace: mainFrom.taskPlaceCode,
        taskArea: mainFrom.taskAreaCode,
      });
      sumbitfunc = addLegworkTask;
    }

    if (this.departName == 'ACCOUNT') {
      if (mainFrom.taskKind == 'tkLegAccCyc') {
        if (num<=0) {
          return this.$toast.fail('剩余次数不够');
        } else{
          config = Object.assign(config, {
                    legTypeId: mainFrom.legTypeId,
                    legType: mainFrom.legType,
                    legName: mainFrom.legName,
                    taskKind: mainFrom.taskKind,
                  });
        }
      } else if (mainFrom.taskKind == 'tkLegAcc') {
        config = Object.assign(config, {
          taskKind: mainFrom.taskKind,
          taskArea: mainFrom.taskAreaCode,
          taskPlace: mainFrom.taskPlaceCode,
        });
      } else {
        config = Object.assign(config, {
          taskKind: mainFrom.taskKind,
        });
      }
      sumbitfunc = addAccLegworkTask;
    }

    console.warn(config);
    if (departName == 'MARKET') {
      if (config.followResult == 'Visit' || config.followResult == 'Party') {
        if (!config.taskName || !config.executorId) {
          return this.$toast.fail('请补全信息');
        }
      } else if (
        (!config.companyId && !config.customerId) ||
        !config.taskName ||
        !config.followResult ||
        !config.executorId
      ) {
        return this.$toast.fail('请补全信息');
      }
    } else {
      for (let key in config) {
        if (!config[key]) {
          return this.$toast.fail('请补全信息');
        }
      }
    }

    try {
      await sumbitfunc(config);
      this.$toast.success('保存成功');

      setTimeout(() => {
        this.$router.push({ name: 'MyTaskIndex' });
      }, 1000);
    } catch (error) {}
  }

  async handleExecutorSearch() {
    let { searchValue } = this;
    let resp = await handleUserList(searchValue);
    if (resp.rows) {
      this.executorList = resp.rows.map(v => {
        return {
          realname: v.realname,
          departname: v.departname,
          id: v.id,
        };
      });
    }
  }
  // 生命周期
  async created() {
    // 获取当前登录用户的信息
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      this.departName = user.departs[0].aliasCode;
      this.executorResult.push({
        id: user.user.id,
        realname: user.user.realname,
        departname: user.departs[0].departname,
      });
    } catch (error) {}

    let { gzbusinessarea, gzbusinessplace, followStage } = await queryCodes([
      'gzbusinessarea',
      'gzbusinessplace',
      'followStage',
    ]);
    AreaList = gzbusinessarea;
    PlaceList = gzbusinessplace;
    this.followStageList = followStage;
    this.followResult = this.followStageList[0];

    this.companyList = await handleSeachCompany({} as any);
  }
}
</script>
<style scoped lang="scss">
.main {
  width: 100%;
  //

  &-body {
    background-color: rgb(247, 247, 247);
    padding: 0.3rem;
    height: 77vh;
    padding-bottom: 1.4rem;
    border-radius: 6px;

    &-text {
      margin-top: 0.3rem;
      // border: 1px solid rgb(247, 247, 247);
    }

    &-radio {
      font-size: 0.37333rem;
      display: flex;
      box-sizing: border-box;
      padding: 0.26667rem 0.4rem;
      line-height: 0.64rem;
      text-align: center;
      background-color: #fff;

      .radio {
        &-label {
          max-width: 2.4rem;
          min-width: 2.4rem;
          flex: 1;
        }
        &-node {
          display: flex;
          flex-wrap: wrap;
          .van-radio {
            margin: 0 0.3rem;
          }
        }
      }
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
    background-color: rgb(247, 247, 247);
    &-company {
      height: 100vh;
      &-list {
        font-size: 0.37333rem;
        overflow: hidden;
        margin: 0.2rem;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 0.2rem;
        align-content: center;
        border-bottom: 1px solid rgba(227, 227, 227, 0.6);

        .list {
          &-top {
            flex-wrap: wrap;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          &-bottom {
            margin: 0.2rem 0;
            text-align: left;
          }
        }
      }
    }
  }
  .executor-content {
    height: 50vh;
    overflow: auto;
  }

  .area-content {
    position: relative;
    height: 50vh;
    overflow: auto;
    &-search {
      position: sticky;
    }
    &-item {
      font-size: 0.37333rem;
      box-sizing: border-box;
      padding: 0.26667rem 0.4rem;
      line-height: 0.64rem;
      text-align: center;
      background-color: #fff;
    }
  }
}
</style>