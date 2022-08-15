<template>
  <div>
    <div class="search-term">
      <!-- <el-button type="primary" size="default" @click="mockStudentAccess">模拟数据</el-button> -->

      <el-form :inline="true" :model="searchInfo">
        <el-form-item label="学生">
          <el-input v-model.trim="searchInfo.studentName" @keyup.enter.native="getTableData()" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="searchInfo.gradeID" placeholder="请选择年级" @change="gradeChane">
            <el-option v-for="n in gradeList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="searchInfo.classID" placeholder="请选择班级">
            <el-option v-for="n in classList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
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
      <el-table-column label="学生姓名" prop="studentName" />
      <el-table-column label="年级" prop="gradeName" />
      <el-table-column label="班级" prop="className" />
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
import { mockStudentAccess } from '@/mock/mock.js'
import { getStudentAccessList, createStudentAccessMock } from '@/api/studentAccess.js'
import infoList from '@/mixins/infoList'
import { copyObj, unixTimeFormat, jsTimeToDayStartUnix, jsTimeToDayEndUnix, sleep } from '@/utils/tool.js'
import { getClassList } from '@/api/class'
import { getGradeList } from '@/api/grade'
import moment from 'moment'
export default {
  mixins: [infoList],
  data() {
    return {
      listApi: getStudentAccessList,
      classListAll: [],
      classList: [], // 班级列表
      gradeListAll: [], // 年级列表
      gradeList: [], // 年级列表
      searchInfo: {
        gradeID: 0,
        classID: 0
      }
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
    },

    // 获取班级列表
    async getClassList() {
      let res = await getClassList()
      let list = res.data.list
      this.classListAll = list
      this.classList = [{ ID: 0, name: '全部' }]
      this.searchInfo.classID = 0
    },

    // 获取年级列表
    async getGradeList() {
      let res = await getGradeList()
      let list = res.data.list
      this.gradeListAll = copyObj(list)
      list.unshift({ ID: 0, name: '全部' })
      this.gradeList = list
      this.searchInfo.gradeID = 0
    },

    // 年级改变
    gradeChane(val) {
      let classList = []
      if (val !== 0) classList = this.classListAll.filter((n) => n.gradeID === val)
      classList.unshift({ ID: 0, name: '全部' })
      this.classList = classList
      this.searchInfo.classID = 0
    },

    // 创建 虚拟数据
    async mockStudentAccess() {
      let startTime = moment('2022-10-08 08:00:00') // 上午进入
      let middayOutTime = moment('2022-10-08 11:30:00') // 上午离开
      let middayIntoTime = moment('2022-10-08 13:30:00') // 下午进入
      let endTime = moment('2022-10-08 17:15:00') // 下午离开

      for (let i = 0; i < 26; i++) {
        if (startTime.date() != 8 && startTime.date() != 9) {
          if (startTime.day() == 6 || startTime.day() == 0) {
            startTime.add(1, 'd')
            endTime.add(1, 'd')
            continue
          }
        }

        let mockData = []
        mockData = [...mockData, ...mockStudentAccess(startTime.valueOf(), { direction: 1 })]
        mockData = [...mockData, ...mockStudentAccess(middayOutTime.valueOf(), { direction: 1 })]
        mockData = [...mockData, ...mockStudentAccess(middayIntoTime.valueOf(), { direction: 1 })]
        mockData = [...mockData, ...mockStudentAccess(endTime.valueOf(), { direction: 2 })]

        createStudentAccessMock(mockData)
        await sleep(2000)

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
    this.getClassList()
    this.getGradeList()
  }
}
</script>
<style lang="scss" scoped></style>
