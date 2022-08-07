<template>
  <div ref="char" class="char"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  methods: {
    init() {
      let myChart = echarts.init(this.$refs.char)
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '30px',
          right: '2%',
          bottom: '10%',
          top: '12%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

          axisTick: {
            lineStyle: { color: '#a2a2a2' }
          },
          axisLine: {
            lineStyle: {
              color: '#a2a2a2'
            }
          },
          axisLabel: {
            color: '#a2a2a2'
            //X轴标签 label 做了特殊处理，防止左右溢出
            // formatter: (value, index) => {
            //   if (index === 0 || index === xAxisData.length - 1) {
            //     return ''
            //   }
            //   return value
            // }
          }
        },

        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        color: ['#5487ff', '#ff6d8a'],
        series: [
          {
            type: 'bar',
            barWidth: '15px',
            data: [10, 52, 200, 334, 390, 330, 220]
          },
          {
            barWidth: '15px',
            type: 'bar',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      myChart.setOption(option)
    }
  },

  components: {},

  computed: {},

  mounted() {
    this.init()
  },

  created() {}
}
</script>
<style lang="scss" scoped>
.char {
  width: 100%;
  height: 100%;
}
</style>
