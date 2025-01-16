<template>
  <div>
    <!-- 筛选项 -->
    <el-select
      v-model="selectedDomain"
      placeholder="请选择域名"
      clearable
      filterable
      style="margin-bottom: 20px"
      @change="getList"
    >
      <el-option
        v-for="(item, index) in selector_item.sub_domain_list"
        :key="index + 'ss'"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-input
      v-model="phoneNum"
      style="margin-left: 20px; width: 260px"
      placeholder="请输入手机号码"
      clearable
    ></el-input>
    <el-button type="primary" style="margin-left: 20px" plain @click="getList"
      >搜索</el-button
    >
    <!-- 表格 -->
    <el-table border stripe :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="id" label="用户ID" width="80" />
      <el-table-column
        align="center"
        prop="user_name"
        label="用户名"
        width="150"
      />
      <el-table-column align="center" prop="phone" label="手机号" width="150" />

      <el-table-column label="注册时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.registration_time | dateFormatter }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="outline_num"
        label="大纲数量"
        width="100"
      />
      <el-table-column
        align="center"
        prop="is_paid"
        label="是否付费"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_paid ? 'success' : 'danger'">
            {{ scope.row.is_paid ? "是" : "否" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="paid_order_num"
        label="已付全款/尾款订单数量"
        align="center"
        width="180"
      />
      <el-table-column
        prop="deposit_order_num"
        align="center"
        label="已付定金订单数量"
        width="180"
      />
      <el-table-column
        prop="unpaid_order_num"
        align="center"
        label="待支付订单数量"
        width="180"
      />
      <el-table-column
        align="center"
        prop="pay_amount"
        label="消费总金额"
        width="100"
      />

      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="viewDetails(scope.row)"
          >
            用户订单详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      layout="total, sizes,prev, pager, next"
      :total="total"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
      style="margin-top: 20px; text-align: right"
    />
    <!-- 引入订单详情弹窗组件 -->
    <order-details-dialog ref="orderDetailsDialog" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { user_info } from "@/api/paper";
import OrderDetailsDialog from "./orderDetail.vue"; // 确保路径正确
export default {
  components: {
    OrderDetailsDialog,
  },
  data() {
    return {
      selectedDomain: "",
      phoneNum: "",
      tableData: [],
      currentPage: 1,
      pageSize: 5, // 每页显示的条数
      total: 0, // 总条数
    };
  },

  computed: {
    ...mapGetters(["selector_item"]),
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    viewDetails(row) {
      // 传递手机号到订单详情组件并打开弹窗\
      console.log("row", row);
      this.$refs.orderDetailsDialog.openDialog(row.phone);
    },
    getList() {
      let params = {
        page_num: this.currentPage,
        page_size: this.pageSize,
        sub_domain: this.selectedDomain,
        phone: this.phoneNum,
      };
      !this.selectedDomain && delete params.sub_domain;
      user_info(params).then((res) => {
        console.log("res", res);
        this.tableData = res.result.user_info_list;
        this.total = res.result.total;
      });
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.getList(); // 切换页面时重新获取数据
    },
  },

  mounted() {
    this.getList(); // 初始化时获取数据
  },
};
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>
