<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <company-list></company-list>
    <customer-list></customer-list>
    <type-list></type-list>
  </div>
</template>

<script>
//  以下三个页面可以改为通用，大部分业务需要用到
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
