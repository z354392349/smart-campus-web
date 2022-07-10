export default {
  install(Vue) {
    // 4. 添加实例方法
    Vue.prototype.$conf = {
      minDialogWidth: '500px',
      mediumDialogWidth: '500px',
      maxDialogWidth: '800px'
    }
  }
}
