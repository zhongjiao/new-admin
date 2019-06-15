import Vue from 'vue'
import App from './App'

import '@babel/polyfill'

import './components/index'
// import 'element-ui/lib/theme-chalk/index.css'
import '@a/style/common'

// Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
