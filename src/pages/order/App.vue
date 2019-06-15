<template>
  <div id="app" class="table-content-body">
    <el-container class="nt-container">
      <el-header class="nt-header" style="height: auto">
        <el-row :gutter="20">
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">订单编号：</span>
            <el-input class="nt-w70" v-model="condition.order_no" size="small" placeholder="请输入订单编号"/>
          </el-col>
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">交易渠道：</span>
            <el-select v-model="condition.chl_no" class="nt-w70" size="small" placeholder="交易渠道">
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
            <span class="nt-w25 nt-inline-block">开始日期：</span>
            <el-date-picker v-model="condition.start_date" class="nt-w70" size="small" type="date" value-format="yyyyMMdd" placeholder="开始日期："></el-date-picker>
          </el-col>
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">结束日期：</span>
            <el-date-picker v-model="condition.end_date" class="nt-w70" size="small" type="date" value-format="yyyyMMdd" placeholder="结束日期："></el-date-picker>
          </el-col>
        </el-row>
        <el-row class="nt-mt12" :gutter="20">
          <el-col :span="8">
            <span class="nt-w25 nt-inline-block">订单状态：</span>
            <el-select v-model="condition.order_sub_status" class="nt-w70" size="small" placeholder="订单状态">
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
          <el-button size="small" @click.stop="queryHandle" type="primary">查询</el-button>
        </div>
      </el-header>
      <el-main class="nt-body nt-toFlex nt-flex-column">
        <div class="nt-flex1 nt-auto-scroll">
          <el-table :data="orders" style="width: 100%" row-key="id" border>
            <el-table-column align="center" prop="order_no" label="订单编号" width="100"></el-table-column>
            <el-table-column align="center" prop="chl_no" label="交易渠道" width="100"></el-table-column>
            <el-table-column align="center" prop="prod_type_no" label="产品类型编号" width="120"></el-table-column>
            <el-table-column align="center" prop="prod_type_name" label="产品类型" width="100"></el-table-column>
            <el-table-column align="center" prop="order_sub_status" label="订单状态"></el-table-column>
            <el-table-column align="center" prop="express_no" label="配送物流单号" width="120"></el-table-column>
            <el-table-column align="center" prop="is_pag" label="是否平安金" width="110"></el-table-column>
            <el-table-column align="center" prop="category" label="成色" width="80"></el-table-column>
            <el-table-column align="center" prop="bank_estimate_amt" label="估算回购金额" width="120"></el-table-column>
            <el-table-column align="center" prop="sup_confirm_amt" label="检测后回购金额" width="140"></el-table-column>
            <el-table-column align="center" prop="express_fee" label="物流费" width="150"></el-table-column>
            <el-table-column align="center" prop="sup_commission" label="供应商手续费" width="110"></el-table-column>
            <el-table-column align="center" prop="bank_commission" label="银行手续费" width="100"></el-table-column>
            <el-table-column align="center" prop="act_amt" label="实际回购金额" width="120"></el-table-column>
            <el-table-column align="center" prop="recommend_um_no" label="推荐人编号" width="110"></el-table-column>
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
export default {
  name: 'order',
  data() {
    return {
      condition: {
        start_date: '',
        end_date: '',
        order_no: '',
        chl_no: '',
        order_sub_status: ''
      },
      currentPage: 3,
      orders: [
        {
          order_no: '',
          chl_no: '',
          prod_type_no: '',
          prod_type_name: '',
          order_sub_status: '',
          express_no: '',
          is_pag: '',
          category: '',
          bank_estimate_amt: '',
          sup_confirm_amt: '',
          express_fee: '',
          sup_commission: '',
          bank_commission: '',
          act_amt: '',
          recommend_um_no: ''
        },
        {
          order_no: '',
          chl_no: '',
          prod_type_no: '',
          prod_type_name: '',
          order_sub_status: '',
          express_no: '',
          is_pag: '',
          category: '',
          bank_estimate_amt: '',
          sup_confirm_amt: '',
          express_fee: '',
          sup_commission: '',
          bank_commission: '',
          act_amt: '',
          recommend_um_no: ''
        }
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
          value: '01',
          label: '待众包审核'
        },
        {
          value: '02',
          label: '众包审核拒绝'
        },
        {
          value: '03',
          label: '待电话审核'
        },
        {
          value: '04',
          label: '电话审核拒绝'
        },
        {
          value: '05',
          label: '带上门取件'
        },
        {
          value: '06',
          label: '取件完成配送检测中心'
        },
        {
          value: '07',
          label: '检测中'
        },
        {
          value: '08',
          label: '检测报告待复核'
        },
        {
          value: '09',
          label: '检测报告复核不通过'
        },
        {
          value: '10',
          label: '检测报告待客户确认'
        },
        {
          value: '11',
          label: '客户确认待支付'
        },
        {
          value: '12',
          label: '客户拒绝待测报告生成'
        },
        {
          value: '13',
          label: '支付完成'
        },
        {
          value: '14',
          label: '支付失败'
        },
      ]
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    queryHandle() {

      let condition = this.condition

      if (!condition.start_date) {
        this.$message.error('开始日期不能为空')
        return
      }
      if (!condition.end_date) {
        this.$message.error('结束日期不能为空')
        return
      }
      if (condition.start_date > condition.end_date) {
        this.$message.error('开始日期不能早于结束日期')
        return
      }
      this.$message.success('成功')
      console.log('筛选条件：', this.condition)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

