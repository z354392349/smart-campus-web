<template>
  <ul class="line-char">
    <li class="line-char__item" v-for="(n, i) in charData" :key="'q' + i">
      <p class="line-char__text">
        <span>{{ n.gradeName }}</span>
        <span>{{ n.scale }}%</span>
      </p>
      <div class="line-char__content">
        <p class="line-char__line" :style="`width:${n.scale}%`"></p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['charData'],
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
.line-char {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .line-char__item {
    .line-char__text {
      display: flex;
      justify-content: space-between;
      color: #a2a2a2;
      margin-bottom: 10px;
    }
    .line-char__content {
      width: 100%;
      height: 12px;
      background: #edf1f5;
      border-radius: 12px;
      .line-char__line {
        width: 50%;
        height: 100%;
        border-radius: 12px;
      }
    }
  }
  .line-char__item:nth-child(1) {
    .line-char__line {
      background-image: linear-gradient(135deg, #4c83ff 10%, #2afadf 100%);
    }
  }
  .line-char__item:nth-child(2) {
    .line-char__line {
      background-image: linear-gradient(135deg, #e96d71 10%, #fad7a1 100%);
    }
  }
  .line-char__item:nth-child(3) {
    .line-char__line {
      background-image: linear-gradient(135deg, #f55555 10%, #fccf31 100%);
    }
  }
  .line-char__item:nth-child(4) {
    .line-char__line {
      background-image: linear-gradient(135deg, #5961f9 10%, #ee9ae5 100%);
    }
  }
}
</style>
