<template>
  <div class="p-char-title">
    <div class="p-char-title__text">
      <span>{{ title }}</span>
      <el-tooltip class="item" effect="dark" :content="tooltip" placement="top" v-if="tooltip">
        <span class="el-icon-info icon"></span>
      </el-tooltip>
    </div>
    <el-select v-model="value" placeholder="" label="科目" size="mini" filterable @change="change" v-if="selectOpt">
      <el-option v-for="(n, i) in selectOpt" :key="i" :label="n.label" :value="n.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ['title', 'tooltip', 'selectOpt', 'selValue'],
  data() {
    return {
      value: ''
    }
  },

  watch: {
    selValue: {
      immediate: true,
      handler: function (val) {
        if (val) this.value = val
      }
    }
  },

  methods: {
    change(val) {
      this.$emit('selChange', val)
    }
  },

  components: {},

  computed: {},

  mounted() {},

  created() {}
}
</script>
<style lang="scss" scoped>
.p-char-title {
  display: flex;
  justify-content: space-between;
  .p-char-title__text {
    font-size: 18px;
  }
  .icon {
    margin-left: 10px;
    color: #dddddd;
  }
}
</style>
