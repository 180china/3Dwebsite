<script>
import { HorizontalBar, mixins } from 'vue-chartjs'

export default {
  name: 'dayChart',
  extends: HorizontalBar,
  mixins: [ mixins.reactiveProp ],
  props: {
    chartData: { type: Array }
  },
  data () {
    return {
      option: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: { maxTicksLimit: 10,
              maxRotation: 0,
              fontFamily: 'Avenir Next',
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 2
            },
            gridLines: {
              display: false
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart({
      type: 'horizontalBar',
      labels: this.chartData['name'].slice(0, 20),
      datasets: [
        {
          label: 'USD',
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          fill: false,
          data: this.chartData['sharpe ratio'].slice(0, 20),
          pointRadius: 0
        }
      ]
    }, this.option)
  },
  watch: {
  }
}
</script>
