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
      let color = { type1: ['#ff8f00', '#5c8af5', '#A66CFF'], type2: ['#5882f6', '#39e399', '#FD5D5D'] }
      let useColor
      if (this.type == 1) useColor = color.type1
      else useColor = color.type2
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
          trigger: 'axis',
          formatter: function (params) {
            var str = '',
              sValue,
              marker,
              seriesName

            str += `<p>${params[0].axisValue}</p>`
            params.forEach((n, i) => {
              seriesName = n.seriesName
              sValue = n.data
              marker = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${n.color};"></span>`
              marker += `<span style="display:inline-block;width:60px;">${seriesName}: </span>`
              marker += `<span style="display:inline-block;width:60px;margin-right:10px;text-align: right;">${sValue}</span> `
              str += marker
              if ((i + 1) % 3 == 0) str += '<br />'
            })
            return str
          }
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
