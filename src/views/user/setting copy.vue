<template>
  <div class="setContainer">
    <!-- 搜索栏 -->
    <el-form inline :model="searchForm" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input
          v-model="searchForm.name"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchForm.gender" placeholder="请选择">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="demo-form-inline">
      <!-- 操作按钮 -->
      <div class="button-group">
        <el-button type="primary" @click="addUser">新增用户</el-button>
        <el-button @click="batchAddUser">批量添加用户</el-button>
        <el-button @click="exportUserData">导出用户数据</el-button>
        <el-button @click="toChildPage">To 子集详情页面</el-button>
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
          prop="name"
          label="用户姓名"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="80"
        ></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column
          prop="idNumber"
          label="身份证号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="居住地址"
          width="200"
        ></el-table-column>
        <el-table-column prop="status" label="用户状态" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          width="180"
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: "",
        gender: "",
        pageSize: 10,
        pageIndex: 1,
      },
      tableData: [
        {
          name: "夏敏",
          gender: "女",
          age: 17,
          idNumber: "6279149767...",
          email: "p.bicw@...",
          address: "山西省 阳泉市",
          status: true,
          createdTime: "2012-03-18",
        },
        {
          name: "夏敏",
          gender: "女",
          age: 17,
          idNumber: "6279149767...",
          email: "p.bicw@...",
          address: "山西省 阳泉市",
          status: true,
          createdTime: "2012-03-18",
        },
        {
          name: "夏敏",
          gender: "女",
          age: 17,
          idNumber: "6279149767...",
          email: "p.bicw@...",
          address: "山西省 阳泉市",
          status: true,
          createdTime: "2012-03-18",
        },
        {
          name: "夏敏",
          gender: "女",
          age: 17,
          idNumber: "6279149767...",
          email: "p.bicw@...",
          address: "山西省 阳泉市",
          status: true,
          createdTime: "2012-03-18",
        },
        {
          name: "夏敏",
          gender: "女",
          age: 17,
          idNumber: "6279149767...",
          email: "p.bicw@...",
          address: "山西省 阳泉市",
          status: true,
          createdTime: "2012-03-18",
        },
        {
          name: "夏敏",
          gender: "女",
          age: 17,
          idNumber: "6279149767...",
          email: "p.bicw@...",
          address: "山西省 阳泉市",
          status: true,
          createdTime: "2012-03-18",
        },
        {
          name: "胡杰",
          gender: "女",
          age: 17,
          idNumber: "7276219492...",
          email: "f.mqltkb@...",
          address: "台湾 花莲县",
          status: true,
          createdTime: "1981-06-01",
        },
        {
          name: "夏敏",
          gender: "女",
          age: 17,
          idNumber: "6279149767...",
          email: "p.bicw@...",
          address: "山西省 阳泉市",
          status: true,
          createdTime: "2012-03-18",
        },
        {
          name: "胡杰",
          gender: "女",
          age: 17,
          idNumber: "7276219492...",
          email: "f.mqltkb@...",
          address: "台湾 花莲县",
          status: true,
          createdTime: "1981-06-01",
        },
        {
          name: "夏敏",
          gender: "女",
          age: 17,
          idNumber: "6279149767...",
          email: "p.bicw@...",
          address: "山西省 阳泉市",
          status: true,
          createdTime: "2012-03-18",
        },
        {
          name: "胡杰",
          gender: "女",
          age: 17,
          idNumber: "7276219492...",
          email: "f.mqltkb@...",
          address: "台湾 花莲县",
          status: true,
          createdTime: "1981-06-01",
        },
        // 其他模拟数据...
      ],
      total: 2000, // 总条数
      pageSize: 10, // 每页显示条数
    };
  },
  methods: {
    handleSearch() {
      // 搜索功能逻辑
    },
    handleReset() {
      // 重置搜索条件
      this.searchForm = { name: "", gender: "" };
    },
    addUser() {
      // 新增用户逻辑
    },
    batchAddUser() {
      // 批量添加用户逻辑
    },
    exportUserData() {
      // 导出用户数据逻辑
    },
    toChildPage() {
      // 跳转到子集详情页面
    },
    batchDeleteUser() {
      // 批量删除用户逻辑
    },
    viewUser(row) {
      // 查看用户逻辑
    },
    editUser(row) {
      // 编辑用户逻辑
    },
    deleteUser(row) {
      // 删除用户逻辑
    },
    handlePageChange(page) {
      // 分页改变逻辑
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
  padding: 30px;
}
.pageBox {
  padding-bottom: 20px;
  margin-top: 20px;
  text-align: right;
}
</style>
