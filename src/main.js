import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
// import VueWechatTitle from 'vue-wechat-title'
import 'lib-flexible/flexible.js'
import api from '../api/axiosConfig'
// Vue.use(VueWechatTitle)
Vue.prototype.$axios = axios;
Vue.prototype.$http = api;


router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    document.title = route.meta.title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const hackIframe = document.createElement('iframe');
      hackIframe.style.display = 'none';
      hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
      document.body.appendChild(hackIframe);
      setTimeout(_ => {
        document.body.removeChild(hackIframe)
      }, 300)
    }
  }
});


// router.beforeEach((to,from,next)=>{
//   // console.log(to);
//   // console.log(from);
//   let flag= false;
//   if(flag){
//    // Toast('跳转成功');
//     next();
//   }else {
//     //没有登录，去跳转登录页
//     if(to.path === '/index'){
//       alert('你还未登录')
//         window.history.back(-1); 
//     }else {
//       next({
//         path:'/index'
//       });
//     }
//   }
// });



Vue.use(Vant);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
