<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="90%">
      <!-- 筛选项 -->
      <!-- 筛选项 -->
      <el-form
        :inline="true"
        :model="filters"
        label-width="120px"
        style="margin-bottom: 20px"
      >
        <el-form-item label="商家订单编号">
          <el-input
            v-model="filters.out_trade_no"
            placeholder="请输入商家订单编号"
            @change="getList"
            clearable
          />
        </el-form-item>

        <el-form-item label="支付方式">
          <el-select
            v-model="filters.payment_method"
            placeholder="请选择支付方式"
            @change="getList"
            filterable
            clearable
          >
            <el-option
              v-for="method in selector_item.payment_method_list"
              :key="method.key"
              :label="method.value"
              :value="method.key"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="支付类型">
          <el-select
            v-model="filters.pay_type"
            placeholder="请选择支付类型"
            @change="getList"
            filterable
            clearable
          >
            <el-option
              v-for="type in selector_item.pay_type_list"
              :key="type.key"
              :label="type.value"
              :value="type.key"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="交易状态">
          <el-select
            v-model="filters.payment_status"
            placeholder="请选择交易状态"
            filterable
            @change="getList"
            clearable
          >
            <el-option
              v-for="status in selector_item.payment_status_list"
              :key="status.key"
              :label="status.value"
              :value="status.key"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="订单类型">
          <el-select
            v-model="filters.order_type"
            placeholder="请选择订单类型"
            filterable
            @change="getList"
            clearable
          >
            <el-option
              v-for="type in selector_item.order_type_list"
              :key="type.key"
              :label="type.value"
              :value="type.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table border :data="orderData" height="450" style="width: 100%">
        <el-table-column prop="id" label="订单ID" width="100" align="center" />
        <el-table-column
          prop="user_id"
          label="用户ID"
          width="100"
          align="center"
        />
        <el-table-column
          prop="title"
          label="论文标题"
          width="200"
          align="center"
        />
        <el-table-column
          prop="out_trade_no"
          label="商家交易编号"
          width="200"
          align="center"
        />
        <el-table-column label="订单创建时间" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.created_at | dateFormatter }}
          </template>
        </el-table-column>

        <el-table-column label="订单类型" width="150" align="center">
          <template slot-scope="scope">
            {{
              scope.row.order_type
                | translatePaymentMethod(selector_item.order_type_list)
            }}
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">
            {{
              scope.row.payment_method
                | translatePaymentMethod(selector_item.payment_method_list)
            }}
          </template>
        </el-table-column>
        <el-table-column label="支付类型" width="120" align="center">
          <template slot-scope="scope">
            {{
              scope.row.pay_type
                | translatePaymentMethod(selector_item.pay_type_list)
            }}
          </template>
        </el-table-column>
        <el-table-column label="交易状态" width="120" align="center">
          <template slot-scope="scope">
            {{
              scope.row.payment_status
                | translatePaymentMethod(selector_item.payment_status_list)
            }}
          </template>
        </el-table-column>

        <el-table-column
          prop="total_price"
          label="订单金额"
          width="120"
          align="center"
        />
        <el-table-column
          prop="pay_amount"
          label="实付金额"
          width="120"
          align="center"
        />
        <el-table-column
          prop="key1"
          label="大纲的key"
          width="120"
          align="center"
        />
        <el-table-column label="是否使用优惠券" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.is_discount == 1">未使用</el-tag>
            <el-tag v-show="scope.row.is_discount == 2" type="success"
              >已使用</el-tag
            >
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
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        style="margin-top: 20px; text-align: right"
      />
    </el-dialog>
  </div>
</template>

<script>
import { order_info } from "@/api/paper";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      orderData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      filters: {
        phone: "", // 添加phone作为筛选字段
        out_trade_no: "",
        payment_method: "",
        pay_type: "",
        payment_status: "",
        order_type: "",
      },
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
    openDialog(phone) {
      this.filters.phone = phone; // 接收并设置手机号
      this.dialogVisible = true;
      this.getList();
    },
    getList() {
      const params = {
        page_num: this.currentPage,
        page_size: this.pageSize,
        phone: this.filters.phone,
        out_trade_no: this.filters.out_trade_no,
        payment_method: this.filters.payment_method,
        pay_type: this.filters.pay_type,
        payment_status: this.filters.payment_status,
        order_type: this.filters.order_type,
      };

      order_info(params).then((res) => {
        this.orderData = res.result.order_info_list;
        this.total = res.result.total;
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getList();
    },
  },
};
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>
