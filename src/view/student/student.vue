<template>
  <div>
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
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="openBatchDialog('add')">修改年级班级</el-button>
          <!-- <el-button size="mini" type="primary" icon="el-icon-plus" @click="createMockDate()">测试数据</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editStudent(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteStudent(scope.row)">删除</el-button>
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
          <el-input v-model.trim="form.name" autocomplete="off" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="年级" prop="gradeID">
          <el-select v-model="form.gradeID" placeholder="请选择年级" @change="gradeFormChane">
            <el-option v-for="n in gradeListAll" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classID">
          <el-select v-model="form.classID" placeholder="请选择班级">
            <el-option v-for="n in classFormList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" :label="1">男</el-radio>
          <el-radio v-model="form.sex" :label="2">女</el-radio>
        </el-form-item>

        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" value-format="timestamp" placeholder="请选择生日" />
        </el-form-item>
        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model.trim="form.telephone" autocomplete="off" placeholder="请输入家长手机号码" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model.trim="form.description" autocomplete="off" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="enterDialog">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改年级班级" :visible.sync="dialogBatchSetData" :width="$conf.minDialogWidth">
      <el-form ref="batchSetDataForm" :model="batchSetData" :rules="rules" label-width="80px" class="dialog-form">
        <el-form-item label="年级" prop="gradeID">
          <el-select v-model="batchSetData.gradeID" placeholder="请选择年级" @change="gradeFormChane">
            <el-option v-for="n in gradeListAll" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classID">
          <el-select v-model="batchSetData.classID" placeholder="请选择班级">
            <el-option v-for="n in classFormList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBatchSetData = false">取 消</el-button>
        <el-button type="primary" @click="enterBatchSetDataDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { createtStudent, upStudent, getStudentList, deleteStudent, setStudentsGradeAndClass } from '@/api/student'
import { getClassList } from '@/api/class'
import { getGradeList } from '@/api/grade'
import infoList from '@/mixins/infoList'
import { copyObj, unixTimeToAge, unixTimeFormat } from '@/utils/tool.js'
import { telephoneRE } from '@/utils/regexp.js'
import { mockStudentList } from '@/mock/mock.js'
export default {
  name: 'Grade',

  mixins: [infoList],
  data() {
    return {
      listApi: getStudentList,
      dialogFormVisible: false,
      dialogBatchSetData: false,
      dialogTitle: '新增学生',
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
      classFormList: [],
      type: '',
      rules: {
        name: [{ required: true, message: '请输入学生姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        gradeID: [{ required: true, message: '请选择年级', trigger: 'change' }],
        classID: [{ required: true, message: '请选择班级', trigger: 'change' }],
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

    initForm() {
      this.form = {
        id: '',
        name: '',
        gradeID: '',
        classID: '',
        sex: 1,
        birthday: '',
        telephone: '',
        description: ''
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
          this.dialogTitle = '新增学生'
          break
        case 'edit':
          this.dialogTitle = '编辑学生'
          break
        default:
          break
      }
      this.type = type
      this.dialogFormVisible = true
    },

    async editStudent(row) {
      row = copyObj(row)
      for (const key in this.form) {
        if (key == 'birthday') row[key] = row[key] * 1000
        this.form[key] = row[key]
      }
      this.form.id = row.ID
      this.form.sysUserID = row.sysUserID
      this.gradeFormChane(this.form.gradeID)
      this.openDialog('edit')
    },

    async deleteStudent(row) {
      this.deleteTableData(row.name, deleteStudent, { id: row.ID })
    },

    async enterDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let form = copyObj(this.form)
          form.birthday = parseInt(form.birthday / 1000)
          if (this.type === 'add') {
            delete form.id
            const res = await createtStudent(form)

            if (res.code === 0) {
              this.$message.success('添加成功')
              this.getTableData()
            }
          } else {
            const res = await upStudent(form)
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

    // 表单多选处理
    handleSelectionChange(val) {
      this.batchSetData.studentsID = val.map((n) => n.ID)
    },

    // 批量修改年级班级 弹窗
    openBatchDialog() {
      if (this.batchSetData.studentsID.length == 0) {
        this.$message.success('请先选择学生!')
        return
      }
      this.batchSetData.classID = ''
      this.batchSetData.gradeID = ''
      this.dialogBatchSetData = true
      this.$nextTick(() => {
        this.$refs.batchSetDataForm.resetFields()
      })
    },

    // 提交批量修改年级班级
    enterBatchSetDataDialog() {
      this.$refs.batchSetDataForm.validate(async (valid) => {
        if (valid) {
          let res = await setStudentsGradeAndClass(this.batchSetData)
          if (res.code === 0) {
            this.$message.success('编辑成功')
            this.dialogBatchSetData = false
            this.getTableData()
          }
        }
      })
    },
    // 创建虚拟数据
    async createMockDate() {
      let params = {
        gradeID: 3,
        classID: '',
        type: 9
      }
      let data = mockStudentList(10, params)
      for (let i = 0; i < data.length; i++) {
        await createtStudent(data[i])
      }
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
