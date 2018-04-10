<template>
  <div class="page" id="app">
    <Nav></Nav>
    <router-view/>
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
