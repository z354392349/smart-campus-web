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
      let int = 122,
        title = '总人数'

      let myChart = echarts.init(this.$refs.char)
      let option = {
        tooltip: {
          trigger: 'item'
        },

        title: {
          text: '{a|' + int + '}\n{b|' + title + '}',
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
            name: 'Access From',
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
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' }
            ]
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
