import Vue from 'vue'
import App from './App.vue'
// 引入gin-vue-admin前端初始化相关内容
import './core/gin-vue-admin'
// 引入封装的router
import router from '@/router/index'
import '@/permission'
import { store } from '@/store'
Vue.config.productionTip = false

// TODO: 感觉没啥用，后期可以删掉
import { auth } from '@/directive/auth'
// 按钮权限指令
auth(Vue)

import conf from '@/conf/conf.js'
Vue.use(conf)

import '@/style/common.scss' // 公共的css
export default new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
