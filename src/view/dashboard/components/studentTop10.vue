<template>
  <ul class="student_top10">
    <li v-for="(n, i) in Array(10).fill(0)" :key="'q' + i">
      <img :src="defaultImg" alt="" />
      <p>100分</p>
      <p>张佳伟 &emsp;&emsp;三年级二班</p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      defaultImg: require('@/assets/img/user-header/default1.png')
    }
  },

  methods: {},

  components: {},

  computed: {},

  mounted() {},

  created() {}
}
</script>
<style lang="scss" scoped>
.student_top10 {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  li {
    display: flex;
    border-bottom: 1px dashed #ddd;
    padding: 4px 0;
    margin-top: 10px;
    &:first-child {
      // border-top: 1px solid #ddd;
    }
    img {
      width: 50px;
      border-radius: 100px;
    }
    p {
      line-height: 50px;
      margin-left: 20px;
    }
  }
}
</style>
