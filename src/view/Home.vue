<template>
  <div class="home fadeInBlur">
    <img src="../assets/glm1.jpg" width="200" alt="">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {

    }
  },
  computed:{
    title(){
      return `page name is ${this.$options.name}`;
    }
  },
  mounted(){
    //console.log(this);
  }
}
</script>

<style scoped>
  .home{
    color: white;
  }
</style>
