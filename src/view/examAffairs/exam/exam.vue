<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="考试考试名称">
          <el-input v-model="searchInfo.name" placeholder="请输入考试名称" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getTableData()">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog('add')">发布考试</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border :stripe="true">
      <el-table-column label="考试名称" prop="name" />
      <el-table-column label="年级" prop="grade.name" />
      <el-table-column label="科目">
        <template v-slot="scope">{{ scope.row.examItem.map((n) => n.courseName).join(',') }}</template>
      </el-table-column>
      <el-table-column label="未分配考场">
        <template v-slot="scope">
          {{
            scope.row.examItem
              .filter((n) => n.examRoomIDs == '')
              .map((n) => n.courseName)
              .join(',')
          }}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="description" />
      <el-table-column label="操作" width="340px">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editExam(scope.row)">编辑</el-button>
          <el-button size="small" type="primary" icon="el-icon-house" @click="showAffairsDialog(scope.row)">分配考场</el-button>
          <el-button size="small" type="primary" icon="el-icon-tickets" @click="editExam(scope.row)">详情</el-button>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :width="$conf.mediumDialogWidth">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="dialog-form">
        <el-form-item label="考试名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入考试名称" />
        </el-form-item>
        <el-form-item label="年级" prop="gradeID">
          <el-select v-model="form.gradeID" placeholder="请选择年级">
            <el-option v-for="n in gradeList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>

        <el-form-item label="科目">
          <div class="examItem" v-for="(n, i) in form.examItem" :key="'q' + i">
            <el-checkbox class="examItem__checkbox" v-model="n.check">{{ n.courseName }}</el-checkbox>
            <el-date-picker class="examItem__date" v-model="n.date" value-format="timestamp" type="date" placeholder="选择日期"></el-date-picker>
            <el-time-select class="examItem__time" placeholder="起始时间" v-model="n.startTime" :picker-options="{ start: '08:00', step: '00:15', end: '20:00' }"></el-time-select>
            <el-time-select class="examItem__time" placeholder="结束时间" v-model="n.endTime" :picker-options="{ start: '08:00', step: '00:15', end: '20:00', minTime: n.startTime }"></el-time-select>
          </div>
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

    <AffairsDialog :row="row" ref="AffairsDialog" />
  </div>
</template>

<script>
// TODO://撤销分配考场
import moment from 'moment'
import { createtExam, upExam, getExamList, deleteExam } from '@/api/exam'
import { getGradeList } from '@/api/grade'
import { getCourseList } from '@/api/course'
import infoList from '@/mixins/infoList'
import { copyObj, unixTimeToAge, unixTimeFormat } from '@/utils/tool.js'
import AffairsDialog from './components/affairsDialog'
export default {
  name: 'Grade',
  mixins: [infoList],

  data() {
    return {
      checked: '',
      value1: 1,
      startTime: '',
      endTime: '',
      listApi: getExamList,
      dialogFormVisible: false,
      dialogTitle: '发布考试',
      form: {
        id: '',
        name: '',
        gradeID: '',
        description: '',
        examItem: []
      },
      type: '',
      rules: {
        name: [{ required: true, message: '请输入考试名称', trigger: 'blur' }],
        gradeID: [{ required: true, message: '请选择年级', trigger: 'change' }]
      },
      gradeList: [],
      courseList: [],
      examItem: [], // 这个是备份的，未修改的
      row: null
    }
  },

  methods: {
    unixTimeToAge,
    unixTimeFormat,

    // 根据时间戳计算年龄
    countAge(birthday) {
      return moment().diff(moment.unix(birthday), 'years')
    },

    // 初始化 form
    initForm() {
      let form = {
        id: '',
        name: '',
        gradeID: '',
        description: '',
        examItem: copyObj(this.examItem)
      }

      this.form = form
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
      console.log('zx', this.form)
      console.log('this.examItem', this.examItem)
    },

    // 关闭弹窗
    closeDialog() {
      this.initForm()
      this.dialogFormVisible = false
    },

    // 打开考试创建,编辑弹窗
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

    // 编辑考试数据准备
    async editExam(row) {
      row = copyObj(row)
      let examItem = row.examItem
      for (const key in this.form) {
        if (key != 'examItem') {
          this.form[key] = row[key]
        }
      }
      examItem.forEach((n) => {
        let findI = this.form.examItem.findIndex((x) => x.courseID == n.courseID)
        this.form.examItem[findI].ID = n.ID
        this.form.examItem[findI].check = true
        this.form.examItem[findI].date = moment.unix(n.startTime).valueOf()
        this.form.examItem[findI].startTime = unixTimeFormat(n.startTime, 'HH:mm')
        this.form.examItem[findI].endTime = unixTimeFormat(n.endTime, 'HH:mm')
      })
      this.form.id = row.ID
      this.openDialog('edit')
    },

    // 删除考试
    async deleteExam(row) {
      this.deleteTableData(row.name, deleteExam + '并删除相关考场分配，考试成绩等信息 ', { id: row.ID })
    },

    // 将前台格式整理为 服务器端 格式
    formatFormToServe() {
      let form = copyObj(this.form)
      console.log(form)
      let examItem = []
      form.examItem.forEach((n) => {
        if (n.check) {
          n.startTime = moment(n.date).set('hour', n.startTime.split(':')[0]).set('minute', n.startTime.split(':')[1]).unix()
          n.endTime = moment(n.date).set('hour', n.endTime.split(':')[0]).set('minute', n.endTime.split(':')[1]).unix()
          examItem.push(n)
        }
      })
      form.examItem = examItem
      return form
    },

    // 检查考试项填写是否规范
    checkExamItem() {
      let form = copyObj(this.form)
      let examItem = form.examItem
      let checkFail, checkFailName
      examItem = examItem.filter((n) => n.check)
      if (examItem.length == 0) {
        this.$message.warning('请至少选择一个科目')
        return false
      }

      checkFail = examItem.filter((n) => n.date == '' || n.startTime == 0 || n.endTime == 0)
      if (checkFail.length !== 0) {
        checkFailName = checkFail.map((n) => n.courseName)
        this.$message.warning(checkFailName.join(',') + '信息填写不完整')
        return false
      }

      checkFail = examItem.filter((n) => n.startTime > n.endTime)
      if (checkFail.length !== 0) {
        checkFailName = checkFail.map((n) => n.courseName)
        this.$message.warning(checkFailName.join(',') + '时间填写不正确')
        return false
      }

      return true
    },

    // 提交表单
    async enterDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.checkExamItem()) {
          let form = this.formatFormToServe()

          form = {
            name: '2021年6月七年级期中考试 ',
            gradeID: 1,
            description: '',
            examItem: [
              { check: true, courseID: 1, courseName: '语文', date: 1658851200000, startTime: 1658883600, endTime: 1658892600 },
              { check: true, courseID: 2, courseName: '数学', date: 1658851200000, startTime: 1658903400, endTime: 1658912400 },
              { check: true, courseID: 3, courseName: '英语', date: 1658937600000, startTime: 1658970000, endTime: 1658979000 },
              { check: true, courseID: 4, courseName: '政治', date: 1658937600000, startTime: 1658989800, endTime: 1658998800 }
            ]
          }
          console.log(form)
          if (this.type === 'add') {
            delete form.id
            const res = await createtExam(form)

            if (res.code === 0) {
              this.$message.success('添加成功')
            }
          } else {
            const res = await upExam(form)
            if (res.code === 0) {
              this.$message.success('编辑成功')
            }
          }
          this.closeDialog()
          this.getTableData()
        }
      })
    },

    // 获取年级列表
    async getGradeList() {
      let res = await getGradeList()
      let list = res.data.list
      this.gradeList = list
    },

    // 获取课程列表
    async getCourseList() {
      let res = await getCourseList()
      let list = res.data.list
      let examItem = []
      this.courseList = list

      list.forEach((n) => {
        examItem.push({
          check: false,
          courseID: n.ID,
          courseName: n.name,
          date: '',
          startTime: 0,
          endTime: 0
        })
      })
      this.form.examItem = examItem
      this.examItem = copyObj(examItem)
    },

    // 显示分配考场弹窗
    showAffairsDialog(row) {
      console.log(row, 'tow')
      this.row = row
      this.$refs.AffairsDialog.dialogFormVisible = true
    }
  },

  components: { AffairsDialog },
  created() {
    this.getTableData()
    this.getGradeList()
    this.getCourseList()
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
.examItem {
  display: flex;
  .examItem__checkbox,
  .examItem__date,
  .examItem__time {
    margin-right: 10px;
  }
  .examItem__time:last-child {
    margin-right: 0px;
  }
}
</style>
