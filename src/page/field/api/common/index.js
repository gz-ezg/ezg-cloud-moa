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
function fieldCompanyList(config) {
  // let url = 'legwork/apiQueryCompanyOrCustomerMsg'
	let url = 'customer/company/list'
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url, config))
  }).catch((err) => {
    return err
  })
}

function fieldCustomerList(config) {
  // let url = 'legwork/apiQueryCompanyOrCustomerMsg'
	let url = 'customer/list'
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url, config))
  }).catch((err) => {
    return err
  })
}

function getDictionary(config) {
  let url = `system/tsType/queryTsTypeByGroupCodes`
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url, config))
  }).catch((err) => {
    return err
  })
}

function getWxTicker(config) {
  let url = `system/wechat/company/js_api_ticket`
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url, config))
  }).catch((err) => {
    return err
  })
}

function getRealAdd(config) {
  let url = `system/wechat/address/location`
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url, config))
  }).catch((err) => {
    return err
  })
}

function getWorkOrderByCompanyId(config) {
  let url = `legwork/apiCheckWorkorderByCompanyid`
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

function getAccountList(config) {
  let url = `legwork/apiCheckAccountMsg`
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
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

function beginLegwork(config) {
  let url = '/user/legwork/begin';
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

function taskImgUpload(config) {
  let url = '/user/legwork/task/img/upload';
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

function endLegwork(config) {
  let url = '/user/legwork/end';
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

function getCheckTaskLegwork(config){
  let url = `/user/legwork/check/status`;
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url,config))
  }).catch((err) => {
    return err
  })
}

export {
  fieldCompanyList,
	fieldCustomerList,
  getDictionary,
  getWxTicker,
  getRealAdd,
  getWorkOrderByCompanyId,
  getAccountList,
  getTaskPropertyDetailByTaskId,
  beginLegwork,
  taskImgUpload,
  endLegwork,
  getCheckTaskLegwork
}
