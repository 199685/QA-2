// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';


import 'bootstrap'; 
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '@fortawesome/fontawesome-free/css/all.min.css'
import numeral from 'numeral';
window.numeral = numeral;

import $ from 'jquery';
window.$ = $;
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency'
import percentFilter from './filters/percent'
import dateFilter from './filters/date'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

Vue.component('Loading', Loading);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.filter('currency', currencyFilter)
Vue.filter('percent', percentFilter)
Vue.filter('date', dateFilter)




// axios.defaults.withCredentials = true; //存cookies
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
});

router.beforeEach((to, from, next) => {
  // console.log('to', to);
  // console.log('from', from);
  // console.log('next', next);


  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`; //加admin是為了存cookies
    // const vm =this
    axios.post(api).then((response) => {
      // console.log(response.data)
      if (response.data.success) {
        // vm.$router.push('/index')
        next();
      } else {
        next({
          path: '/login'
        })
      }
    })

  } else {
    next()
  }
})
