// 点击打开时候传入true禁止滚动穿透，关闭时候传入false恢复
export const scrollThrough = (function toggleForbidScrollThrough() {
  let scrollTop;
  return function scrollThroughInner(isForbide) {
    if (isForbide) {
      scrollTop = getScrollTop();
      // position fixed会使滚动位置丢失，所以利用top定位
      document.querySelector('#app').style.position = 'fixed'
      document.querySelector('.container').style.top = `-${scrollTop}px`;
    } else {
      // 恢复时，需要还原之前的滚动位置
      document.querySelector('#app').style.position = 'static'
      document.querySelector('.container').style.top = 0;
      window.scrollTo(0, scrollTop);
    }
  };
}());

export function getScrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop;
}

//当前是否在微信中
export function is_wexin() {
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}

//判断手机类型
export function mobile_mold() {
  var u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
    return 2
  } else if (u.indexOf('iPhone') > -1) {//苹果手机
    return 3
  } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
    return 1
  }
}
