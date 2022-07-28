<template>
  <div>
    <el-dialog title="修改成绩" :visible.sync="dialogVisible" :width="$conf.minDialogWidth">
      <el-form ref="form" class="dialog-form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="成绩" prop="result">
          <el-input v-model.number="form.result" autocomplete="off" placeholder="请输入成绩" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.description" autocomplete="off" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="upExamResult">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { upExamResult } from '@/api/examResult'
export default {
  props: ['row'],
  data() {
    return {
      dialogVisible: false,
      form: {
        ID: '',
        result: '',
        description: ''
      },
      type: '',
      rules: {
        result: [{ required: true, message: '请输入成绩', trigger: 'change' }]
      }
    }
  },

  methods: {
    upExamResult() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.form.ID = this.row.ID
          let res = await upExamResult(this.form)
          if (res.code === 0) {
            this.$message.success('编辑成功')
            this.$parent.getTableData()
            this.dialogVisible = false
          }
        }
      })
    },
    initForm() {
      this.form = {
        ID: '',
        result: '',
        description: ''
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },

    closeDialog() {
      this.dialogVisible = false
      this.initForm()
    }
  },

  components: {},

  computed: {},

  mounted() {},

  created() {}
}
</script>
<style lang="less" scoped></style>
