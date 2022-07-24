<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="年级">
          <el-select v-model="searchInfo.gradeID" placeholder="请选择年级">
            <el-option v-for="n in gradeList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="searchInfo.name" placeholder="请输入班级名称" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData()">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="年级" prop="grade.name" />
      <el-table-column label="班级" prop="name" />
      <el-table-column label="班主任" prop="teacher.name">
        <template v-slot="scope">
          <span @click="showTeacherDawer(scope.row)" class="change-btn">{{ scope.row.teacher.name || '选择班主任' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班长" prop="student.name">
        <template v-slot="scope">
          <span @click="showClassDawer(scope.row)" class="change-btn">{{ scope.row.student ? scope.row.student.name : '选择班长' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="description" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editClass(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteClass(scope.row)">删除</el-button>
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
      <el-form ref="form" class="dialog-form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="年级名称" prop="gradeID">
          <el-select v-model="form.gradeID" placeholder="请选择年级">
            <el-option v-for="n in gradeList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入班级名称" />
        </el-form-item>
        <!-- <el-form-item label="班主任" prop="name">
          <el-select v-model="form.teacherID" placeholder="请选择年级">
            <el-option v-for="n in teacherList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input v-model="form.description" autocomplete="off" placeholder="请选择输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="enterDialog">确 定</el-button>
      </div>
    </el-dialog>
    <TeacherDawer ref="TeacherDawer" :row="row" />
    <StudentDawer ref="StudentDawer" :row="row" />
  </div>
</template>

<script>
import { getGradeList } from '@/api/grade'
import { getTeacherList } from '@/api/teacher'
import { getClassList, createClass, upClass, deleteClass } from '@/api/class'
import TeacherDawer from './components/TeacherDawer.vue'
import StudentDawer from './components/StudentDawer.vue'
import infoList from '@/mixins/infoList'

export default {
  name: 'Grade',

  mixins: [infoList],
  data() {
    return {
      listApi: getClassList,
      dialogFormVisible: false,
      dialogTitle: '新增班级',

      form: {
        name: '',
        gradeID: '',
        teacherID: '',
        description: ''
      },
      type: '',
      rules: {
        gradeID: [{ required: true, message: '请选择年级', trigger: 'change' }],
        name: [{ required: true, message: '请输入年级名称', trigger: 'blur' }]
      },
      gradeList: [],
      teacherList: [],
      row: null // 选择的行
    }
  },
  created() {
    this.getTableData()
    this.getGradeList()
    this.getTeacherList()
  },
  components: { TeacherDawer, StudentDawer },
  methods: {
    // 获取年级列表
    async getGradeList() {
      const res = await getGradeList()
      this.gradeList = res.data.list
    },

    // 获取班级列表
    async getTeacherList() {
      const res = await getTeacherList()
      this.teacherList = res.data.list
    },

    initForm() {
      this.form = {
        name: '',
        gradeID: '',
        teacherID: '',
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
          this.dialogTitle = '新增班级'
          break
        case 'edit':
          this.dialogTitle = '编辑班级'
          break
        default:
          break
      }
      this.type = type
      this.dialogFormVisible = true
    },
    async editClass(row) {
      for (const key in this.form) {
        this.form[key] = row[key]
      }
      console.log(this.form)
      this.form.id = row.ID
      this.openDialog('edit')
    },
    async deleteClass(row) {
      this.deleteTableData(row.name, deleteClass, { id: row.ID })
    },

    async enterDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.type === 'add') {
            const res = await createClass(this.form)
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.getTableData()
            }
          } else {
            const res = await upClass(this.form)
            if (res.code === 0) {
              this.$message.success('编辑成功')
              this.getTableData()
            }
          }
          this.closeDialog()
        }
      })
    },

    // 显示教师抽屉
    showTeacherDawer(row) {
      this.row = row
      this.$refs.TeacherDawer.drawer = true
    },

    // 显示班级抽屉
    showClassDawer(row) {
      this.row = row
      this.$refs.StudentDawer.drawer = true
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
.change-btn {
  color: #409eff;
  cursor: pointer;
}
</style>
