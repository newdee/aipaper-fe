<template>
  <div class="history">
    <el-table :data="paginatedData" style="width: 100%">
      <el-table-column
        prop="orderNumber"
        label="订单编号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="rechargeType"
        label="充值类型"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="pointsChange"
        label="积分变动"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="paymentMethod"
        label="付款方式"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="paymentDate"
        label="付款时间"
        width="180"
      ></el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="records.length"
        :page-size="pageSize"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: [
        {
          orderNumber: "001",
          rechargeType: "话费充值",
          pointsChange: "+100",
          paymentMethod: "支付宝",
          paymentDate: "2025-01-01",
        },
        {
          orderNumber: "002",
          rechargeType: "流量包",
          pointsChange: "+200",
          paymentMethod: "微信",
          paymentDate: "2025-01-02",
        },
        {
          orderNumber: "003",
          rechargeType: "会员充值",
          pointsChange: "+300",
          paymentMethod: "银行卡",
          paymentDate: "2025-01-03",
        },
        {
          orderNumber: "004",
          rechargeType: "话费充值",
          pointsChange: "+400",
          paymentMethod: "支付宝",
          paymentDate: "2025-01-04",
        },
        {
          orderNumber: "005",
          rechargeType: "流量包",
          pointsChange: "+500",
          paymentMethod: "微信",
          paymentDate: "2025-01-05",
        },
      ],
      currentPage: 1,
      pageSize: 3,
    };
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.records.slice(start, end);
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
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
