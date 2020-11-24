// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap'; 
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import $ from 'jquery';
window.$ = $;
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency'


Vue.component('Loading', Loading);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.filter('currency', currencyFilter)
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
