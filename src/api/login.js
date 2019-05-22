/* eslint-disable arrow-body-style */
import {
  AjaxGet,
  AjaxPost,
} from '@api/index';

function userLogin(config) {
  const url = 'user/login';
  return new Promise((resolve,reject) => {
    resolve(AjaxPost(url, config));
  }).catch((err) => {
    reject(err) ;
  });
}

// function checkUserRoleByUserId(id) {
//   const url = `user/checkUserRoleByUserId?userId=${id}`;
//   return new Promise((resolve) => {
//     resolve(AjaxGet(url));
//   }).catch((err) => {
//     return err;
//   });
// }

function getInterfaceItemByUserId() {
  const url = 'menu/getInterfaceItemByUserId';
  return new Promise((resolve) => {
    resolve(AjaxGet(url));
  }).catch((err) => {
    return err;
  });
}

function getUserInfo() {
  const url = 'user/login/detail';
  return new Promise((resolve) => {
    resolve(AjaxGet(url));
  }).catch((err) => {
    return err;
  });
}

function logOut() {
  const url = 'user/logOut';
  return new Promise((resolve) => {
    resolve(AjaxGet(url));
  }).catch((err) => {
    return err;
  });
}

export {
  userLogin,
  // checkUserRoleByUserId,
  getInterfaceItemByUserId,
  getUserInfo,
  logOut,
};
