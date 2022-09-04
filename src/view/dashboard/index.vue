<template>
  <div class="dashboard">
    <ul class="row1">
      <li class="row1__item row1__item--icon row1__item--icon-blue">
        <div class="row1__item__left">
          <img src="./img/car.svg" alt="" />
        </div>
        <div class="row1__item__right">
          <p class="key">今日车辆通行次数</p>
          <p class="val">{{ censusNum.carAccess }}</p>
        </div>
      </li>
      <li class="row1__item row1__item--icon row1__item--icon-purple">
        <div class="row1__item__left">
          <img src="./img/user.svg" alt="" />
        </div>
        <div class="row1__item__right">
          <p class="key">今日人员通行次数</p>
          <p class="val">{{ censusNum.peopleAccess }}</p>
        </div>
      </li>
      <li class="row1__item row1__item--char">
        <div class="title">今日教师考勤</div>
        <div class="char char--blue">
          <div class="char__data">
            <p class="char__data__number" v-if="censusNum.teacherCensus">{{ censusNum.teacherCensus.attend }} / {{ censusNum.teacherCensus.num }}</p>
            <p class="char__data__number" v-else>- / -</p>
            <p class="char__data__text">出勤数 / 总人数</p>
          </div>
          <div class="char__content">
            <div class="char__line" v-if="censusNum.teacherCensus" :style="{ width: (censusNum.teacherCensus.attend / censusNum.teacherCensus.num) * 100 + '%' }"></div>
          </div>
        </div>
      </li>
      <li class="row1__item row1__item--char">
        <div class="title">今日学生考勤</div>
        <div class="char char--red">
          <div class="char__data">
            <p class="char__data__number" v-if="censusNum.studentCensus">{{ censusNum.studentCensus.attend }} / {{ censusNum.studentCensus.num }}</p>
            <p class="char__data__number" v-else>- / -</p>
            <p class="char__data__text">出勤数 / 总人数</p>
          </div>
          <div class="char__content">
            <div class="char__line" v-if="censusNum.studentCensus" :style="{ width: (censusNum.studentCensus.attend / censusNum.studentCensus.num) * 100 + '%' }"></div>
          </div>
        </div>
      </li>
    </ul>
    <div class="row2">
      <div class="row2__col1">
        <p class="p-char-title">教师人数</p>
        <TeacherChar :charData="teacherNum" class="teacher_char" />
        <div class="teacher-data">
          <p>男教师 {{ teacherNum[0] ? teacherNum[0].value : '-' }}人</p>
          <p>女教师 {{ teacherNum[1] ? teacherNum[1].value : '-' }} 人</p>
        </div>
      </div>
      <div class="row2__col2">
        <p class="p-char-title">教师考勤</p>
        <AttendChar :charData="teacherAttendCharData" type="teacher" class="teacher_attend_char" />
      </div>
      <div class="row2__col3">
        <p class="p-char-title">合格率</p>
        <CssLineChar :charData="examPassRate" class="css-line-char" />
      </div>
    </div>
    <div class="row3">
      <div class="row3__col1">
        <p class="p-char-title">各班级学生人数</p>
        <StudentChar :charData="studentCharData" />
      </div>
      <div class="row3__col2">
        <p class="p-char-title">学生考勤</p>
        <AttendChar :charData="studentAttendCharData" type="student" class="student_attend_char" />
      </div>
    </div>
  </div>
</template>

<script>
import TeacherChar from './components/teacherChar.vue'
import AttendChar from './components/attendChar.vue'
// import StudentTop10 from './components/studentTop10.vue'
import StudentChar from './components/studentChar.vue'
import CssLineChar from './components/cssLineChar.vue'
import { getDashboardCensusNum, getTeacherNum, getExamPassRate, getTeacherAttendCensus, getStudentNum, getStudentAttendCensus } from '@/api/dashboard.js'
export default {
  data() {
    return {
      censusNum: {
        peopleAccess: '-',
        carAccess: '-',
        teacherCensus: null,
        studentCensus: null
      },
      teacherNum: [],
      examPassRate: [],
      teacherAttendCharData: null,
      studentCharData: null,
      studentAttendCharData: null
    }
  },

  methods: {
    // 获取人员，车辆通行数量，学生教师考勤
    async getDashboardCensusNum() {
      let res = await getDashboardCensusNum()
      this.censusNum = res.data
    },

    // 获取教师数量
    async getTeacherNum() {
      let res = await getTeacherNum()
      let teacherNum = res.data
      teacherNum.sort((x, y) => x.sex - y.sex)
      this.teacherNum = teacherNum.map((x) => {
        return { name: x.sex == 1 ? '男' : '女', value: x.num }
      })
      console.log(this.teacherNum, 'teacherNum')
    },

    // 获取合格率
    async getExamPassRate() {
      let res = await getExamPassRate()
      let data = res.data

      data.forEach((n) => {
        n.scale = ((n.rate / n.total) * 100).toFixed(2)
      })
      this.examPassRate = data
    },

    // 获取教师考勤
    async getTeacherAttendCensus() {
      let res = await getTeacherAttendCensus()
      let data = res.data
      let charData = {
        time: [],
        data: [
          { name: '出勤率', value: [] },
          { name: '准点率', value: [] }
        ]
      }
      data = data.slice(-7)
      data.forEach((n) => {
        charData.time.push(n.time)
        charData.data[0].value.push(n.attend)
        charData.data[1].value.push(n.onTime)
      })
      this.teacherAttendCharData = charData
    },

    // 获取教师考勤
    async getStudentNum() {
      let res = await getStudentNum()
      let data = res.data
      this.studentCharData = data
    },

    // 获取学生考勤 - 历史
    async getStudentAttendCensus() {
      let res = await getStudentAttendCensus()
      let data = res.data

      let charData = {
        time: [],
        data: [
          { name: '出勤率', value: [] },
          { name: '准点率', value: [] }
        ]
      }
      data = data.slice(-7)
      data.forEach((n) => {
        charData.time.push(n.time)
        charData.data[0].value.push(n.attend)
        charData.data[1].value.push(n.onTime)
      })
      this.studentAttendCharData = charData
    }
  },

  components: {
    TeacherChar,
    AttendChar,
    CssLineChar,
    StudentChar
  },

  computed: {},

  mounted() {},

  created() {
    this.getDashboardCensusNum()
    this.getTeacherNum()
    this.getExamPassRate()
    this.getTeacherAttendCensus()
    this.getStudentNum()
    this.getStudentAttendCensus()
  }
}
</script>
<style lang="scss" scoped>
.p-char-title {
  font-size: 18px;
}
.dashboard {
  background: #f0f2f5;
  padding: 0;
  .row1 {
    height: 120px;
    display: flex;
    .row1__item {
      box-sizing: border-box;
      padding: 15px 15px 0;
      background: white;
      height: 100%;
      flex: 1;
      &:not(:last-child) {
        margin-right: 14px;
      }
    }

    .row1__item--icon {
      display: flex;
      .row1__item__left {
        margin-top: 6px;
        display: flex;
        width: 80px;
        height: 80px;
        border-radius: 100px;

        text-align: center;
        justify-content: center;
        img {
          width: 60%;
        }
      }
      .row1__item__right {
        margin-left: 15px;
        .key {
          font-size: 24px;
          font-weight: 600;
        }
        .val {
          margin-top: 24px;
          font-size: 24px;
        }
      }
    }

    .row1__item--icon-purple {
      .row1__item__left {
        background: #f3f3ff;
      }
      .val {
        color: #6366d6;
      }
    }
    .row1__item--icon-blue {
      .row1__item__left {
        background: #ecfdf6;
      }
      .val {
        color: #49c285;
      }
    }
    .row1__item--char {
      .title {
        font-size: 24px;
        font-weight: 600;
      }
      .char {
        margin-top: 15px;
        .char__data {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          .char__data__number {
            font-size: 24px;
          }
          .char__data__text {
            color: #a2a2a2;
            margin-top: 8px;
          }
        }
        .char__content {
          width: 100%;
          height: 12px;
          background: #edf1f5;
          overflow: hidden;
          border-radius: 12px;
          .char__line {
            width: 50%;
            height: 100%;
            border-radius: 12px;
            // background-image: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
          }
        }
      }

      .char--blue {
        .char__data__number {
          color: #4c83ff;
        }
        .char__line {
          background-image: linear-gradient(135deg, #4c83ff 10%, #2afadf 100%);
        }
      }
      .char--red {
        .char__data__number {
          color: #e96d71;
        }
        .char__line {
          background-image: linear-gradient(135deg, #e96d71 10%, #fad7a1 100%);
        }
      }
    }
  }
  .row2 {
    display: flex;
    margin-top: 15px;
    height: 360px;
    .row2__col1 {
      box-sizing: border-box;
      flex: 1;
      padding: 14px;
      background: white;
      .teacher_char {
        width: 100%;
        height: calc(100% - 60px);
      }

      .teacher-data {
        text-align: center;
        p {
          display: inline-block;
          color: #a2a2a2;
          &::before {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 6px;
            border-radius: 100px;
            content: ' ';
          }
          &:first-child {
            margin-right: 20px;
            &::before {
              background: #5487ff;
            }
          }
          &:last-child {
            margin-right: 10px;
            &::before {
              background: #ff6d8a;
            }
          }
        }
      }
    }

    .row2__col2 {
      box-sizing: border-box;
      flex-basis: calc(50% - 7px);
      padding: 14px;
      margin: 0 14px;
      background: white;
      .teacher_attend_char {
        width: 100%;
        height: calc(100% - 20px);
      }
    }
    .row2__col3 {
      flex: 1;
      box-sizing: border-box;
      background: white;
      padding: 14px;
      .css-line-char {
        height: calc(100% - 20px);
      }
    }
  }
  .row3 {
    display: flex;
    margin-top: 14px;
    width: 100%;
    height: calc(100vh - 635px);
    .row3__col1,
    .row3__col2 {
      flex: 1;
      box-sizing: border-box;
      background: white;
      padding: 14px;
      .student_attend_char {
        width: 100%;
        height: calc(100% - 20px);
      }
    }
    .row3__col1 {
      margin-right: 14px;
    }
  }
}
</style>
