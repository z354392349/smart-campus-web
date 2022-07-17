<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="教师">
          <el-input v-model="searchInfo.name" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item>
          <!-- @click="onSubmit" -->
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData()">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="学生姓名" prop="name" />
      <el-table-column label="性别" prop="sex">
        <template v-slot="scope">{{ scope.row.sex == 1 ? '男' : '女' }}</template>
      </el-table-column>
      <el-table-column label="生日" prop="birthday">
        <template v-slot="scope">{{ unixTimeFormat(scope.row.birthday) }}</template>
      </el-table-column>
      <el-table-column label="年龄">
        <template v-slot="scope">{{ unixTimeToAge(scope.row.birthday) }}</template>
      </el-table-column>
      <el-table-column label="手机号码" prop="telephone" />

      <el-table-column label="描述" prop="description" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editExam(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteExam(scope.row)">删除</el-button>
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
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="dialog-form">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" :label="1">男</el-radio>
          <el-radio v-model="form.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" value-format="timestamp" placeholder="请选择生日" />
        </el-form-item>
        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model="form.telephone" autocomplete="off" placeholder="请输入家长手机号码" />
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
import { createtExam, upExam, getExamList, deleteExam } from '@/api/exam'
import infoList from '@/mixins/infoList'
import { copyObj, unixTimeToAge, unixTimeFormat } from '@/utils/tool.js'
import { telephoneRE } from '@/utils/regexp.js'

export default {
  name: 'Grade',

  mixins: [infoList],
  data() {
    return {
      listApi: getExamList,
      dialogFormVisible: false,
      dialogTitle: '发布考试',
      form: {
        id: '',
        name: '',
        description: '',
        sex: 1,
        birthday: '',
        telephone: ''
      },
      type: '',
      rules: {
        name: [{ required: true, message: '请输入学生姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择生日', trigger: 'blur' }],
        telephone: [
          { required: true, message: '请输入家长手机号码', trigger: 'blur' },
          { pattern: telephoneRE, message: '手机号格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTableData()
    let examItem = [
      {
        endTime: 1658031181,
        startTime: 1658023981,
        courseID: 1
      },
      {
        endTime: 1658021181,
        startTime: 1658323981,
        courseID: 2
      }
    ]
    // let eamItem = {
    //   endTime: 1658031181,
    //   startTime: 1658023981,
    //   courseID: 1
    // }
    // let pa = { name: '1231', gradeID: '1,2,3,4', eamItem: JSON.stringify(eamItem), description: 12 }
    let pa = { name: '1231', gradeID: '1,2,3,4', examItem, description: 12 }

    // upExam(pa)
    // deleteExam(pa)
    createtExam(pa)
  },
  methods: {
    unixTimeToAge,
    unixTimeFormat,
    // 根据时间戳计算年龄
    countAge(birthday) {
      return moment().diff(moment.unix(birthday), 'years')
    },

    initForm() {
      this.$refs.form.resetFields()
      this.form = {
        id: '',
        name: '',
        description: '',
        sex: 1,
        birthday: '',
        telephone: ''
      }
    },
    closeDialog() {
      this.initForm()
      this.dialogFormVisible = false
    },
    openDialog(type) {
      switch (type) {
        case 'add':
          this.dialogTitle = '发布考试'
          break
        case 'edit':
          this.dialogTitle = '编辑考试'
          break
        default:
          break
      }
      this.type = type
      this.dialogFormVisible = true
    },

    async editExam(row) {
      row = copyObj(row)
      for (const key in this.form) {
        if (key == 'birthday') row[key] = row[key] * 1000
        this.form[key] = row[key]
      }
      this.form.id = row.ID
      this.openDialog('edit')
    },

    async deleteExam(row) {
      this.deleteTableData(row.name, deleteExam, { id: row.ID })
    },

    async enterDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let form = copyObj(this.form)
          form.birthday = parseInt(form.birthday / 1000)
          if (this.type === 'add') {
            delete form.id
            const res = await createtExam(form)

            if (res.code === 0) {
              this.$message.success('添加成功')
              this.getTableData()
            }
          } else {
            const res = await upExam(form)
            if (res.code === 0) {
              this.$message.success('编辑成功')
              this.getTableData()
            }
          }
          this.closeDialog()
          this.getTableData()
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