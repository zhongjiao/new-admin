import Vue from 'vue'
import App from './App'

// import '../../../theme/index.css'
import './components/index'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
