<template>
  <div id="app" class="table-content-body">
    <el-container class="nt-container">
      <el-header class="nt-header" style="height: auto">
        <el-row :gutter="20">
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">子任务：</span>
            <el-input class="nt-w70" v-model="condition.trans_no" size="small" placeholder="子任务"/>
          </el-col>
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">执行状态：</span>
            <el-select v-model="condition.status" class="nt-w70" size="small" placeholder="执行状态">
              <el-option
                v-for="item in statuses"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="nt-mt12" :gutter="20">
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">物理日期：</span>
            <el-date-picker
              v-model="condition.mac_date"
              class="nt-w70"
              size="small"
              value-format="yyyyMMdd"
              type="date"
              placeholder="选择日期"
            />
          </el-col>
        </el-row>
        <div class="nt-mt12">
          <el-button size="small" @click="queryHandle" type="primary">查询</el-button>
        </div>
      </el-header>
      <el-main class="nt-body nt-toFlex nt-flex-column">
        <div class="nt-flex1 nt-auto-scroll">
          <el-table :data="batchData" style="width: 100%" row-key="id" border>
            <el-table-column align="center" prop="tasl_group" label="任务分组"></el-table-column>
            <el-table-column align="center" prop="trans_no" label="子任务"></el-table-column>
            <el-table-column align="center" prop="start_time" label="开始时间">
              <template slot-scope="scope">
                <span>{{convertData(scope.row.start_time)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="end_time" label="结束时间">
              <template slot-scope="scope">
                <span>{{convertData(scope.row.end_time)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="status" label="执行状态">
              <template slot-scope="scope">
                <span>{{convertStatus(scope.row.status)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="acct_date" label="需要跑批日期">
              <template slot-scope="scope">
                <span>{{convertData(scope.row.acct_date)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.status === '01'"
                  @click.stop="() => runBatch(scope.row)"
                >跑批</el-button>
              </template>
            </el-table-column>
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
          :total="400"
        ></el-pagination>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { convertData } from '@/utils/util'
export default {
  name: 'batch',
  data() {
    return {
      condition: {
        trans_no: '',
        status: '',
        mac_date: ''
      },
      currentPage: 3,
      batchData: [
        {
          task_group: '',
          trans_no: '',
          start_time: '20190821',
          end_time: '20190823',
          status: '00',
          acct_date: '20190421'
        },
        {
          task_group: '',
          trans_no: '',
          start_time: '20190411',
          end_time: '20190421',
          status: '01',
          acct_date: '20190428'
        }
      ],
      statuses: [
        {
          value: '00',
          label: '运行成功'
        },
        {
          value: '01',
          label: '运行失败'
        }
      ]
    }
  },
  methods: {
    convertData,
    handleSizeChange() {},
    handleCurrentChange() {},
    convertStatus(status) {
      return this.statuses.filter(state => state.value == status)[0].label
    },
    queryHandle() {
      let condition = this.condition

      if (!condition.mac_date) {
        this.$message.error('物理日期不能为空')
        return
      }
      this.$message.success('成功')
    },
    runBatch(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

