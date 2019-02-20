// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import iView from 'iview'
import fastclick from 'fastclick'
import VueCookie from 'vue-cookie'
import VueQriously from 'vue-qriously'

import 'iview/dist/styles/iview.css';

fastclick.attach(document.body)

Vue.config.productionTip = false
//屏蔽所有控制台错误
Vue.config.errorHandler = (err, vm, info) => {
}

Vue.prototype.$http = axios

Vue.use(iView);
Vue.use(VueCookie)
Vue.use(VueQriously)

//loading进度条加载
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  window.scrollTo(0, 0);
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
