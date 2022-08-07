<template>
  <div class="p-char-title">
    <span>{{ title }}</span>
    <el-tooltip class="item" effect="dark" :content="tooltip" placement="top" v-if="tooltip">
      <span class="el-icon-info icon"></span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: ['title', 'tooltip'],
  data() {
    return {}
  },

  methods: {},

  components: {},

  computed: {},

  mounted() {},

  created() {}
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
</style>
