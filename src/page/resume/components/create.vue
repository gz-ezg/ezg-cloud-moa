
<template>
  <div>
    <van-nav-bar title="创建简历" class="navBarStyle" @click-left="$backTo()" left-arrow/>
    <van-row style="padding-bottom:60px">
      <van-cell-group>
        <van-field v-model="name" label="姓名" placeholder="请输入姓名" required/>
        <van-field v-model="tel" label="电话" placeholder="请输入电话" required/>
        <div style="display:flex;justify-content:center;" class="van-cell">
          <span style="max-width:24vw;flex:1" class="van-cell--required">性别</span>
          <span style="flex:1;">
            <van-radio-group v-model="sex" style="padding-top:5px;line-height:2em">
              <van-row>
                <van-col span="12">
                  <van-radio name="0" style="font-size:14px;line-height:1.6em">男</van-radio>
                </van-col>
                <van-col span="12">
                  <van-radio name="1" style="font-size:14px;line-height:1.6em">女</van-radio>
                </van-col>
              </van-row>
            </van-radio-group>
          </span>
        </div>
        <van-field v-model="age" label="年龄" placeholder="请输入年龄"/>
        <van-field v-model="post" label="岗位" placeholder="请输入岗位" required/>
        <van-field v-model="city" label="城市" placeholder="请输入城市" required/>
        <van-field v-model="memo" placeholder="备注" type="textarea"/>
        <div style="width:80%;margin:auto;padding-bottom:20px;margin-top:20px">
          <center>
            <van-uploader accept="*" :before-read="upload">
              <van-icon name="photograph"/>
              <span>点击上传文件</span>
            </van-uploader>
          </center>
        </div>
        <div style="margin-top:10px;padding-bottom:20px">
          <van-row v-for="(item,index) in show_img" :key="index">
            <van-col style="margin-left:3px;margin-right:3px" span="24">
              <!-- <img :src='item.src' alt='Ballade' style='width: 100px;height:100px'/> -->
              <van-icon
                name="close"
                @click="show_img.splice(index, 1);file_array.splice(index, 1);"
              />
              <span style="padding-left:10px;padding-right:10px">{{item.name}}</span>
            </van-col>
          </van-row>
        </div>
      </van-cell-group>
    </van-row>
    <van-row style="position:fixed;bottom:0;width:100%">
      <center>
        <van-button
          size="large"
          style="width:100%;"
          type="danger"
          @click="submit_resume"
          :loading="loading"
        >保存</van-button>
      </center>
    </van-row>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Schema from 'async-validator';
import { resumeCreate } from '../api/index';

export default {
  data() {
    return {
      sex: '0',
      name: '',
      age: '',
      city: '广州',
      post: '',
      memo: '',
      tel: '',
      file_array: [],
      show_img: [],
      loading: false,
    };
  },
  methods: {
    submit_resume() {
      // eslint-disable-next-line no-underscore-dangle
      const _self = this;
      const descriptor = {
        name: { type: 'string', required: true, message: '请输入姓名！' },
        tel: { type: 'string', required: true, message: '请输入电话！' },
        sex: { type: 'string', required: true, message: '请选择性别！' },
        post: { type: 'string', required: true, message: '请输入岗位！' },
        city: { type: 'string', required: true, message: '请输入城市！' },
        file_array: { type: 'array', required: true, message: '请上传文件！' },
      };
      const validator = new Schema(descriptor);
      validator.validate(
        {
          name: _self.name,
          tel: _self.tel,
          sex: _self.sex,
          post: _self.post,
          city: _self.city,
          file_array: _self.file_array,
          // eslint-disable-next-line consistent-return
        }, (errors, fields) => {
          if (errors) {
            console.log(errors);
            // console.log(fields)
            //  这里写一个异常处理函数，弹窗
            _self.$toast.fail(errors[0].message);
            return 1;
            // return handleErrors(errors, fields);
            // eslint-disable-next-line no-else-return
          } else {
            _self.submit();
          }
        },
      );
    },
    async submit() {
      this.loading = true;
      // const url = `api/zuul/system/resource/resume/create`;
      const formdata = new FormData();

      formdata.append('name', this.name);
      formdata.append('age', this.age);
      formdata.append('sex', this.sex);
      formdata.append('post', this.post);
      formdata.append('city', this.city);
      formdata.append('memo', this.memo);
      formdata.append('tel', this.tel);
      formdata.append('file', this.file_array[0]);

      const { status, data } = await resumeCreate();
      if (status) {
        this.loading = false;
        this.name = '';
        this.age = '';
        this.post = '';
        this.post = '';
        this.tel = '';
        this.file_array = [];
        this.memo = '';
        this.show_img = [];
      }
      this.loading = false;
    },
    upload(e) {
      // eslint-disable-next-line no-underscore-dangle
      const _self = this;
      _self.file_array.push(e);
      // let img = yasuo(e,_self.img_array)
      const reader = new FileReader();
      reader.readAsDataURL(e);
      const filename = e.name;
      // eslint-disable-next-line func-names
      reader.onload = function () {
        const imgMsg = {
          name: filename,
          src: this.result,
        };
        _self.show_img.push(imgMsg);
      };
    },
  },
};
</script>
