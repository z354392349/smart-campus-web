<template>
  <div class="result-analyse">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'ResultAnalyse'
}
</script>
<style lang="scss" scoped>
.result-analyse {
  background: #f0f2f5;
  padding: 0;
}
</style>
