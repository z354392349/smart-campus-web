<template>
  <div ref="char" class="char"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: ['charData'],
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
          data: ['七年级', '八年级', '九年级'],

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
            name: '一班男生',
            type: 'bar',
            stack: '一班',
            emphasis: { focus: 'series' },
            color: '#5487ff',
            data: [18, 22, 20]
          },
          {
            name: '二班男生',
            type: 'bar',
            stack: '二班',
            emphasis: { focus: 'series' },
            color: '#5487ff',
            data: [18, 12, 22]
          },
          {
            name: '三班男生',
            type: 'bar',
            stack: '三班',
            emphasis: { focus: 'series' },
            color: '#5487ff',
            data: [20, 17, 10]
          },
          {
            name: '四班男生',
            type: 'bar',
            stack: '四班',
            emphasis: { focus: 'series' },
            color: '#5487ff',
            data: [17, 18, 18]
          },
          {
            name: '一班女生',
            type: 'bar',
            stack: '一班',
            emphasis: { focus: 'series' },
            color: '#ff6d8a',
            data: [22, 18, 20]
          },
          {
            name: '二班女生',
            type: 'bar',
            stack: '二班',
            emphasis: { focus: 'series' },
            color: '#ff6d8a',
            data: [22, 28, 18]
          },
          {
            name: '三班女生',
            type: 'bar',
            stack: '三班',
            emphasis: { focus: 'series' },
            color: '#ff6d8a',
            data: [20, 23, 30]
          },
          {
            name: '四班女生',
            type: 'bar',
            stack: '四班',
            emphasis: { focus: 'series' },
            color: '#ff6d8a',
            data: [23, 22, 22]
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
