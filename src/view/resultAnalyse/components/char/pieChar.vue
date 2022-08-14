<template>
  <div ref="char" class="char"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: ['charData'],
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
      let total = this.charData[0].value + '%',
        title = '及格率'
      let myChart = echarts.init(this.$refs.char)
      let option = {
        tooltip: {
          trigger: 'item',
          borderColor: 'white'
        },

        title: {
          text: '{a|' + total + '}\n{b|' + title + '}',
          x: 'center',
          y: 'center',
          textStyle: {
            rich: {
              a: {
                fontSize: 32,
                color: '#000',
                fontWeight: 'bolder',
                padding: [15, 0, 0, 0]
              },
              b: {
                fontSize: 14,
                color: '#a2a2a2',
                padding: [5, 0]
              }
            }
          }
        },
        series: [
          {
            color: ['#5487ff', '#ff6d8a'],
            name: '',
            type: 'pie',
            radius: ['65%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },

            labelLine: {
              show: false
            },
            data: this.charData
          }
        ]
      }
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
