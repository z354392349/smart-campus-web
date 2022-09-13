<template>
  <div class="resultAnalyse">
    <div class="resultAnalyse__form" v-if="authorityId !== '03'">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="年级">
          <el-select v-model="searchInfo.gradeID" placeholder="请选择年级" @change="gradeChange">
            <el-option v-for="n in gradeList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="searchInfo.classID" placeholder="请选择班级" @change="classChange">
            <el-option v-for="n in classList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="学生">
          <el-select v-model="searchInfo.studentID" placeholder="请选择学生">
            <el-option v-for="n in studentList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="searchAllChar()">分析</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-analyse-content" :class="{ 'result-analyse-content--student': authorityId == '03' }">
      <div class="row1">
        <div class="row1__item">
          <ModuleTitle title="当期总成绩" tooltip="每个学生考试总成绩-当期" />
          <BarChar :charData="studentTotalResult" :type="1" class="char-box" />
        </div>
        <div class="row1__item">
          <ModuleTitle title="当期单科成绩" tooltip="每个学生考试单科成绩-当期" />
          <BarChar :charData="gradeCourseAverageResult" :type="2" class="char-box" />
        </div>
        <div class="row1__item">
          <ModuleTitle title="当期及格率" tooltip="全班级成绩大于60分的科目/全班级参加考试的总科目-当期" />
          <PieChar :charData="classPassPercent" class="char-box" />
        </div>
      </div>
      <div class="row2">
        <div class="row2__item">
          <ModuleTitle title="历史总成绩" tooltip="每个学生每一期参加考试的总成绩" />
          <LineChar class="char-box" :charData="studentTotalResultHistory" />
        </div>
        <div class="row2__item">
          <ModuleTitle title="历史单科成绩" tooltip="每个学生每一期参加考试的单科成绩" @selChange="singleCourseChange" :selectOpt="courseList" :selValue="singleCourseID" />
          <LineChar class="char-box" :charData="studentCourseResultHistory" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGradeList } from '@/api/grade'
import { getClassList } from '@/api/class'
import { getStudentList } from '@/api/student.js'
import { getStudentCourseResult, getStudentTotalResultHistory, getStudentCourseResultHistory } from '@/api/resultAnalyseStudent.js'
import { getCourseList } from '@/api/course'
import { copyObj } from '@/utils/tool.js'
import BarChar from '../components/char/barChar.vue'
import ModuleTitle from '../components/moduleTitle.vue'

import LineChar from '../components/char/lineChar.vue'
import PieChar from '../components/char/pieChar.vue'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchInfo: {
        gradeID: '',
        classID: '',
        studentID: ''
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
      gradeList: [],
      studentList: [],
      authorityId: ''
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
      this.getStudentCourseResultHistory()
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

    // 获取班级列表
    async getClassList() {
      let res = await getClassList()
      let list = res.data.list
      this.classListAll = list
    },

    // 获取年级列表
    async getGradeList() {
      let res = await getGradeList()
      let list = res.data.list
      this.gradeListAll = copyObj(list)
      this.gradeList = list
      this.searchInfo.gradeID = this.gradeList[0].ID
      this.gradeChange(this.gradeList[0].ID)
    },

    // 获取班级列表
    async getStudentList() {
      let res = await getStudentList({ page: 1, pageSize: 1000, classID: this.searchInfo.classID })
      let list = res.data.list
      this.studentList = list
      this.searchInfo.studentID = this.studentList[0].ID
    },

    // 班级改变
    classChange() {
      this.getStudentList()
    },

    // 年级改变
    gradeChange(val) {
      let classList = []
      if (val !== 0) classList = this.classListAll.filter((n) => n.gradeID === val)
      this.classList = classList
      this.searchInfo.classID = this.classList[0].ID

      // 班级改变
      this.classChange()
    },

    // 获取学生当期 每一个科目成绩，对应上面三个图表
    async getStudentCourseResult() {
      let res = await getStudentCourseResult({ gradeID: this.searchInfo.gradeID, studentID: this.searchInfo.studentID })
      let data = res.data

      // 总成绩数据整理
      let charData = {
        time: ['总成绩'],
        data: [0]
      }
      data.forEach((n) => {
        charData.data[0] += n.result
      })
      this.studentTotalResult = charData

      // 单科成绩数据整理
      charData = {
        time: [],
        data: []
      }
      data.forEach((n) => {
        charData.time.push(n.courseName)
        charData.data.push(n.result)
      })

      this.gradeCourseAverageResult = charData

      // 及格率
      charData = [
        { name: '及格', value: 0 },
        { name: '不及格', value: 0 }
      ]
      let passNum = data.filter((n) => n.result >= 60).length
      let passPercent = ((passNum / data.length) * 100).toFixed(2)
      charData[0].value = passPercent
      charData[1].value = (100 - passPercent).toFixed(2)
      this.classPassPercent = charData
    },

    // 获取学生每一期考试的总成绩
    async getStudentTotalResultHistory() {
      let res = await getStudentTotalResultHistory({ gradeID: this.searchInfo.gradeID, studentID: this.searchInfo.studentID })
      let data = res.data
      let charData = {
        time: [],
        data: [{ name: '总成绩', value: [] }]
      }
      data.forEach((n) => {
        charData.time.push(n.examName)
        charData.data[0].value.push(n.total)
      })
      this.studentTotalResultHistory = charData
    },

    // 获取学生全部考试单科成绩
    async getStudentCourseResultHistory() {
      let res = await getStudentCourseResultHistory({ studentID: this.searchInfo.studentID, courseID: this.singleCourseID })
      console.log(res)
      let data = res.data
      let charData = {
        time: [],
        data: [{ name: this.courseList.filter((n) => n.value == this.singleCourseID)[0].label, value: [] }]
      }
      data.forEach((n) => {
        charData.time.push(n.examName)
        charData.data[0].value.push(n.result)
      })
      this.studentCourseResultHistory = charData
    },

    // 获取所有char 数据
    searchAllChar() {
      this.getStudentCourseResult()
      this.getStudentTotalResultHistory()
      this.getStudentCourseResultHistory()
    }
  },

  components: {
    BarChar,
    ModuleTitle,
    PieChar,
    LineChar
  },

  computed: {
    ...mapGetters('user', ['userInfo'])
  },

  mounted() {},

  async created() {
    if (this.userInfo.authority.authorityId == '03') {
      this.searchInfo.studentID = this.userInfo.authority.studentID
      this.searchInfo.gradeID = this.userInfo.authority.gradeID
      this.authorityId = this.userInfo.authority.authorityId
    } else {
      await this.getClassList()
      await this.getGradeList()
      await this.getStudentList()
    }
    await this.getCourseList()
    this.searchAllChar()
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

.result-analyse-content--student {
  height: calc(100vh - 136px);
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
