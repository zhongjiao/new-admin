import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Row,
  Col,
  Button
} from 'element-ui'

const components = {
  Container,
  Header,
  Main,
  Row,
  Col,
  Button
}

Object.keys(components).forEach(component => {
  Vue.use(components[component])
})