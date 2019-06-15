import Vue from 'vue'
import App from './App'

import './components/index'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
