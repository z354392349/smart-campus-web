<template>
  <div ref="char" class="char"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: ['type'],
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
        series: [
          {
            name: '出勤率',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          },
          {
            name: '准点率',
            data: [932, 901, 934, 1290, 1330, 1320, 20],
            type: 'line',
            smooth: true
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
