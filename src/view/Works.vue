<template>
  <div class="works fadeInBlur">
    <div class="cotainer">
      <!--<Page></Page>-->
      <div class="item" v-for="(val,index) in list" v-bind:data-index="index">
        <div class="item-desc" data-type="sprite" v-bind:data-offsety="Math.random()*100+500">
          <h2 v-text="val.brand"></h2>
          <h3 v-text="val.pro_name"></h3>
          <p v-html="val.desc"></p>
        </div>
        <div class="item-img" data-type="sprite" v-bind:data-offsety="Math.random()*400+100">
          <div class="item-img-out">
            <img :src='"static/img/pro/"+val.name+"_"+val.time+".jpg"' width='250' alt=""/>
          </div>
        </div>
      </div>
    </div>
    <div class="br-view">
      <div class="tips">
        <p v-html="(current+1)"></p>
        <div class="yi"></div>
        <p v-html="list.length">20</p>
      </div>
      <div class="back-to-top-wrapper" id="back_top">
        <a href="javascript:void(0);" class="back-to-top" @click="backTop" title="Back to top">
          <svg viewBox="0 0 100 100" width="25px" height="25px" tabindex="-1" role="img" aria-labelledby="title">
            <title id="title">Back to top</title>
            <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" transform="translate(0 0) rotate(90 50 50)" fill="#fff" stroke="#fff"></path>
            <image src="../assets/back-to-top-arrow.png" alt="Back to top arrow" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="" width="100%" height="100%"></image>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import Page from './page.vue';
import works from '../data/works.json'
export default {
  name: 'works',
  data:function(){
    return {
      list:works,
      current:0,
    }
  },
  computed:{
    imgsrc(){
      return `../assets/pro/glm1.jpg`;
    }
  },
  methods:{
    backTop(){
      $(window).scrollTop(0);
    },
    onScroll(){
      //1：$window.scrollTop()  当钱滚动条相对于顶部的偏移量
      //2：$window.height() window的高度
      //3：document.body.clientHeight 文档的高度
      // 1+2=3
      //console.log($window.scrollTop()/(document.body.clientHeight-$window.height()));
      let _this=this;
      let $window=$(window);
      let $windowHeight=$window.height();
      let $windowScrollTop=$window.scrollTop();

      $('.item').each(function(){
        let $self = $(this);
        let $selfHeight=$self.height();
        let $selfOffsetTop = $self.offset().top;
        if (($windowScrollTop + $windowHeight) > ($selfOffsetTop) && (($selfOffsetTop + $self.height()) > $windowScrollTop)) {

          let a=($selfOffsetTop-$windowScrollTop);
          let b=($windowHeight-$selfHeight);
          let c=a/b;

          $('[data-type="sprite"]', $self).each(function() {
            let $sprite = $(this);
            let maxOffsety=$sprite.data('offsety');
            let offsety=maxOffsety*(c-0.5);

            $sprite.css({
              transform: 'translate(0px, '+offsety+'px)'
            });
          });

          $self.data('')
        };

        if(($selfOffsetTop - $windowScrollTop) < ($windowHeight/2)){
          _this.current=$self.data('index');
          // console.log($selfOffsetTop,$windowHeight/2,$windowScrollTop,$self.data('index'),_this.current);
        }
      });
    }
  },
  mounted(){
    $(window).scroll(this.onScroll);

    $('.item img').each((i,el)=>{
      el.onload=(event)=>{
        this.onScroll();
        //console.log('on load');
      };
    });
  },
  components: {
    // Page
  }
}
</script>

<style lang="scss">
  @mixin css3($property,$value){
    @each $prefix in -webkit-,
    -moz-,
    -ms-,
    -o-,
    ''{
      #{$prefix}#{$property}:$value;
    }
  }
  @mixin position($position,$l:null,$t:null,$r:null,$b:null,$z:99) {
    position: $position;
    @if($l){
      left: $l;
    }
    @if($t){
      top:$t;
    }
    @if($r){
      right: $r;
    }
    @if($b){
      bottom: $b;
    }
    z-index: $z;
  }

  .works{
    /*background-color: #f5f5f5;*/
    /*position: relative;*/
    color: white;
  }

  .cotainer{
    width:1000px;
    height: auto;
    margin:0 auto;
    padding:300px 0;
  }

  .cotainer:after{
    content: '';
    clear: both;
    display: block;
  }

  div.item:nth-child(odd){
    clear: both;
    .item-desc{
      @include position(absolute,0,100px);
      text-align: right;
    }
    .item-img{
      float: right;
      margin-right: 20px;
    }
  }
  div.item:nth-child(even){
    .item-desc{
      @include position(absolute,null,300px,0);
    }
    .item-img{
      float: left;
      margin-left: 20px;
    }
  }

  .item{
    position:relative;
    width: 50%;
    height:auto;
    float: left;
    text-align: center;
    @include css3(transform,translate(0,0));
    div.item-desc{
      width: 40%;
      text-align: left;

      h2{
        font-size: 21px;
        color: white;
      }
      h3{
        font-size: 18px;
        color: white;
      }
      p{
        font-size: 12px;
        color: white;
        text-shadow: 0 0 10px rgba(255,0,0,0.95);
      }
      a{
        text-decoration: none;/*超链接无下划线*/
        background-color: transparent;
        color: #28bde8;

        &:hover,
        &:active,
        &:focus {
          text-decoration: none;
          color: #28bde8;
        }
        &:focus {
          outline: 0;
        }
      }
    }
    div.item-img{
      cursor:pointer;
      display: inline-block;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.4);
      line-height: 0;

      .item-img-out{
        @include css3(transition,all .3s);
      }

      &:hover .item-img-out{
        @include css3(transform,scale(1.02));
      }
    }
  }
</style>
