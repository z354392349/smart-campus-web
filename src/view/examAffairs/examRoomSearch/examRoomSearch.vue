<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="学生">
          <el-input v-model="searchInfo.name" placeholder="请输入学生姓名" />
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
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="考试名称" prop="examName" />
      <el-table-column label="学生姓名" prop="studentName" />
      <el-table-column label="年级" prop="gradeName" />
      <el-table-column label="班级" prop="className" />
      <el-table-column label="考场" prop="examRoomName" />
      <el-table-column label="考场地址" prop="address" />
      <el-table-column label="备注" prop="description" />
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
import { getAllotExamRoomList } from '@/api/allotExamRoom.js'
import { getClassList } from '@/api/class'
import { getGradeList } from '@/api/grade'
import { copyObj } from '@/utils/tool.js'
import infoList from '@/mixins/infoList'
export default {
  name: 'Grade',

  mixins: [infoList],
  data() {
    return {
      listApi: getAllotExamRoomList,
      classListAll: [],
      classList: [], // 班级列表
      gradeListAll: [], // 年级列表
      gradeList: [] // 年级列表
    }
  },

  methods: {
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
    }
  },
  created() {
    this.getTableData()
    this.getClassList()
    this.getGradeList()
  }
}
</script>

<style scoped lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}
.el-tag--mini {
  margin-left: 5px;
}
.warning {
  color: #dc143c;
}
</style>
