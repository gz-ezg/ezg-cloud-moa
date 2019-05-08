import {
  AjaxGet,
  AjaxGet2,
  AjaxDic,
  AjaxPost
} from '@api/index';

/**
 * 登录
 * @param {*} config
 * @param {*} success
 * @param {*} fail
 */

function getToDoTaskListByUserId(config) {
	let url = '/task/getToDoTaskListByUserId';
  return new Promise((resolve, reject) => {
    resolve(AjaxGet2(url, config))
  }).catch((err) => {
    return err
  })
}

function getTaskPropertyDetailByTaskId(config) {
	let url = `/task/getTaskPropertyDetailByTaskId`;
  return new Promise((resolve, reject) => {
    resolve(AjaxGet2(url, config))
  }).catch((err) => {
    return err
  })
}

export {
  getToDoTaskListByUserId,
  getTaskPropertyDetailByTaskId
}
