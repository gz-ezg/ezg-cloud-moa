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
function saveLegworkVisitMsg(config) {
  // let url = 'zuul/legwork/apiSaveLegworkVisitMsg'
	let url = 'user/legwork/begin/customer/maintain'
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

function saveLegworkLeaveVisitMsg(config) {
  let url = 'zuul/legwork/apiSaveLegworkLeaveVisitMsg'
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

function queryUnfinishedPunchCard() {
  // let url = `legwork/apiQueryUnfinishedPunchCard`
	let url = `user/legwork/check/status`
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url))
  }).catch((err) => {
    return err
  })
}

function saveAccountAffirmLegworkMsg(config) {
  let url = `legwork/apiSaveAccountAffirmLegworkMsg`
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

function getAccountAffirmLegworkMsg() {
  let url = `legwork/apiAccountAffirmLegworkMsg`
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url))
  }).catch((err) => {
    return err
  })
}

function orderNext(config) {
  let url = `order/next`
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

export {
  saveLegworkVisitMsg,
  saveLegworkLeaveVisitMsg,
  queryUnfinishedPunchCard,
  getAccountAffirmLegworkMsg,
  saveAccountAffirmLegworkMsg,
  orderNext
}
