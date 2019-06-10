<template>
  <div id="app" class="table-content-body">
    <el-container class="nt-container">
      <el-header class="nt-header" style="height: auto">
        <el-row :gutter="20">
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">订单编号：</span>
            <el-input class="nt-w70" size="small" placeholder="请输入订单编号"/>
          </el-col>
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">交易渠道：</span>
            <el-select v-model="channel" class="nt-w70" size="small" placeholder="交易渠道">
              <el-option
                v-for="item in channels"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="nt-mt12" :gutter="20">
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">订单日期段：</span>
            <el-date-picker class="nt-w70" size="small" type="date" placeholder="选择日期"/>
          </el-col>
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">客户姓名：</span>
            <el-input class="nt-w70" size="small" placeholder="客户姓名"/>
          </el-col>
        </el-row>
        <el-row class="nt-mt12" :gutter="20">
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">订单状态：</span>
            <el-select v-model="status" class="nt-w70" size="small" placeholder="订单状态">
              <el-option
                v-for="item in statuses"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="nt-mt12">
          <el-button size="small" type="warning">查询</el-button>
        </div>
      </el-header>
      <el-main class="nt-body nt-toFlex nt-flex-column">
        <div class="nt-flex1 nt-auto-scroll">
          <el-table :data="orders" style="width: 100%" row-key="id" border>
            <el-table-column align="center" prop="taskGroup" label="任务分组"></el-table-column>
            <el-table-column align="center" prop="childTask" label="子任务"></el-table-column>
            <el-table-column align="center" prop="startTime" label="开始时间"></el-table-column>
            <el-table-column align="center" prop="endTime" label="结束时间"></el-table-column>
            <el-table-column align="center" prop="status" label="执行状态"></el-table-column>
          </el-table>
        </div>
        <el-pagination
          class="nt-mt12"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'batch',
  data() {
    return {
      channel: '',
      status: '',
      currentPage: 3,
      orders: [
        {
          taskGroup: '',
          childTask: '',
          startTime: '',
          endTime: '',
          status: ''
        },
        {
          taskGroup: '',
          childTask: '',
          startTime: '',
          endTime: '',
          status: ''
        },
      ],
      channels: [
        {
          value: '1',
          label: '银转证'
        },
        {
          value: '2',
          label: '企业入口'
        }
      ],
      statuses: [
        {
          value: '1',
          label: '待上门取件'
        },
        {
          value: '2',
          label: '配送检测中心'
        },
        {
          value: '3',
          label: '检测中'
        },
        {
          value: '4',
          label: '检测报告待复核'
        },
        {
          value: '5',
          label: '检测报告待客户确认'
        },
        {
          value: '6',
          label: '客户拒绝'
        },
        {
          value: '7',
          label: '客户确认待支付'
        },
        {
          value: '8',
          label: '支付成功'
        },
        {
          value: '9',
          label: '支付失败'
        }
      ]
    }
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>
<style lang="scss" scoped>
</style>

