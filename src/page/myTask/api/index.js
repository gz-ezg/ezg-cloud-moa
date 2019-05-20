import {
  AjaxGet,
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
    resolve(AjaxGet(url, config))
  }).catch((err) => {
    return err
  })
}

function getTaskPropertyDetailByTaskId(config) {
	let url = `/task/getTaskPropertyDetailByTaskId`;
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url, config))
  }).catch((err) => {
    return err
  })
}

function getCheckTaskLegwork(config){
  let url = `/user/legwork/check/status`;
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url, config))
  }).catch((err) => {
    return err
  })
}

export {
  getToDoTaskListByUserId,
  getTaskPropertyDetailByTaskId,
  getCheckTaskLegwork
}
