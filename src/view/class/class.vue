<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="班级">
          <el-input v-model="searchInfo.name" placeholder="请输入班级名称" />
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :width="$conf.minDialogWidth">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="年级名称" prop="name">
          <el-select v-model="form.name" placeholder="请选择年级">
            <el-option v-for="n in gradeList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入班级名称" />
        </el-form-item>
        <el-form-item label="班主任" prop="name">
          <el-select v-model="form.name" placeholder="请选择年级">
            <el-option v-for="n in gradeList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off" placeholder="请选择输入描述" />
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
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成 条件搜索时候 请把条件安好后台定制的结构体字段 放到 this.searchInfo 中即可实现条件搜索

import { getGradeList, createGrade, upGrade, deleteGrade } from '@/api/grade'
import { getClassList, createClass, upClass, deleteClass } from '@/api/class'
import infoList from '@/mixins/infoList'

export default {
  name: 'Grade',

  mixins: [infoList],
  data() {
    return {
      listApi: getGradeList,
      dialogFormVisible: false,
      dialogTitle: '新增班级',
      form: {
        name: '',
        gradeID: '',
        description: ''
      },
      type: '',
      rules: {
        name: [{ required: true, message: '请输入年级名称', trigger: 'blur' }]
      },
      gradeList: []
    }
  },
  created() {
    // // this.getTableData()
    // this.getGradeList()
    // let p = { name: '一班', gradeID: 1, teacherID: 1, description: '123' }
    // createClass(p)
    // getClassList()
    // upClass({ id: 1, name: '一R班', gradeID: 10, teacherID: 1, description: '123' })
    deleteClass({ id: 1 })
  },
  methods: {
    async getGradeList() {
      const res = await getGradeList()
      this.gradeList = res.data.list
      console.log(this.gradeList)
    },
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
          if (this.type === 'add') {
            const res = await createGrade(this.form)
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.getTableData()
            }
          } else {
            const res = await upGrade(this.form)
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
