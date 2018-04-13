<template>
  <div>
    <div class="container" >
      <!--<el-card class="box-card">-->
          <!--<el-main>-->
            <!--<div class="chart">-->
              <!--Sentiment Score:-->
              <!--<template>-->
                <!--<sentimentChart :chartData="info.sentiment.score" :width="300" :height="124" />-->
              <!--</template>-->
              <!--Sentiment Magnitude:-->
              <!--<template>-->
                <!--<sentimentChart :chartData="info.sentiment.mag" :width="300" :height="124" />-->
              <!--</template>-->
            <!--</div>-->
          <!--</el-main> -->
      <!--</el-card>-->

      <!--<el-card class="box-card">-->
          <!--<el-main>-->
            <!--<div class="chart">-->
              <!--Sharpe Ratio:-->
              <!--<template>-->
                <!--<sharpRatioChart :chartData="info.sharperatio" :width="300" :height="224" />-->
              <!--</template>-->
            <!--</div>-->
          <!--</el-main>-->
      <!--</el-card>-->

    </div>

  </div>
</template>

<script>
  import sentimentChart from './sentiment'
  import sharpRatioChart from './sharpRatio'

  export default {
    name: 'Page',
    data () {
      return {
        info: {},
      }
    },
    components: {
      sentimentChart,
      sharpRatioChart
    },
    created () {
      this.getPrice()
      // this.getSharpeRatio()
    },
    methods: {
      getPrice () {
        this.axios.get('http://116.62.100.69:5000/api/gethistsentiment')
          .then(res => {
            console.log('this:',this);
            /*if (res.status === 200) {
              this.$set(this.info, 'sentiment', res.data.data)
            }*/
          }).catch((error) => {
            console.log(error)
          })
      },
      getSharpeRatio () {
        this.axios.get('http://116.62.100.69:5000/api/getsharperatio')
          .then(res => {
            if (res.status === 200) {
              this.$set(this.info, 'sharperatio', res.data.data)
            }
          }).catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    margin-left: 15px;
    margin-right: 15px;
    font-family: 'Avenir Next', Helvetica, Arial, sans-serif;

  }

  @media only screen and (max-width: 1028px) {
    .box-card  {
      margin-left: 5%;
      margin-right: 5%;
    }
  }

  @media only screen and (min-width: 1029px) {
    .box-card  {
      margin-left: 30%;
      margin-right: 30%;
    }
  }

  .box-card  {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .name {
    position: relative;
    font-size: 18px;
    margin-left: 5px;
    line-height: 1.7em;
    color: #000;
    margin-bottom: 8px;
    cursor: pointer;
  }
  .price {
     color: #000;
     margin-left: 5px;
  }
  .percentchangeRed {
    position: relative;
    font-size: 12px;
    color: rgb(218, 22, 22);
  }
  .percentchangeGreen {
    position: relative;
    font-size: 12px;
    color: rgb(30, 180, 43);
  }
  .desc {
    font-size: 12px;
    margin-left: 5px;
  }
  .chart {
    margin-left: 5px;
  }
</style>
