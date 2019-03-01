<template>
  <div>
    <!-- <keep-alive> -->
    <!-- 需要写一个函数控制是否缓存页面 -->
    <!-- <router-view/> -->
    <!-- </keep-alive> -->
    <!-- <van-button>点击</van-button> -->
    <!-- <div v-if="id"> -->

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <company-list></company-list>
    <customer-list></customer-list>
    <type-list></type-list>
    <!-- </div> -->
  </div>
</template>

<script>
import companyList from '../page/field/components/common/function-components/companyList.vue';
import customerList from '../page/field/components/common/function-components/customerList.vue';
import TypeList from '../page/field/components/common/function-components/typeList.vue';

export default {
  components: {
    companyList,
    customerList,
    TypeList,
  },
  data() {
    return {};
  },
  computed: {
    id() {
      return this.$store.state.userId;
    },
  },
};
</script>
