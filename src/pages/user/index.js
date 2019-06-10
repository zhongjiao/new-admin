import Vue from 'vue'
import App from './App'

// import ElementUI from 'element-ui'
// import 'theme/index.css'
import './components/index'
import '@a/style/common'

// Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
