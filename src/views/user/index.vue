<template>
  <div class="dashboard-editor-container">
    <el-button
      size="mini"
      type="primary"
      :disabled="!!userInfo.sub_domain"
      plain
      @click="showDialog"
      >设置域名{{ userInfo.phone }}</el-button
    >
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <!-- <div class="chart-wrapper">
          <raddar-chart />
        </div> -->
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col> -->
    </el-row>

    <!-- <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
        style="padding-right: 8px; margin-bottom: 30px"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <box-card />
      </el-col>
    </el-row> -->

    <el-dialog
      title="设置专属域名"
      :visible.sync="dialogVisible"
      width="400px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        :model="subFrom"
        ref="subFrom"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="域名前缀" prop="subDomain">
          <el-input
            v-model.number="subFrom.subDomain"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('subFrom')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";
import { userProxy } from "@/api/user";
import { mapGetters } from "vuex";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },

  mounted() {
    console.log("user111111", this.userInfo);
    console.log("user", this.userInfo.sub_domain);
    console.log("user", !this.userInfo.sub_domain);
    if (!!this.userInfo.sub_domain) {
      this.dialogVisible = true;
    } else {
      this.disabled = false;
    }
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("域名前缀不能为空"));
      }
      var regex = /^[a-z]+$/;
      setTimeout(() => {
        console.log("regex.test(value)", regex.test(value), value, "");
        if (!regex.test(value)) {
          callback(new Error("域名前缀仅支持小写字母"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      lineChartData: lineChartData.newVisitis,
      dialogVisible: true,
      subFrom: {
        subDomain: "",
      },
      rules: {
        subDomain: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("您未设置二级域名,无法统计推广相关信息, 确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            sub_domain: this.subFrom.subDomain,
          };
          userProxy(data).then((res) => {
            this.$message({
              type: "success",
              message: "恭喜您设置域名成功,祝您工作一切顺利!",
            });

            this.$store.dispatch("user/getInfo");
            this.dialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

// .allDialog {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.3);
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 99;
//   display: flex;
//   align-items: flex-start;
//   justify-content: center;
// }
// .boxCenter {
//   margin-top: 200px;
// }
</style>
