<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="教师">
          <el-input v-model="searchInfo.name" placeholder="请输入教师姓名" />
        </el-form-item>
        <el-form-item>
          <!-- @click="onSubmit" -->
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData()">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="年级名称" prop="name" />
      <el-table-column label="描述" prop="description" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editGrade(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteGrade(scope.row)">删除</el-button>
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

    <!-- { name: '张三', sex: 1, birthday: 1657468800, telephone: '13651196456', description: '' } -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :width="$conf.minDialogWidth">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入教师姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" :label="1">男</el-radio>
          <el-radio v-model="form.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" value-format="timestamp" placeholder="请选择生日" />
        </el-form-item>
        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model="form.telephone" autocomplete="off" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off" placeholder="请输入描述" />
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
import { upGrade, deleteGrade } from '@/api/grade'
// upTeacher , deleteTeacher
import { createtTeacher, getTeacherList } from '@/api/teacher'
import infoList from '@/mixins/infoList'
import { copyObj } from '@/utils/tool.js'

export default {
  name: 'Grade',

  mixins: [infoList],
  data() {
    return {
      listApi: getTeacherList,
      dialogFormVisible: true,
      dialogTitle: '新增教师',
      form: {
        name: '',
        description: '',
        sex: 1,
        birthday: parseInt(moment().startOf('day').unix() * 1000),
        telephone: ''
      },
      type: '',
      rules: {
        name: [{ required: true, message: '请输入教师名称', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择生日', trigger: 'blur' }],
        telephone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      }
    }
  },
  created() {
    // this.getTableData()
    // upTeacher({ name: '张老大', sex: 1, birthday: 1657468800, telephone: '13651196457', description: '', ID: 1 })
    // deleteTeacher({ ID: 1 })
  },
  methods: {
    // // 条件搜索前端看此方法
    // onSubmit() {
    //   this.page = 1
    //   this.pageSize = 10
    //   this.getTableData()
    // },
    initForm() {
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
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
    async editGrade(row) {
      this.form.id = row.ID
      this.form.name = row.name

      this.openDialog('edit')
    },
    async deleteGrade(row) {
      this.deleteTableData(row.name, deleteGrade, { id: row.ID })
    },

    async enterDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let form = copyObj(this.form)
          form.birthday = parseInt(form.birthday / 1000)
          if (this.type === 'add') {
            const res = await createtTeacher(form)

            if (res.code === 0) {
              this.$message.success('添加成功')
              this.getTableData()
            }
          } else {
            const res = await upGrade(form)
            if (res.code === 0) {
              this.$message.success('编辑成功')
              this.getTableData()
            }
          }
          this.closeDialog()
        }
      })
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
