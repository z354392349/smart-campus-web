<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="考场">
          <el-input v-model="searchInfo.name" placeholder="请输入考场名称" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData(1)">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="考场名称" prop="name" />
      <el-table-column label="考场地址" prop="address" />
      <el-table-column label="座位数" prop="amount" />
      <el-table-column label="监考老师" prop="amount">
        <template slot-scope="scope">
          <span @click="showTeacherDawer(scope.row)" class="change-btn">{{ scope.row.teacher ? scope.row.teacher.name : '选择班主任' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" prop="description" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editExamRoom(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteExamRoom(scope.row)">删除</el-button>
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
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="考场名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入考场名称" />
        </el-form-item>
        <el-form-item label="考场地址" prop="address">
          <el-input v-model="form.address" autocomplete="off" placeholder="请输入考场地址" />
        </el-form-item>
        <el-form-item label="座位数" prop="amount">
          <el-input v-model.number="form.amount" autocomplete="off" placeholder="请输入座位数" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.description" autocomplete="off" placeholder="请选择输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="enterDialog">确 定</el-button>
      </div>
    </el-dialog>

    <TeacherDawer ref="TeacherDawer" @choice="choiceTeacher" title="选择监考老师" :row="row" />
  </div>
</template>

<script>
import { getExamRoomList, createExamRoom, upExamRoom, deleteExamRoom, upExamRoomTeacher } from '@/api/examRoom'
import TeacherDawer from '@/components/dawer/TeacherDawer.vue'
import infoList from '@/mixins/infoList'

export default {
  name: 'ExamRoom',

  mixins: [infoList],
  data() {
    return {
      listApi: getExamRoomList,
      dialogFormVisible: false,
      dialogTitle: '新增考场',
      form: {
        name: '',
        address: '',
        amount: '',
        description: ''
      },
      row: null,
      type: '',
      rules: {
        name: [{ required: true, message: '请输入考场名称', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入考场座位数', trigger: 'blur' }],
        address: [{ required: true, message: '请输入考场地址', trigger: 'blur' }]
      }
    }
  },
  components: { TeacherDawer },

  created() {
    this.getTableData()
  },
  methods: {
    // 初始化 form
    initForm() {
      this.form = {
        name: '',
        address: '',
        description: ''
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },

    // 关闭弹窗
    closeDialog() {
      this.initForm()
      this.dialogFormVisible = false
    },

    // 打开创建,编辑弹窗
    openDialog(type) {
      switch (type) {
        case 'add':
          this.dialogTitle = '新增考场'
          break
        case 'edit':
          this.dialogTitle = '编辑考场'
          break
        default:
          break
      }
      this.type = type
      this.dialogFormVisible = true
    },

    // 编辑考场数据准备
    async editExamRoom(row) {
      this.form.id = row.ID
      this.form.name = row.name
      this.form.address = row.address
      this.form.amount = row.amount
      this.form.description = row.description

      this.openDialog('edit')
    },

    // 删除考场
    async deleteExamRoom(row) {
      this.deleteTableData(row.name, deleteExamRoom, { id: row.ID })
    },

    // 提交表单
    async enterDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.type === 'add') {
            const res = await createExamRoom(this.form)
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.getTableData()
            }
          } else {
            const res = await upExamRoom(this.form)
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

    // 选择监考考
    async choiceTeacher(teacherID) {
      let res = await upExamRoomTeacher({ teacherID: teacherID, examRoomID: this.row.ID })
      if (res.code === 0) {
        this.$message.success('设置成功')
        this.getTableData()
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
.change-btn {
  color: #409eff;
  cursor: pointer;
}
</style>
