<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo">
        <el-form-item label="教师名称">
          <el-input @keyup.enter.native="getTableData()" v-model="searchInfo.teacherName" placeholder="请输入教师名称" />
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input @keyup.enter.native="getTableData()" v-model="searchInfo.carNum" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model.number="searchInfo.start" value-format="timestamp" type="date" placeholder="选择开始日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model.number="searchInfo.end" value-format="timestamp" type="date" placeholder="选择结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="searchTable()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="车牌号" prop="carNum" />
      <el-table-column label="教师姓名" prop="teacherName" />
      <el-table-column label="位置" prop="place" />
      <el-table-column label="方向" prop="direction">
        <template v-slot="scope">
          <span class="change-btn">{{ scope.row.direction == 1 ? '进' : '出' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="time">
        <template v-slot="scope">
          <span class="change-btn">{{ unixTimeFormat(scope.row.time, 'YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="[10, 30, 50, 100]"
      :style="{ float: 'right', padding: '20px' }"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { mockCarAccess } from '@/mock/mock.js'
import { createCarAccesss, getCarAccessList } from '@/api/car.js'
import infoList from '@/mixins/infoList'
import { unixTimeFormat, jsTimeToDayStartUnix, jsTimeToDayEndUnix } from '@/utils/tool.js'
import moment from 'moment'
export default {
  mixins: [infoList],
  data() {
    return {
      listApi: getCarAccessList
    }
  },

  methods: {
    unixTimeFormat,

    // 搜索
    searchTable() {
      console.log(this.searchInfo)
      if (this.searchInfo.start > 0) this.searchInfo.startTime = jsTimeToDayStartUnix(this.searchInfo.start)
      else this.searchInfo.startTime = null

      if (this.searchInfo.end > 0) this.searchInfo.endTime = jsTimeToDayEndUnix(this.searchInfo.end)
      else this.searchInfo.endTime = null

      this.getTableData(1)
    },
    // 创建 虚拟数据
    async mockCarAccess() {
      let startTime = moment('2022-10-08 09:00:00')
      let endTime = moment('2022-10-08 17:20:00')
      for (let i = 0; i < 26; i++) {
        console.log(startTime.day(), 'dd')
        if (startTime.day() == 6 || startTime.day() == 0) {
          startTime.add(1, 'd')
          endTime.add(1, 'd')
          continue
        }
        let mockData = []
        mockData = [...mockData, ...mockCarAccess(startTime.valueOf(), { direction: 1 })]
        mockData = [...mockData, ...mockCarAccess(endTime.valueOf(), { direction: 2 })]

        mockData.forEach(async (n) => {
          await createCarAccesss(n)
        })
        startTime.add(1, 'd')
        endTime.add(1, 'd')
      }
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
