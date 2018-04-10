import './css/style.css';

import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

import { Main } from './thr/Main.js';

var main=new Main();
main.init();

var data={
  main:main
};

new Vue({
  el: '#app',
  data:function(){
    return data;
  },
  router,
  components: { App },
  template: '<App/>',
  mounted(){

  }
});
