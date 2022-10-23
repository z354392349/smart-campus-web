<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter.native="getTableData()">
        <el-form-item label="考试">
          <el-select v-model="searchInfo.examID" value-key="" placeholder="请选择考试" clearable filterable>
            <el-option v-for="n in examList" :key="n.ID" :label="n.name" :value="n.ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生">
          <el-input v-model.trim="searchInfo.name" placeholder="请输入学生姓名" />
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
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="考试名称" prop="examName" />
      <el-table-column label="学生姓名" prop="studentName" />
      <el-table-column label="年级" prop="gradeName" />
      <el-table-column label="班级" prop="className" />
      <el-table-column label="成绩" prop="result">
        <template slot-scope="scope">
          <p>{{ scope.row.result == null ? '-' : scope.row.result }}</p>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="description" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editExamResult(scope.row)" v-if="userInfo.authority.authorityId == '01'">编辑</el-button>
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
    <UpExamResultDialog :row="row" ref="UpExamResultDialog" />
  </div>
</template>

<script>
import { getExamResultList } from '@/api/examResult'
import { getExamList } from '@/api/exam'
import { getClassList } from '@/api/class'
import { getGradeList } from '@/api/grade'
import infoList from '@/mixins/infoList'
import { copyObj } from '@/utils/tool.js'
import UpExamResultDialog from './components/upExamResultDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'Grade',

  mixins: [infoList],
  data() {
    return {
      listApi: getExamResultList,
      dialogTitle: '新增学生',
      row: null,
      searchInfo: {
        gradeID: 0,
        classID: 0
      },

      classListAll: [],
      classList: [], // 班级列表
      gradeListAll: [], // 年级列表
      gradeList: [], // 年级列表
      classFormList: [],
      examList: []
    }
  },
  components: { UpExamResultDialog },
  computed: {
    ...mapGetters('user', ['userInfo'])
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
    },

    // 表单 年级改变
    gradeFormChane(val) {
      if (val !== 0) this.classFormList = this.classListAll.filter((n) => n.gradeID === val)
      else this.classFormList = []
    },

    // 修改考试成绩
    editExamResult(row) {
      this.row = row
      this.$refs.UpExamResultDialog.dialogVisible = true
    },

    // 获取考试列表
    async getExamList() {
      let res = await getExamList({ page: 1, pageSize: 100 })
      this.examList = res.data.list
    }
  },
  created() {
    this.getTableData()
    this.getClassList()
    this.getGradeList()
    this.getExamList()
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
