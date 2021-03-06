// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import vueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import enLocale from 'element-ui/lib/locale/lang/en'
import thLocale from 'element-ui/lib/locale/lang/th'
import language from './language/language'
import config from '@/config/config';
import './assets/inpot_css/style.css'
import './assets/sass/common.scss';
import './assets/sass/element-variables.scss';
import '../static/fonts/psl.css';
import * as filters from './filters/filter';
// import '../src/assets/js/rem';

Vue.use(vueResource)
Vue.use(VueI18n)
const messages = {
  th: {
    message: language.th.message,
    ...thLocale // 或者用 Object.assign({ message: 'hello' }, thLocale)
  },
  en: {
    message: language.en.message,
    ...enLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  }
}
let locale = localStorage.getItem('dove-web-locale');
const defaultLanguage = 'th';
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: locale || defaultLanguage, // set locale
  messages, // set locale messages
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// Vue.use(animate)

Vue.config.productionTip = false

Vue.http.options.emulateJSON = false;
Vue.http.options.crossOrigin = true;
// Vue.http.options.emulateHTTP = true;
Vue.http.options.headers = {
  'Content-Type': 'application/json'
}
Vue.http.interceptors.push((request, next) => {
  let url = request.url;
  // https://pg-staging.paysec.com/Intrapay/paysec/v1/payIn/sendTokenForm 第三方支付请求的url 特殊处理
  if(url !== 'https://pg-staging.paysec.com/Intrapay/paysec/v1/payIn/sendTokenForm'){
    let TOKEN = localStorage.getItem('dove-web-token');
    if (TOKEN) {
      // 如果请求时TOKEN存在,就为每次请求的headers中设置好TOKENs
      // request.headers.set('authorization', TOKEN);
    }
    if (url) {
      // 如果url存在，拼接host+url;
      request.url = config.login + url;
    }
  }else{
    request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // request.headers.set('Access-Control-Allow-Origin', '*');
  }
  next((response) => {});
});

// 注册全局过滤器
Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
