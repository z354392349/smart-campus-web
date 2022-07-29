<template>
  <div>
    <el-button type="primary" size="default" @click="mockCarAccess()">数据</el-button>
    <el-button type="primary" size="default" @click="getTableData()">获取</el-button>
  </div>
</template>

<script>
import { mockCarAccess } from '@/mock/mock.js'
import { createCarAccesss, getCarAccessList } from '@/api/car.js'
import infoList from '@/mixins/infoList'
export default {
  mixins: [infoList],
  data() {
    return {
      listApi: getCarAccessList
    }
  },

  methods: {
    async mockCarAccess() {
      let mockData = mockCarAccess('2022-10-08 09:00:00', { direction: 1 })
      mockData.forEach(async (n) => {
        let res = await createCarAccesss(n)
      })
    }
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getTableData()
  }
}
</script>
<style lang="scss" scoped></style>
