import Vue from 'vue';
import Skeleton from '../src/skeleton/skeleton';

export default new Vue({
  components: {
    Skeleton,
  },
  render: h => h(Skeleton),
});
