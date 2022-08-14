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
          <ModuleTitle title="平均总成绩" tooltip="全年级学生成绩总数/年级学生总数" />
          <BarChar :charData="studentTotalResult" :type="1" class="char-box" />
        </div>
        <div class="row1__item">
          <ModuleTitle title="平均单科成绩" tooltip="全年级学生单科成绩总数/年级学生总数" :selectOpt="courseList" @selChange="allCourseChange" :selValue="lastExamCourseID" />
          <BarChar :charData="gradeCourseAverageResult" :type="2" class="char-box" />
        </div>
        <div class="row1__item">
          <ModuleTitle title="及格率" tooltip="全年级成绩大于60分的科目/全年级参加考试的总科目" />
          <PieChar :charData="gradePassPercent" class="char-box" />
        </div>
      </div>
      <div class="row2">
        <div class="row2__item">
          <ModuleTitle title="平均总成绩" tooltip="全年级成绩大于60分的科目/全年级参加考试的总科目" />
          <LineChar class="char-box" :charData="studentTotalResultHistory" />
        </div>
        <div class="row2__item">
          <ModuleTitle title="平均单科成绩" tooltip="全年级成绩大于60分的科目/全年级参加考试的总科目" @selChange="singleCourseChange" :selectOpt="courseList" :selValue="singleCourseID" />
          <LineChar class="char-box" :charData="gradeCourseAverageResultHistory" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGradeList } from '@/api/grade'
import { getClassList } from '@/api/class'
import { getGradeAverageResult, getGradePassPercent, getGradeAverageResultHistory, getGradeCourseAverageResultHistory } from '@/api/resultAnalyseGrade.js'
import { getStudentTotalResult } from '@/api/resultAnalyseClass.js'
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
      gradePassPercent: null,
      gradeCourseAverageResult: null,
      studentTotalResultHistory: null,
      gradeCourseAverageResultHistory: null,
      classListAll: [],
      classList: [], // 班级列表
      gradeListAll: [], // 年级列表
      gradeList: []
    }
  },

  methods: {
    search() {},

    // 所有科目平均成绩改变
    allCourseChange(val) {
      this.lastExamCourseID = val
      console.log('在线')
      this.getStudentCourseTotalResult()
    },

    // 单个科目平均成绩改变
    singleCourseChange(val) {
      this.singleCourseID = val
      this.getGradeCourseAverageResultHistory()
    },

    // // 获取年级列表
    // async getGradeList() {
    //   const res = await getGradeList()
    //   this.gradeList = res.data.list
    //   this.searchInfo.gradeID = this.gradeList[0].ID
    // },

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
      console.log(this.courseList)
    },

    // 获取年级指定科目平均成绩
    async getGradeCourseAverageResult() {
      const res = await getGradeAverageResult({ gradeID: this.searchInfo.gradeID, courseID: this.lastExamCourseID })
      console.log(res, '平均成绩')
      const data = res.data
      let charData = {
        time: [],
        data: []
      }
      data.forEach((n) => {
        charData.time.push(n.className)
        charData.data.push(n.Num)
      })
      this.gradeCourseAverageResult = charData
    },

    // 获取年级通过率
    async getGradePassPercent() {
      const res = await getGradePassPercent({ gradeID: this.searchInfo.gradeID })
      console.log(res, 'tongg')
      const data = res.data
      let charData = [
        { name: '及格', value: data },
        { name: '不及格', value: (100 - data).toFixed(2) }
      ]
      this.gradePassPercent = charData
    },

    // 获取年级全部科目平均成绩 - 历史
    async getGradeAverageResultHistory() {
      const res = await getGradeAverageResultHistory({ gradeID: this.searchInfo.gradeID })
      const data = res.data
      let charData = {
        time: [],
        data: [
          { name: '一班', value: [] },
          { name: '二班', value: [] },
          { name: '三班', value: [] },
          { name: '四班', value: [] }
        ]
      }
      data.forEach((n) => {
        if (!charData.time.includes(n.examName)) charData.time.push(n.examName)
        switch (n.className) {
          case '一班':
            charData.data[0].value.push(n.result)
            break
          case '二班':
            charData.data[1].value.push(n.result)
            break
          case '三班':
            charData.data[2].value.push(n.result)
            break
          case '四班':
            charData.data[3].value.push(n.result)
            break
        }
      })
      this.studentTotalResultHistory = charData
    },

    // 获取年级指定科目平均成绩 -历史
    async getGradeCourseAverageResultHistory() {
      const res = await getGradeCourseAverageResultHistory({ gradeID: this.searchInfo.gradeID, courseID: this.singleCourseID })
      const data = res.data
      console.log(res, 'rd')
      let charData = {
        time: [],
        data: [
          { name: '一班', value: [] },
          { name: '二班', value: [] },
          { name: '三班', value: [] },
          { name: '四班', value: [] }
        ]
      }
      data.forEach((n) => {
        if (!charData.time.includes(n.examName)) charData.time.push(n.examName)
        switch (n.className) {
          case '一班':
            charData.data[0].value.push(n.result)
            break
          case '二班':
            charData.data[1].value.push(n.result)
            break
          case '三班':
            charData.data[2].value.push(n.result)
            break
          case '四班':
            charData.data[3].value.push(n.result)
            break
        }
      })
      this.gradeCourseAverageResultHistory = charData
    },

    // 年级改变
    gradeChane(val) {
      let classList = []
      if (val !== 0) classList = this.classListAll.filter((n) => n.gradeID === val)
      this.classList = classList
      this.searchInfo.classID = this.classList[0].ID
      console.log(this.classList, ' this.classList')
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
      console.log(res, 'rrrrr')
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
    // 获取班级每个学生总成绩
    async getStudentCourseTotalResult() {
      let res = await getStudentTotalResult({ gradeID: this.searchInfo.gradeID, classID: this.searchInfo.classID, courseID: this.lastExamCourseID })
      const data = res.data
      console.log(data)
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

    // 获取班级每个学生指定科目成绩

    // 获取所有char 数据
    searchAllChar() {
      this.getGradeAverageResult()
      this.getGradeCourseAverageResult()
      this.getGradePassPercent()
      this.getGradeAverageResultHistory()
      this.getGradeCourseAverageResultHistory()
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
    this.getStudentTotalResult()
    this.getStudentCourseTotalResult()
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
