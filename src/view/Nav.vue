<template>
  <nav class="nav">
    <div data-route="" @click="clickNavItem"><img src="../assets/logo.png" alt="" width="30"></div>
    <div data-route="works" @click="clickNavItem">Works</div>
    <div data-route="contact" @click="clickNavItem">Contact</div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data: function(){
    return {
      currentNavIndex:0
    }
  },
  methods: {
    clickNavItem(event){
      var route=$(event.currentTarget).data('route');
      this.$router.push({ path: `/${route}`});
    },
    setNavStyle(){
      switch(this.$route.path){
        case '/works':
          this.currentNavIndex=1;
          // $('.tips').show();
          // this.$root.main.show('cube');
          break;
        case '/contact':
          this.currentNavIndex=2;
          // this.$root.main.show('cone');
          break;
        default :
          this.currentNavIndex=-1;
          // this.$root.main.show('cube');
          break;
      }
      this.$root.main.show();
      var items=$('.nav >div').removeClass('active');
      if(this.currentNavIndex!=-1){
        items.eq(this.currentNavIndex).addClass('active');
      }
    }
  },
  mounted(){
    this.setNavStyle();
    this.$router.beforeEach((to, from, next) => {
      next();
      this.setNavStyle();
    });
  }
}
</script>

<style scoped>

</style>
