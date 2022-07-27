<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :width="$conf.mediumDialogWidth" @open="open">
      <!-- <el-button @click="cancelAllotExamItemRoom">123</el-button> -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="dialog-form" v-if="row">
        <el-form-item label="考试名称">
          <el-input v-model="row.name" :disabled="true" autocomplete="off" placeholder="请输入考试名称" />
        </el-form-item>

        <el-form-item label="科目" prop="crouseID">
          <el-tooltip effect="dark" placement="top" v-for="(n, i) in row.examItem.filter((n) => n.examRoomIDs == '')" :key="'q' + i">
            <div slot="content" v-html="tooltipContent(n)"></div>
            <el-radio v-model="form.crouseID" :label="n.ID">{{ n.courseName }}</el-radio>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="考场" prop="examRoomList">
          <el-checkbox-group v-model="form.examRoomList">
            <el-checkbox v-for="(n, i) in examRoomList" :label="n.ID" :key="'q' + i">{{ n.name + '-' + n.amount + '座' }}</el-checkbox>
          </el-checkbox-group>
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
import { getCourseList } from '@/api/course'
import { getExamRoomList } from '@/api/examRoom'
import { allotExamItemRoom, cancelAllotExamItemRoom } from '@/api/examItem'
import { unixTimeFormat } from '@/utils/tool.js'
export default {
  props: ['row'],
  data() {
    return {
      dialogTitle: '分配考场',
      dialogFormVisible: false,
      rules: {
        examRoomList: [{ required: true, message: '请选择考场', trigger: 'change' }],
        crouseID: [{ required: true, message: '请选择科目', trigger: 'change' }]
      },
      form: {
        crouseID: '',
        examRoomList: []
      },
      gourseList: [], // 考试科目
      examRoomList: [] // 考场列表
    }
  },

  methods: {
    //
    initForm() {
      let form = {
        id: '',
        name: '',
        gradeID: '',
        description: ''
      }

      this.form = form
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },

    formatFormToServe() {
      let form = {
        examID: this.row.ID, // 考试ID
        examItemID: this.form.crouseID, // // 考试项ID
        gradeID: this.row.gradeID, // 年级 ID
        examRoomIDs: this.form.examRoomList.join(',') // 考场号ID, 用,分割
      }
      return form
    },

    async enterDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let form = this.formatFormToServe()
          const res = await allotExamItemRoom(form)
          if (res.code === 0) {
            this.$message.success('考场分配成功')
          }
          this.closeDialog()
          this.$parent.getTableData()
        }
      })
    },

    // 弹窗打开前的回调
    open() {
      console.log(this.row.examItem, 'this.row.examItem ')
      // this.row.examItem = this.row.examItem
    },

    // 关闭弹窗
    closeDialog() {
      this.dialogFormVisible = false
    },

    // 获取课程列表
    async getCourseList() {
      let res = await getCourseList()
      let list = res.data.list
      this.gourseList = list
    },

    // 获取考场列表
    async getExamRoomList() {
      let res = await getExamRoomList({ pageSize: 100, page: 1 })
      let list = res.data.list
      this.examRoomList = list
      console.log(list, 'list1')
    },

    // 提示框文字
    tooltipContent(data) {
      let { startTime, endTime } = data
      startTime = unixTimeFormat(startTime, 'YYYY-MM-DD HH:mm:ss')
      endTime = unixTimeFormat(endTime, 'YYYY-MM-DD HH:mm:ss')
      return `开始时间: ${startTime} <br/> 结束时间: ${endTime}`
    },
    cancelAllotExamItemRoom() {
      cancelAllotExamItemRoom({ examItemID: 9 })
    }
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getCourseList()
    this.getExamRoomList()
    console.log(this.row, 'row')
  }
}
</script>
<style lang="less" scoped></style>
