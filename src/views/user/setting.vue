<template>
  <div class="setContainer">
    <!-- 搜索栏 -->
    <template>
      <!-- 搜索栏 -->
      <el-form inline :model="searchForm" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="未使用" value="1"></el-option>
            <el-option label="已使用" value="2"></el-option>
            <el-option label="已过期" value="3"></el-option>
            <el-option label="冻结" value="4"></el-option>
            <el-option label="作废" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select v-model="searchForm.channel" placeholder="请选择渠道">
            <el-option label="小红书" value="xhs"></el-option>
            <el-option label="淘宝" value="taobao"></el-option>
            <el-option label="京东" value="jd"></el-option>
            <!-- 添加其他渠道 -->
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input
            v-model="searchForm.orderNumber"
            placeholder="请输入订单编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="大纲 Key">
          <el-input
            v-model="searchForm.outlineKey"
            placeholder="请输入大纲 Key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
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
        <el-button type="danger" @click="batchDeleteUser"
          >批量删除用户</el-button
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
          width="200"
        ></el-table-column>
        <el-table-column prop="discount_rate" label="折扣" width="100">
          <template slot-scope="scope">
            {{ scope.row.discount_rate * 10 }}折
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="expire_time"
          label="过期时间"
          width="180"
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
        <el-table-column
          prop="order_id"
          label="订单ID"
          width="150"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button @click="viewUser(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="editUser(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="deleteUser(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pageBox">
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
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
export default {
  data() {
    return {
      searchForm: {
        name: "",
        gender: "",
        status: "",
        channel: "",
        orderNumber: "",
        outlineKey: "",
        pageSize: 10,
        pageIndex: 1,
      },
      addCouponDialogVisible: false,
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
      pageSize: 10, // 每页显示条数
    };
  },
  components: {
    AddCouponDialog,
  },
  methods: {
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
        orderNumber: "",
        outlineKey: "",
      };
    },
    showAddCouponDialog() {
      this.addCouponDialogVisible = true;
    },
    handleAddCoupon(coupon) {
      this.$message.success("优惠券添加成功");
    },

    toChildPage() {
      // 跳转到子集详情页面
      console.log("跳转到子集详情页面");
    },
    batchDeleteUser() {
      // 批量删除用户逻辑
      console.log("批量删除用户");
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
