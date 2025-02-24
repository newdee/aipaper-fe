<template>
  <div class="history">
    <el-table :data="records" border="" style="width: 100%">
      <el-table-column
        prop="order_out_trade_no"
        align="center"
        label="订单编号"
      ></el-table-column>
      <el-table-column prop="rechargeType" label="充值类型" width="180">
        <template slot-scope="scope">
          <span>{{ formatRechargeType(scope.row.change_type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pointsChange" label="积分变动" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.change_balance }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentMethod" label="付款方式" width="180">
        <template slot-scope="scope">
          <span>--</span>
          <!-- 暂无数据，填充占位符 -->
        </template>
      </el-table-column>
      <el-table-column prop="paymentDate" label="付款时间" width="180">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.updated_at) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { find_recharge_details } from "@/api/wallet";

export default {
  data() {
    return {
      records: [],
      total: 0,
      currentPage: 1,
      pageSize: 3,
      paramsList: {
        page_num: 1,
        page_size: 10,
      },
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    // 获取充值详情列表
    getList() {
      this.paramsList.page_num = this.currentPage; // 同步当前页面
      this.paramsList.page_size = this.pageSize; // 同步每页数量

      find_recharge_details(this.paramsList).then((res) => {
        this.$log(res);

        // 设置数据
        this.records = res.result.account_logs || [];
        this.total = res.result.total || 0;
      });
    },

    // 分页切换处理
    handlePageChange(page) {
      this.currentPage = page;
      this.getList(); // 切换页码后重新获取数据
    },

    // 格式化充值类型
    formatRechargeType(type) {
      const typeMap = {
        RECHARGE: "积分充值",
        // 如果有其他类型可以在这里扩展
      };
      return typeMap[type] || "未知类型";
    },

    // 格式化时间
    formatDate(dateStr) {
      if (!dateStr) return "--";
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
