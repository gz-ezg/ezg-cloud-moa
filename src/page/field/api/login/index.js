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
function userLogin(config) {
  let url = 'user/login'
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

/**
 * 获取用户角色
 * @param {*} id 
 * @param {*} config 
 * @param {*} success 
 * @param {*} fail 
 */
function checkUserRoleByUserId(id) {
  let url = 'user/checkUserRoleByUserId?userId=' + id
	//let url = 'user/login/detail'
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url))
  }).catch((err) => {
    return err
  })
}

/**
 * 获取外勤状态
 * @param {*} config 
 * @param {*} success 
 * @param {*} fail 
 */
function checkLoginUserlegworkPunchcardStatus() {
  // let url = `legwork/apiCheckLoginUserlegworkPunchcardStatus`
	let url = `user/legwork/check/status`
  return new Promise((resolve, reject) => {
    resolve(AjaxGet(url))
  }).catch((err) => {
    return err
  })
}

/**
 * 获取未完成的任务详情
 * @param {*} config 
 * @param {*} success 
 * @param {*} fail 
 */
function queryUnfinishedPunchCard() {
  let url = `legwork/apiQueryUnfinishedPunchCard`
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url))
  }).catch((err) => {
    return err
  })
}

function loginByWechatCode(config) {
  let url = `legwork/apiLoginByWechatCode`
  return new Promise((resolve, reject) => {
    resolve(AjaxPost(url, config))
  }).catch((err) => {
    return err
  })
}

export {
  userLogin,
  checkUserRoleByUserId,
  checkLoginUserlegworkPunchcardStatus,
  queryUnfinishedPunchCard,
  loginByWechatCode
}
