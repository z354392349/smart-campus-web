<template>
  <div ref="char" class="char"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: ['type', 'charData'],
  data() {
    return {
      charO: null
    }
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
        dataZoom: [
          {
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 10% 的位置。
            end: 20 // 右边在 60% 的位置。
          },
          {
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 10, // 左边在 10% 的位置。
            end: 60 // 右边在 60% 的位置。
          }
        ],
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
      if (this.charData.time.length < 9) option.dataZoom = []

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
<style lang="scss" scoped></style>
