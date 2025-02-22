<template>
  <div class="history">
    <el-table :data="paginatedData" style="width: 100%">
      <el-table-column
        prop="packageName"
        label="套餐名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="amount"
        label="付款金额"
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
          packageName: "套餐A",
          amount: "100元",
          paymentMethod: "支付宝",
          paymentDate: "2025-01-01",
        },
        {
          packageName: "套餐B",
          amount: "200元",
          paymentMethod: "微信",
          paymentDate: "2025-01-02",
        },
        {
          packageName: "套餐C",
          amount: "300元",
          paymentMethod: "银行卡",
          paymentDate: "2025-01-03",
        },
        {
          packageName: "套餐D",
          amount: "400元",
          paymentMethod: "支付宝",
          paymentDate: "2025-01-04",
        },
        {
          packageName: "套餐E",
          amount: "500元",
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
