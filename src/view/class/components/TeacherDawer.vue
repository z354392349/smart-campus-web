<template>
  <el-drawer title="选择班主任" :visible.sync="drawer" size="1400px">
    <div class="drawer-content">
      <div class="search-term">
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
          <el-form-item label="教师">
            <el-input v-model="searchInfo.name" @keyup.enter.native="getTableData()" placeholder="请输入教师姓名" />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData()">查询</el-button>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border :stripe="true">
        <el-table-column label="教师名称" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex">
          <template v-slot="scope">{{ scope.row.sex == 1 ? '男' : '女' }}</template>
        </el-table-column>
        <el-table-column label="生日" prop="birthday">
          <template v-slot="scope">{{ unixTimeFormat(scope.row.birthday) }}</template>
        </el-table-column>
        <el-table-column label="年龄(周岁)">
          <template v-slot="scope">{{ unixTimeToAge(scope.row.birthday) }}</template>
        </el-table-column>
        <el-table-column label="主讲科目" prop="course.name" />
        <el-table-column label="手机号码" prop="telephone" />
        <el-table-column label="备注" prop="description" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="choiceTeacher(scope.row)">选择</el-button>
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
import { getTeacherList } from '@/api/teacher'
import { setClassTeacher } from '@/api/class'
import { getCourseList } from '@/api/course'
import { unixTimeToAge, unixTimeFormat } from '@/utils/tool.js'

import infoList from '@/mixins/infoList'

export default {
  props: ['row'],
  name: 'Grade',
  mixins: [infoList],
  data() {
    return {
      drawer: false,
      listApi: getTeacherList,
      form: {
        id: '',
        name: '',
        description: '',
        sex: 1,
        courseID: '',
        birthday: '',
        telephone: ''
      },

      courseList: []
    }
  },
  created() {
    this.getTableData()
    this.getCourseList()
  },
  methods: {
    unixTimeToAge,
    unixTimeFormat,
    // 根据时间戳计算年龄
    countAge(birthday) {
      return moment().diff(moment.unix(birthday), 'years')
    },

    // 获取课程列表
    async getCourseList() {
      let res = await getCourseList()
      this.courseList = res.data.list
    },

    // 选择班主任
    async choiceTeacher(teacher) {
      let params = { classID: this.row.ID, teacherID: teacher.ID }
      let res = await setClassTeacher(params)
      if (res.code === 0) {
        this.$message.success('修改成功')
        this.drawer = false
        this.$parent.getTableData()
      }
      console.log(res)
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
