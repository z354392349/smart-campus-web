<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="教师">
          <el-input v-model="searchInfo.name" @keyup.enter.native="getTableData()" placeholder="请输入教师姓名" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData()">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
          <!-- <el-button size="mini" type="primary" icon="el-icon-plus" @click="createMockDate()">测试数据</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="教师名称" prop="name" />
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
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editTeacher(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteTeacher(scope.row)">删除</el-button>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :width="$conf.minDialogWidth">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="dialog-form">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入教师姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" :label="1">男</el-radio>
          <el-radio v-model="form.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="主讲科目" prop="courseID">
          <el-select v-model="form.courseID" placeholder="请选择科目">
            <el-option v-for="item in courseList" :key="item.ID" :label="item.name" :value="item.ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" value-format="timestamp" placeholder="请选择生日" />
        </el-form-item>
        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model="form.telephone" autocomplete="off" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.description" autocomplete="off" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="enterDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { createtTeacher, upTeacher, getTeacherList, deleteTeacher } from '@/api/teacher'
import { getCourseList } from '@/api/course'
import { copyObj, unixTimeToAge, unixTimeFormat } from '@/utils/tool.js'
import { telephoneRE } from '@/utils/regexp.js'
import { mockTeacherList } from '@/mock/mock.js'
import infoList from '@/mixins/infoList'

export default {
  name: 'Grade',

  mixins: [infoList],
  data() {
    return {
      listApi: getTeacherList,
      dialogFormVisible: false,
      dialogTitle: '新增教师',
      form: {
        id: '',
        name: '',
        description: '',
        sex: 1,
        courseID: '',
        birthday: '',
        telephone: ''
      },
      type: '',
      courseList: [],
      rules: {
        name: [{ required: true, message: '请输入教师名称', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择生日', trigger: 'blur' }],
        courseID: [{ required: true, message: '请选择科目', trigger: 'change' }],
        telephone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: telephoneRE, message: '手机号格式不正确', trigger: 'blur' }
        ]
      }
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

    initForm() {
      this.form = {
        id: '',
        name: '',
        description: '',
        sex: 1,
        birthday: '',
        telephone: ''
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    closeDialog() {
      this.initForm()
      this.dialogFormVisible = false
    },
    openDialog(type) {
      switch (type) {
        case 'add':
          this.dialogTitle = '新增年级'
          break
        case 'edit':
          this.dialogTitle = '编辑年级'
          break
        default:
          break
      }
      this.type = type
      this.dialogFormVisible = true
    },

    async editTeacher(row) {
      row = copyObj(row)
      for (const key in this.form) {
        if (key == 'birthday') row[key] = row[key] * 1000
        this.form[key] = row[key]
      }
      this.form.id = row.ID
      this.form.sysUserID = row.sysUserID
      this.openDialog('edit')
    },

    async deleteTeacher(row) {
      //  row.ID
      this.deleteTableData(row.name, deleteTeacher, { id: row.ID })
    },

    async enterDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let form = copyObj(this.form)
          form.birthday = parseInt(form.birthday / 1000)
          if (this.type === 'add') {
            delete form.id
            const res = await createtTeacher(form)

            if (res.code === 0) {
              this.$message.success('添加成功')
              this.getTableData()
            }
          } else {
            const res = await upTeacher(form)
            if (res.code === 0) {
              this.$message.success('编辑成功')
              this.getTableData()
            }
          }
          this.closeDialog()
          this.getTableData()
        }
      })
    },

    // 获取课程列表
    async getCourseList() {
      let res = await getCourseList()
      this.courseList = res.data.list
    },

    // 创建虚拟数据
    async createMockDate() {
      let data = mockTeacherList(1)
      await createtTeacher(data[0])
      this.getTableData()
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
</style>
