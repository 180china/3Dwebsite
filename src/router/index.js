import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/view/Home.vue';
import Works from '@/view/Works.vue';
import Contact from '@/view/Contact.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/works',
      name: 'works',
      component: Works
    },{
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
});
