<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  name: 'dayChart',
  extends: Line,
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
            ticks: { maxTicksLimit: 2,
              maxRotation: 0,
              fontFamily: 'Avenir Next'
            },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: false,
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
      type: 'line',
      labels: [...Array(140).keys()],
      datasets: [
        {
          label: 'USD',
          borderColor: '#f87979',
          fill: false,
          data: this.chartData,
          pointRadius: 0
        }
      ]
    }, this.option)
  },
  watch: {
  }
}
</script>
