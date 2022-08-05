<template>
  <el-drawer title="考试详情" :visible.sync="drawer" width="600px">
    <div class="exam-details">
      <p v-for="(n, i) in dataList" :key="i">
        <span>{{ n.key }}：</span>
        <span>{{ n.val }}</span>
      </p>
    </div>
  </el-drawer>
</template>

<script>
import { unixTimeFormat } from '@/utils/tool.js'
export default {
  data() {
    return {
      drawer: false,
      dataList: []
    }
  },

  methods: {
    show(data) {
      let dataList = [
        { key: '考试名称', val: data.name },
        { key: '年级', val: data.grade.name }
      ]
      data.examItem.forEach((n) => {
        dataList.push({ key: n.courseName, val: `${unixTimeFormat(n.startTime, 'YYYY-MM-DD HH:mm:ss')} - ${unixTimeFormat(n.endTime, 'YYYY-MM-DD HH:mm:ss')}` })
      })
      this.dataList = dataList
      // dataList.push({ key: '考试名称', val: data.name })
      // dataList.push({ key: '考试名称', val: data.name })
      this.drawer = true
    }
  },

  components: {},

  computed: {},

  mounted() {},

  created() {}
}
</script>
<style lang="scss" scoped>
.exam-details {
  box-sizing: border-box;
  padding: 0 20px;
  p {
    margin-bottom: 20px;
  }
}
</style>
