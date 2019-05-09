/* eslint-disable arrow-body-style */
import axios from 'axios';
import Toast from 'vant/lib/toast';
import 'vant/lib/toast/style';
import router from '../router/index.js';

axios.interceptors.request.use(
  (config) => {
    //  菊花转
    // Toast.loading({
    //   duration: 0,
    //   mask: true,
    //   message: '加载中...',
    // });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    Toast.clear();
    //  检测是否未登录
    if (response.data.msgCode === '50003') {
      Toast.fail('登录失效！');
      router.push({
        name: 'Login',
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//  默认异常处理方法
function commonFail(err) {
  console.log('=== fail ===');
  console.log(err);
  if (err.status === 200) {
    Toast.fail(err.data.msg);
  } else {
    Toast.fail(`服务器异常! ${err.message}`);
  }
  // return false
}

//  通用get方法
function AjaxGet(url, config, success, fail = commonFail) {
  const baseUrl = `api/${url}`;
  return new Promise((resolve, reject) => {
    axios.get(baseUrl,config).then((res) => {
      if (res.status === 200 && res.data.msgCode === '40000') {
        Toast.clear();
        resolve(res.data.data);
      } else {
        fail(res);
      }
    }).catch((err) => {
      reject(fail(err));
    });
  });
}

//  通用post方法
function AjaxPost(url, config, success, fail = commonFail) {
  const baseUrl = `api/${url}`;
  return new Promise((resolve, reject) => {
    axios.post(baseUrl, config).then((res) => {
      if (res.status === 200 && res.data.msgCode === '40000') {
        Toast.success(res.data.msg);
        resolve({
          status: true,
          data: res.data,
        });
      } else {
        Toast.fail(res.data.msg);
        resolve({
          status: false,
          data: res.data,
        });
      }
    }).catch((err) => {
      reject(fail(err));
    });
  });
}

//  通用获取数据字典方法
function AjaxDic(params, fail = commonFail) {
  const config = {
    params: {
      groupCodes: params,
    },
  };
  const baseUrl = 'api/system/tsType/queryTsTypeByGroupCodes';
  return new Promise((resolve, reject) => {
    axios.get(baseUrl, config).then((res) => {
      if (res.status === 200 && res.data.msgCode === '40000') {
        resolve(res.data.data);
      } else {
        fail(res);
      }
    }).catch((err) => {
      reject(fail(err));
    });
  });
}

export {
  AjaxGet,
  AjaxDic,
  AjaxPost
};
