<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="科目">
          <el-input v-model="searchInfo.name" placeholder="请输入科目名称" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData(1)">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="科目名称" prop="name" />
      <el-table-column label="备注" prop="description" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editCourse(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteCourse(scope.row)">删除</el-button>
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
        <el-form-item label="科目名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入科目名称" />
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
  </div>
</template>

<script>
import { getCourseList, createCourse, upCourse, deleteCourse } from '@/api/course'
import infoList from '@/mixins/infoList'

export default {
  name: 'Course',

  mixins: [infoList],
  data() {
    return {
      listApi: getCourseList,
      dialogFormVisible: false,
      dialogTitle: '新增科目',
      form: {
        name: '',
        description: ''
      },
      type: '',
      rules: {
        name: [{ required: true, message: '请输入科目名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    initForm() {
      this.form = {
        name: '',
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
          this.dialogTitle = '新增科目'
          break
        case 'edit':
          this.dialogTitle = '编辑科目'
          break
        default:
          break
      }
      this.type = type
      this.dialogFormVisible = true
    },
    async editCourse(row) {
      this.form.id = row.ID
      this.form.name = row.name
      this.form.description = row.description

      this.openDialog('edit')
    },
    async deleteCourse(row) {
      this.deleteTableData(row.name, deleteCourse, { id: row.ID })
    },

    async enterDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.type === 'add') {
            const res = await createCourse(this.form)
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.getTableData()
            }
          } else {
            const res = await upCourse(this.form)
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
