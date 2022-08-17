<template>
  <div class="resultAnalyse">
    <div class="resultAnalyse__form">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <!-- <el-form-item label="年级">
          <el-select v-model="searchInfo.gradeID" placeholder="请选择年级">
            <el-option v-for="n in gradeList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item> -->
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
          <el-button size="mini" type="primary" icon="el-icon-search" @click="searchAllChar()">分析</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-analyse-content">
      <div class="row1">
        <div class="row1__item">
          <ModuleTitle title="总成绩" tooltip="每个学生考试总成绩-当期" />
          <BarChar :charData="studentTotalResult" :type="1" class="char-box" />
        </div>
        <div class="row1__item">
          <ModuleTitle title="单科成绩" tooltip="每个学生考试单科成绩-当期" :selectOpt="courseList" @selChange="allCourseChange" :selValue="lastExamCourseID" />
          <BarChar :charData="gradeCourseAverageResult" :type="2" class="char-box" />
        </div>
        <div class="row1__item">
          <ModuleTitle title="及格率" tooltip="全班级成绩大于60分的科目/全班级参加考试的总科目-当期" />
          <PieChar :charData="classPassPercent" class="char-box" />
        </div>
      </div>
      <div class="row2">
        <div class="row2__item">
          <ModuleTitle title="总成绩" tooltip="每个学生每一期参加考试的总成绩" />
          <LineChar class="char-box" :charData="studentTotalResultHistory" />
        </div>
        <div class="row2__item">
          <ModuleTitle title="单科成绩" tooltip="每个学生每一期参加考试的单科成绩" @selChange="singleCourseChange" :selectOpt="courseList" :selValue="singleCourseID" />
          <LineChar class="char-box" :charData="studentCourseResultHistory" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGradeList } from '@/api/grade'
import { getClassList } from '@/api/class'
import { getStudentTotalResult, getClassPassPercent, getStudentToTalResultHistory, getStudentCourseResultHistory } from '@/api/resultAnalyseClass.js'
import { getStudentCourseResult, getStudentTotalResultHistory } from '@/api/resultAnalyseStudent.js'
import { getCourseList } from '@/api/course'
import { copyObj } from '@/utils/tool.js'
import BarChar from '../components/char/barChar.vue'
import ModuleTitle from '../components/moduleTitle.vue'

import LineChar from '../components/char/lineChar.vue'
import PieChar from '../components/char/pieChar.vue'
export default {
  data() {
    return {
      searchInfo: {
        gradeID: '',
        classID: ''
      },
      lastExamCourseID: null,
      singleCourseID: null,
      courseList: [],
      studentTotalResult: null,
      classPassPercent: null,
      gradeCourseAverageResult: null,
      studentTotalResultHistory: null,
      studentCourseResultHistory: null,
      classListAll: [],
      classList: [], // 班级列表
      gradeListAll: [], // 年级列表
      gradeList: []
    }
  },

  methods: {
    // 所有科目平均成绩改变
    allCourseChange(val) {
      this.lastExamCourseID = val
      this.getStudentCourseTotalResult()
    },

    // 单个科目平均成绩改变
    singleCourseChange(val) {
      this.singleCourseID = val
      this.getGradeCourseAverageResultHistory()
    },

    // 获取课程列表
    async getCourseList() {
      const res = await getCourseList()
      let list = res.data.list
      this.courseList = list.map((x) => {
        return {
          label: x.name,
          value: x.ID
        }
      })
      this.singleCourseID = this.courseList[0].value
      this.lastExamCourseID = this.courseList[0].value
    },

    // 年级改变
    gradeChane(val) {
      let classList = []
      if (val !== 0) classList = this.classListAll.filter((n) => n.gradeID === val)
      this.classList = classList
      this.searchInfo.classID = this.classList[0].ID
    },

    // 获取班级列表
    async getClassList() {
      let res = await getClassList()
      let list = res.data.list
      this.classListAll = list
      // this.searchInfo.classID = this.gradeList[0].ID
    },

    // 获取年级列表
    async getGradeList() {
      let res = await getGradeList()
      let list = res.data.list
      this.gradeListAll = copyObj(list)
      this.gradeList = list
      this.searchInfo.gradeID = this.gradeList[0].ID
      this.gradeChane(this.gradeList[0].ID)
    },

    // 获取班级每个学生总成绩
    async getStudentTotalResult() {
      let res = await getStudentTotalResult({ gradeID: this.searchInfo.gradeID, classID: this.searchInfo.classID })
      const data = res.data

      let charData = {
        time: [],
        data: []
      }
      data.forEach((n) => {
        charData.time.push(n.studentName)
        charData.data.push(n.total)
      })
      this.studentTotalResult = charData
    },

    // 获取班级每个学生指定科目成绩
    async getStudentCourseTotalResult() {
      let res = await getStudentTotalResult({ gradeID: this.searchInfo.gradeID, classID: this.searchInfo.classID, courseID: this.lastExamCourseID })
      const data = res.data

      let charData = {
        time: [],
        data: []
      }
      data.forEach((n) => {
        charData.time.push(n.studentName)
        charData.data.push(n.total)
      })
      this.gradeCourseAverageResult = charData
    },

    // 获取班级通过率
    async getClassPassPercent() {
      let res = await getClassPassPercent({ gradeID: this.searchInfo.gradeID, classID: this.searchInfo.classID })

      const data = res.data
      let charData = [
        { name: '及格', value: data },
        { name: '不及格', value: (100 - data).toFixed(2) }
      ]
      this.classPassPercent = charData
    },

    // 获取班级通过率
    async getStudentToTalResultHistory() {
      let res = await getStudentToTalResultHistory({ gradeID: this.searchInfo.gradeID, classID: this.searchInfo.classID })
      let data = res.data
      let charData = {
        time: [],
        data: []
      }

      let obj = {}
      data.forEach((n) => {
        if (!charData.time.includes(n.examName)) charData.time.push(n.examName)
        let key = n.studentID + '_' + n.studentName
        if (!(key in obj)) obj[key] = []
        obj[key].push(n.result)
      })

      for (const key in obj) {
        charData.data.push({
          name: key.split('_')[1],
          value: obj[key]
        })
      }
      this.studentTotalResultHistory = charData
    },

    // 获取班级通过率
    async getStudentCourseResultHistory() {
      let res = await getStudentCourseResultHistory({ gradeID: this.searchInfo.gradeID, classID: this.searchInfo.classID })
      let data = res.data
      let charData = {
        time: [],
        data: []
      }

      let obj = {}
      data.forEach((n) => {
        if (!charData.time.includes(n.examName)) charData.time.push(n.examName)
        let key = n.studentID + '_' + n.studentName
        if (!(key in obj)) obj[key] = []
        obj[key].push(n.result)
      })

      for (const key in obj) {
        charData.data.push({
          name: key.split('_')[1],
          value: obj[key]
        })
      }
      this.studentTotalResultHistory = charData
    },

    // 获取班级下，学生考试总成绩-历史
    async getStudentCourseResult() {
      let res = await getStudentCourseResult({ gradeID: this.searchInfo.gradeID, studentID: 10 })
      console.log(res)
    },

    // 获取学生每一期考试的总成绩
    async getStudentTotalResultHistory() {
      let res = await getStudentTotalResultHistory({ gradeID: this.searchInfo.gradeID, studentID: 10 })
      console.log(res)
    },

    // 获取所有char 数据
    searchAllChar() {
      // this.getStudentCourseResult()
      this.getStudentTotalResultHistory()
    }
  },

  components: {
    BarChar,
    ModuleTitle,
    PieChar,
    LineChar
  },

  computed: {},

  mounted() {},

  async created() {
    await this.getClassList()
    await this.getGradeList()
    await this.getCourseList()
    this.getStudentCourseResult()
    // this.searchAllChar()
  }
}
</script>
<style lang="scss" scoped>
.p-char-title {
  font-size: 18px;
  .icon {
    margin-left: 10px;
    color: #dddddd;
  }
}
.result-analyse-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 208px);
  .row1,
  .row2 {
    flex: 1;
  }
  .row1 {
    display: flex;
    .row1__item {
      box-sizing: border-box;
      padding: 15px 15px 0;
      width: 100%;
      height: 100%;
      flex: 1;
      background: white;
      &:not(:last-child) {
        margin-right: 14px;
      }
      .char-box {
        height: 100%;
        height: calc(100% - 30px);
      }
    }
  }
  .row2 {
    display: flex;
    margin-top: 14px;

    .row2__item {
      box-sizing: border-box;
      padding: 15px 15px 0;
      flex: 1;
      background: white;
      &:first-child {
        margin-right: 14px;
      }
      .char-box {
        height: 100%;
        height: calc(100% - 30px);
      }
    }
  }
}

.resultAnalyse {
  padding: 0;
  .resultAnalyse__form {
    background: white;
    padding: 14px;
    margin-bottom: 14px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
