<template>
  <div class="dashboard">
    <ul class="row1">
      <li class="row1__item row1__item--icon row1__item--icon-blue">
        <div class="row1__item__left">
          <img src="./img/car.svg" alt="" />
        </div>
        <div class="row1__item__right">
          <p class="key">车辆通行数量</p>
          <p class="val">123</p>
        </div>
      </li>
      <li class="row1__item row1__item--icon row1__item--icon-purple">
        <div class="row1__item__left">
          <img src="./img/user.svg" alt="" />
        </div>
        <div class="row1__item__right">
          <p class="key">人员通行数量</p>
          <p class="val">123</p>
        </div>
      </li>
      <li class="row1__item row1__item--char">
        <div class="title">教师考勤</div>
        <div class="char char--blue">
          <div class="char__data">
            <p class="char__data__number">12/123</p>
            <p class="char__data__text">出勤数 / 总人数</p>
          </div>
          <div class="char__content">
            <div class="char__line"></div>
          </div>
        </div>
      </li>
      <li class="row1__item row1__item--char">
        <div class="title">学生考勤</div>
        <div class="char char--red">
          <div class="char__data">
            <p class="char__data__number">12/123</p>
            <p class="char__data__text">出勤数 / 总人数</p>
          </div>
          <div class="char__content">
            <div class="char__line"></div>
          </div>
        </div>
      </li>
    </ul>
    <div class="row2">
      <div class="row2__col1">
        <p class="p-char-title">教师</p>
        <TeacherChar class="teacher_char" />
        <div class="teacher-data">
          <p>男教师 30 人</p>
          <p>女教师 30 人</p>
        </div>
      </div>
      <div class="row2__col2">
        <p class="p-char-title">教师考勤</p>
        <TeacherAttendChar class="teacher_attend_char" />
      </div>
      <div class="row2__col3">
        <p class="p-char-title">前十名</p>
        <StudentTop10 class="student_top10" />
      </div>
    </div>
    <div class="row3">
      <div class="row3__col1">
        <p class="p-char-title">各班级学生人数</p>
        <StudentChar />
      </div>
      <div class="row3__col2"><p class="p-char-title">学生考勤</p></div>
    </div>
  </div>
</template>

<script>
import TeacherChar from './components/teacherChar.vue'
import TeacherAttendChar from './components/teacherAttendChar.vue'
import StudentTop10 from './components/studentTop10.vue'
import StudentChar from './components/studentChar.vue'
export default {
  data() {
    return {}
  },

  methods: {},

  components: {
    TeacherChar,
    TeacherAttendChar,
    StudentTop10,
    StudentChar
  },

  computed: {},

  mounted() {},

  created() {}
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
      .student_top10 {
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
    }
    .row3__col1 {
      margin-right: 14px;
    }
  }
}
</style>
