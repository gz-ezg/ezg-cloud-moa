<template>
  <div>
    <van-nav-bar title="简历详情" class="navBarStyle" @click-left="$backTo()" left-arrow/>
    <van-row style="padding-bottom:60px">
      <van-cell-group>
        <van-cell title="姓名" :value="resumeData.name"/>
        <van-cell title="电话" :value="resumeData.tel"/>
        <van-cell title="性别" :value="resumeData.sex"/>
        <van-cell title="年龄" :value="resumeData.age"/>
        <van-cell title="岗位" :value="resumeData.post"/>
        <van-cell title="城市" :value="resumeData.city"/>
        <van-field v-model="resumeData.memo" placeholder="备注" type="textarea" disabled/>
        <div style="margin-top:10px;padding-bottom:20px;padding-left:20px">
          <div>{{resumeData.realpath.split("/")[2]}}</div>
          <img
            :src="'/api/assets/' + resumeData.realpath"
            alt="无法预览"
            style="width: 100px;height:100px"
          >
        </div>
      </van-cell-group>
    </van-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      resumeData: [],
    };
  },
  created() {
    // eslint-disable-next-line no-underscore-dangle
    const _self = this;
    _self.resumeData = JSON.parse(localStorage.getItem('resume'));
    // eslint-disable-next-line eqeqeq
    if (_self.resumeData.sex == '0') {
      _self.resumeData.sex = '男';
    } else {
      _self.resumeData.sex = '女';
    }
  }
}
</script>

