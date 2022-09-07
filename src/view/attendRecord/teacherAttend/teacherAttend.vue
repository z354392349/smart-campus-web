<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" @keyup.enter.native="getTableData()">
        <el-form-item label="教师名称" v-if="this.authorityId != '02'">
          <el-input v-model="searchInfo.teacherName" placeholder="请输入教师名称" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model.number="searchInfo.start" :default-value="1665158400000" value-format="timestamp" type="date" placeholder="选择开始日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model.number="searchInfo.end" :default-value="1665158400000" value-format="timestamp" type="date" placeholder="选择结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="searchTable()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="教师姓名" prop="teacherName" />
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
import { getTeacherAttendList } from '@/api/teacherAttend.js'
import infoList from '@/mixins/infoList'
import { unixTimeFormat, jsTimeToDayStartUnix, jsTimeToDayEndUnix } from '@/utils/tool.js'
import { mapGetters } from 'vuex'
export default {
  mixins: [infoList],
  data() {
    return {
      listApi: getTeacherAttendList,
      authorityId: ''
    }
  },

  methods: {
    unixTimeFormat,

    // 搜索
    searchTable() {
      //优化 开始结束
      if (this.searchInfo.start && this.searchInfo.end && this.searchInfo.start > this.searchInfo.end) {
        this.$message.warning('结束时间早于开始时间, 系统已自动优化')
        ;[this.searchInfo.start, this.searchInfo.end] = [this.searchInfo.end, this.searchInfo.start]
      }

      // 整理时间
      if (this.searchInfo.start) this.searchInfo.startTime = jsTimeToDayStartUnix(this.searchInfo.start)
      else this.searchInfo.startTime = null

      if (this.searchInfo.end) this.searchInfo.endTime = jsTimeToDayEndUnix(this.searchInfo.end)
      else this.searchInfo.endTime = null

      this.getTableData(1)
    }
  },

  components: {},

  computed: {
    ...mapGetters('user', ['userInfo'])
  },

  mounted() {},

  created() {
    if (this.userInfo.authority.authorityId == '02') {
      this.searchInfo.teacherID = this.userInfo.authority.teacherID
      this.authorityId = this.userInfo.authority.authorityId
    }
    console.log(this.searchInfo.teacherID, 'this.teacherID')
    this.getTableData()
  }
}
</script>
<style lang="scss" scoped></style>
