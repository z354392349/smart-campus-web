<template>
  <div ref="char" class="char"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: ['type', 'charData'],
  data() {
    return { charO: null }
  },
  watch: {
    charData: {
      handler: function (val) {
        if (val !== null) {
          if (this.charO != null) {
            this.charO.dispose() // 销毁现有数据
          }
          this.init()
        }
      }
    }
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

          // formatter: function (params) {
          //   // var s = ''
          //   // s += params.name + '\n'
          //   // var values = params.value.toString().split(',')
          //   // s += '业务能力:' + values[0] + '\n'
          //   // s += '进件效率' + values[1] + '\n'
          //   // s += '运营能力' + values[2] + '\n'
          //   // s += '贷后能力' + values[3] + '\n'
          //   // s += '风控能力' + values[4] + '\n'
          //   // //系列名称:seriesName: string  数据名，类目名 : name: string   传入的数据值:value: number|Array
          //   // return s
          // }
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
      this.charO = myChart
    },

    // 图重绘
    charRize() {
      if (this.charO) this.charO.resize()
    },
    // 图重绘绑定
    charRizeBind() {
      window.addEventListener('resize', this.charRize)
    },

    // 图重绘解绑
    charRizeUnBind() {
      window.removeEventListener('resize', this.charRize)
    }
  },

  components: {},

  computed: {},

  beforeDestroy() {
    this.charRizeUnBind()
  },
  mounted() {
    this.charRizeBind()
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
