<template>
  <div class="setContainer">
    <!-- 搜索栏 -->
    <template>
      <!-- 搜索栏 -->
      <el-form inline :model="searchForm" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.status"
            @change="getList"
            clearable
            placeholder="请选择状态"
          >
            <el-option label="未使用" value="1"></el-option>
            <el-option label="已使用" value="2"></el-option>
            <el-option label="已过期" value="3"></el-option>
            <el-option label="冻结" value="4"></el-option>
            <el-option label="作废" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select
            v-model="searchForm.channel"
            @change="getList"
            placeholder="请选择渠道"
          >
            <el-option
              v-for="item in channels"
              :key="item.channel"
              :label="item.display_name"
              :value="item.channel"
            ></el-option>
            <!-- 添加其他渠道 -->
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input
            v-model="searchForm.out_trade_no"
            placeholder="请输入订单编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="大纲 Key">
          <el-input
            v-model="searchForm.key"
            placeholder="请输入大纲 Key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 其他内容（表格、分页等）保持不变 -->
    </template>

    <div class="demo-form-inline">
      <!-- 操作按钮 -->
      <div class="button-group">
        <el-button type="primary" @click="showAddCouponDialog"
          >新增优惠券</el-button
        >
      </div>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          align="center"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="coupon_code"
          label="优惠券代码"
        ></el-table-column>
        <el-table-column prop="discount_rate" label="折扣" width="80">
          <template slot-scope="scope">
            {{ scope.row.discount_rate * 10 }}折
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="220">
          <template> </template>
        </el-table-column>
        <el-table-column
          prop="expire_time"
          label="过期时间"
          width="220"
        ></el-table-column>
        <el-table-column
          prop="channel"
          label="渠道"
          width="120"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">未使用</span>
            <span v-else-if="scope.row.status === 2">已使用</span>
            <span v-else-if="scope.row.status === 3">已过期</span>
            <span v-else-if="scope.row.status === 4">冻结</span>
            <span v-else-if="scope.row.status === 5">作废</span>
          </template>
        </el-table-column>
        <el-table-column prop="order_id" label="订单ID"></el-table-column>
        <!-- <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button @click="viewUser(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>

      <div class="pageBox">
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="searchForm.page_size"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
      <!-- 新增优惠券组件 -->
      <add-coupon-dialog
        :visible.sync="addCouponDialogVisible"
        @add-coupon="handleAddCoupon"
      ></add-coupon-dialog>
    </div>
  </div>
</template>

<script>
import AddCouponDialog from "./components/AddCouponDialog.vue";
import { channels, batch_create, coupon_list } from "@/api/user";

export default {
  data() {
    return {
      searchForm: {
        name: "",
        gender: "",
        status: "",
        channel: "",
        out_trade_no: "",
        key: "",
        page_num: 1,
        page_size: 10,
      },
      addCouponDialogVisible: false,
      channels: [],
      tableData: [
        {
          id: 1,
          type: 1,
          rule_id: -1,
          create_user_id: 2422,
          exchange_user_id: -1,
          coupon_code: "xhs_04889f94-3c17-4d9c-a6f7-3cfa2c4fc73c",
          discount_rate: 0.5,
          create_time: "2024-12-23T17:17:05+08:00",
          used_time: null,
          expire_time: "2024-12-30T12:00:00+08:00",
          channel: "xhs",
          status: 1,
          order_id: -1,
        },
        // 其他模拟数据...
      ],
      total: 2000, // 总条数
    };
  },
  components: {
    AddCouponDialog,
  },
  created() {
    this.getList();
    channels().then((res) => {
      this.channels = res.result;
    });
  },
  methods: {
    getList() {
      let data = { ...this.searchForm };
      coupon_list(data).then((res) => {
        LLog("coupon_list", res);
        this.tableData = res.result.coupon_list;
        this.total = res.result.total;
      });
    },
    handleSearch() {
      // 在这里添加搜索逻辑，使用 searchForm 中的字段进行请求
      console.log("搜索条件", this.searchForm);

      // 示例：调用 API 进行搜索
      // this.fetchData(this.searchForm).then(response => {
      //   this.tableData = response.data.result;
      //   this.total = response.data.total;
      // });
    },
    handleReset() {
      // 重置搜索条件
      this.searchForm = {
        status: "",
        channel: "",
        out_trade_no: "",
        key: "",
      };
    },
    showAddCouponDialog() {
      this.addCouponDialogVisible = true;
    },
    handleAddCoupon(coupon) {
      batch_create(coupon).then((res) => {
        this.$message.success("优惠券添加成功");
        console.log("res", res);
      });
    },

    toChildPage() {
      // 跳转到子集详情页面
      console.log("跳转到子集详情页面");
    },

    viewUser(row) {
      // 查看用户逻辑
      console.log("查看用户", row);
    },
    editUser(row) {
      // 编辑用户逻辑
      console.log("编辑用户", row);
    },
    deleteUser(row) {
      // 删除用户逻辑
      console.log("删除用户", row);
    },
    handlePageChange(page) {
      // 分页改变逻辑
      console.log("当前页:", page);
      this.searchForm.page_num = page;
      this.getList();
    },
  },
};
</script>

<style scoped>
.demo-form-inline {
  margin-bottom: 20px;
  padding: 18px 18px 0;
  background: #fff;
  box-sizing: border-box;
  overflow-x: hidden;
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;
  box-shadow: 0 0 12px #0000000d;
}
.button-group {
  margin-bottom: 20px;
}
.setContainer {
  padding: 20px;
}
.pageBox {
  padding-bottom: 20px;
  margin-top: 20px;
  text-align: right;
}
</style>
