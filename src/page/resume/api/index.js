/* eslint-disable arrow-body-style */
import {
  AjaxGet,
  AjaxPost,
} from '@api/index';

/**
 * 登录
 * @param {*} config
 * @param {*} success
 * @param {*} fail
 */
function resumeList(config) {
  const url = 'system/resource/resume/list';
  return new Promise((resolve) => {
    resolve(AjaxGet(url, config));
  }).catch((err) => {
    return err;
  });
}

function resumeCreate(config) {
  const url = 'zuul/system/resource/resume/create';
  return new Promise((resolve) => {
    resolve(AjaxPost(url, config));
  }).catch((err) => {
    return err;
  });
}

export {
  resumeList,
  resumeCreate,
};
