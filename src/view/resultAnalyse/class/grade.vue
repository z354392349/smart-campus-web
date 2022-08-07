<template>
  <div class="grade">
    <div class="grade__form">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="年级">
          <el-select v-model="searchInfo.gradeID" placeholder="请选择年级">
            <el-option v-for="n in gradeList" :key="n.ID" :label="n.name" :value="n.ID" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="search()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getGradeList } from '@/api/grade'
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

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getGradeList()
  }
}
</script>
<style lang="scss" scoped>
.grade {
  background: #f0f2f5;
  padding: 0;
  .grade__form {
    background: white;
    padding: 14px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
