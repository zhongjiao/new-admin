import Vue from 'vue'
import App from './App'

import '@babel/polyfill'

import '@c'
import '@a/style/common'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
