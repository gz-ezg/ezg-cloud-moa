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
  let url = 'legwork/apiQueryCompanyOrCustomerMsg'
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

export {
  fieldCompanyList,
  getDictionary,
  getWxTicker,
  getRealAdd,
  getWorkOrderByCompanyId,
  getAccountList
}
