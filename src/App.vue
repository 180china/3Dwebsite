<template>
  <div class="page" id="app">
    <Nav></Nav>
    <router-view/>
    <!--<div class="tips">-->
      <!--<p>3</p>-->
      <!--<div class="yi"></div>-->
      <!--<p>20</p>-->
    <!--</div>-->
  </div>
</template>

<script>
import Nav from './view/Nav.vue'
export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>
