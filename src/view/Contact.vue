<template>
  <div class="contact fadeInBlur">
    <img src="../assets/glm2.jpg" alt="" width="200">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data (){
    return {
      msg: 'Contact page'
    }
  }
}
</script>
<style lang="scss" scoped>
  .contact{
    width: 1000px;
    margin:0 auto;
    padding-top: 200px;
    color: white;
    text-align: center;
  }
</style>
