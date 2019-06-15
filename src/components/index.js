import Vue from 'vue'

import {
  Container,
  Header,
  Main,
  Row,
  Col,
  Button,
  Input,
  Select,
  Option,
  DatePicker,
  Table,
  TableColumn,
  Pagination,
  Message,
  Loading,
  MessageBox
} from 'element-ui'

const components = {
  Container,
  Header,
  Main,
  Row,
  Col,
  Button,
  Input,
  Select,
  Option,
  DatePicker,
  TableColumn,
  Table,
  Pagination
}

Object.keys(components).forEach(component => {
  Vue.use(components[component])
})

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt