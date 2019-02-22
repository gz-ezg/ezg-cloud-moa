<template>
  <div>
    <router-view/>
    <!-- <van-button>点击</van-button> -->
    <!-- <div v-if="id"> -->
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
