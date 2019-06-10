<template>
  <div id="app">
    <el-container>
      <el-header class="nt-t-center">黄金重构后台管理</el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content">
              <el-button plain @click.stop="() => goPages('order')">订单查询</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button plain @click.stop="() => goPages('user')">客户信息管理</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button plain @click.stop="() => goPages('batch')">批量查询</el-button>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {
    goPages(pathname) {
      window.location.href = `${pathname}.html`;
    }
  }
};
</script>
<style lang="scss" scoped>
  .nt-t-center {
    text-align: center;
  }
  .grid-content {
    min-height: 36px;
  }
</style>

