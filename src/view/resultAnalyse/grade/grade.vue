<template>
  <div class="result-analyse-content">
    <div class="row1">
      <div class="row1__item">
        <ModuleTitle title="平均总成绩" tooltip="全年级学生成绩总数/年级学生总数" />
        <StudentChar type="teacher" class="teacher_attend_char" />
      </div>
      <div class="row1__item">
        <ModuleTitle title="平均单科成绩" tooltip="全年级学生单科成绩总数/年级学生总数" />
        <StudentChar type="teacher" class="teacher_attend_char" />
      </div>
      <div class="row1__item">
        <ModuleTitle title="及格率" tooltip="全年级成绩大于60分的科目/全年级参加考试的总科目" />
        <CssLineChar class="pass-rate" />
      </div>
    </div>
    <div class="row2">
      <div class="row2__item">
        <ModuleTitle title="平均总成绩" tooltip="全年级成绩大于60分的科目/全年级参加考试的总科目" />
        <LineChar />
      </div>
      <div class="row2__item">
        <ModuleTitle title="平均单科成绩" tooltip="全年级成绩大于60分的科目/全年级参加考试的总科目" />
        <LineChar />
      </div>
    </div>
  </div>
</template>

<script>
import { getGradeList } from '@/api/grade'
import StudentChar from '../components/char/barChar.vue'
import ModuleTitle from '../components/moduleTitle.vue'
import CssLineChar from '../components/char/cssLineChar'
import LineChar from '../components/char/lineChar'
export default {
  data() {
    return {
      searchInfo: {
        gradeID: ''
      },
      gradeList: []
    }
  },

  methods: {
    search() {},
    // 获取年级列表
    async getGradeList() {
      const res = await getGradeList()
      this.gradeList = res.data.list
    }
  },

  components: {
    StudentChar,
    ModuleTitle,
    CssLineChar,
    LineChar
  },

  computed: {},

  mounted() {},

  created() {
    this.getGradeList()
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
  height: calc(100vh - 126px);
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
      flex: 1;
      background: white;
      &:not(:last-child) {
        margin-right: 14px;
      }
      .pass-rate {
        height: calc(100% - 40px);
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
    }
  }
}
</style>
