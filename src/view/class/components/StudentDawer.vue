<template>
  <el-drawer title="选择班长" :visible.sync="drawer" size="1400px" @open="open">
    <div class="drawer-content">
      <div class="search-term">
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
          <el-form-item label="学生">
            <el-input v-model.trim="searchInfo.name" @keyup.enter.native="getTableData()" placeholder="请输入学生姓名" />
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
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border :stripe="true">
        <el-table-column label="学生姓名" prop="name" />
        <el-table-column label="年级" prop="gradeName" />
        <el-table-column label="班级" prop="className" />
        <el-table-column label="性别" prop="sex">
          <template v-slot="scope">{{ scope.row.sex == 1 ? '男' : '女' }}</template>
        </el-table-column>
        <el-table-column label="生日" prop="birthday">
          <template v-slot="scope">{{ unixTimeFormat(scope.row.birthday) }}</template>
        </el-table-column>
        <el-table-column label="年龄(周岁)">
          <template v-slot="scope">{{ unixTimeToAge(scope.row.birthday) }}</template>
        </el-table-column>
        <el-table-column label="手机号码" prop="telephone" />

        <el-table-column label="备注" prop="description" />
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="choiceMonitor(scope.row)">选择</el-button>
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
  </el-drawer>
</template>

<script>
import moment from 'moment'
import { getStudentList } from '@/api/student'
import { getClassList, setClassMonitor } from '@/api/class'
import { getGradeList } from '@/api/grade'
import infoList from '@/mixins/infoList'
import { copyObj, unixTimeToAge, unixTimeFormat } from '@/utils/tool.js'

export default {
  props: ['row'],
  name: 'Grade',
  mixins: [infoList],
  data() {
    return {
      drawer: false,
      listApi: getStudentList,

      batchSetData: {
        gradeID: '',
        classID: '',
        studentsID: []
      },
      searchInfo: {
        gradeID: 0,
        classID: 0
      },
      form: {
        id: '',
        name: '',
        gradeID: '',
        classID: '',
        sex: 1,
        birthday: '',
        telephone: '',
        description: ''
      },
      classListAll: [],
      classList: [], // 班级列表
      gradeListAll: [], // 年级列表
      gradeList: [], // 年级列表
      classFormList: []
    }
  },
  created() {
    this.getClassList()
    this.getGradeList()
  },
  methods: {
    unixTimeToAge,
    unixTimeFormat,
    // 根据时间戳计算年龄
    countAge(birthday) {
      return moment().diff(moment.unix(birthday), 'years')
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

    // 打开diaolog
    open() {
      this.searchInfo.gradeID = this.row.gradeID
      this.gradeChane(this.row.gradeID)
      this.searchInfo.classID = this.row.ID
      this.getTableData()
    },
    // 选择班班长
    async choiceMonitor(student) {
      let params = { studentID: student.ID, classID: this.row.ID }
      let res = await setClassMonitor(params)

      if (res.code === 0) {
        this.$message.success('修改成功')
        this.drawer = false
        this.$parent.getTableData()
      }
    }
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
.drawer-content {
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
}
</style>
