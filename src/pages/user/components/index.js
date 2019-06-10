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
  Pagination
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