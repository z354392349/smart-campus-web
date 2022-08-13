<template>
  <div ref="char" class="char"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: ['type', 'charData'],
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
          containLabel: false
        },

        xAxis: {
          type: 'category',
          data: this.charData.time,

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
        color: this.type == 1 ? ['#5487ff', '#ff6d8a'] : ['#ff6d8a', '#5487ff'],
        series: [
          {
            type: 'bar',
            barWidth: '15px',
            data: this.charData.data
          }
        ]
      }
      myChart.setOption(option)
    }
  },

  components: {},

  computed: {},

  mounted() {
    setTimeout(() => {
      this.init()
    }, 4000)
  },
  created() {}
}
</script>
<style lang="scss" scoped></style>
