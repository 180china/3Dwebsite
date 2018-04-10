import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/view/Home.vue';
import Contact from '@/view/Contact.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
});
