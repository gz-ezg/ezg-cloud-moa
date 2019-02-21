/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/**
 * title：压缩图片库
 * 回调函数机制还是比较好用，高深的promise待定
 * @param {图片对象} file
 * @param {压缩后图片置入} files_array
 */
export function yasuo(file) {
  const ready = new FileReader();
  ready.readAsDataURL(file);
  return new Promise((resolve) => {
    ready.onload = function () {
      const re = this.result;
      canvasDataURL(re, (e) => {
        resolve(e);
      });
    };
  });
}

function canvasDataURL(path, callback) {
  const img = new Image();
  img.src = path;
  img.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    ctx.drawImage(this, 0, 0, 800, 600); // 重绘成800*600 canvas
    const base64 = canvas.toDataURL('image/jpeg', 0.7); // 图片质量
    // console.log(convertBase64UrlToBlob(base64))
    callback(convertBase64UrlToBlob(base64));
    // return convertBase64UrlToBlob(base64)
  };
}

function convertBase64UrlToBlob(urlData) {
  const arr = urlData.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}


export function base64ToBlob(urlData) {
  const arr = urlData.split(',');
  const mime = arr[0].match(/:(.*?);/)[1]
  // 去掉url的头，并转化为byte
  const bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  const ia = new Uint8Array(ab);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: mime,
  });
}
