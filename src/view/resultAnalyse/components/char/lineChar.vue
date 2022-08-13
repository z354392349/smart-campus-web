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
      let color = { student: ['#ff8f00', '#5c8af5'], teacher: ['#5882f6', '#39e399'] }
      let useColor
      if (this.type == 'teacher') useColor = color.teacher
      else useColor = color.student
      let myChart = echarts.init(this.$refs.char)
      let option = {
        color: useColor,

        grid: {
          left: '50px',
          right: '2%',
          bottom: '10%',
          top: '12%'
          // containLabel: false
        },
        tooltip: {
          trigger: 'axis'
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
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
        series: []
      }

      this.charData.data.forEach((n) => {
        option.series.push({
          name: n.name,
          data: n.value,
          type: 'line',
          smooth: true
        })
      })
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
<style lang="scss" scoped>
.char {
  width: 100%;
  height: 100%;
}
</style>
