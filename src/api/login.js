/* eslint-disable arrow-body-style */
import {
  AjaxGet,
  AjaxPost,
} from '@api/index';

function userLogin(config) {
  const url = 'user/login';
  return new Promise((resolve) => {
    resolve(AjaxPost(url, config));
  }).catch((err) => {
    return err;
  });
}

function checkUserRoleByUserId(id) {
  const url = `user/checkUserRoleByUserId?userId=${id}`;
  return new Promise((resolve) => {
    resolve(AjaxGet(url));
  }).catch((err) => {
    return err;
  });
}

export {
  userLogin,
  checkUserRoleByUserId,
};
