<template>
  <div>
    <van-button to="marketIndex">点击</van-button>
    <div v-if="id">
      <company-list></company-list>
      <customer-list></customer-list>
      <type-list></type-list>
    </div>
  </div>
</template>

<script>
import companyList from './components/common/function-components/companyList.vue';
import customerList from './components/common/function-components/customerList.vue';
import TypeList from './components/common/function-components/typeList.vue';

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
