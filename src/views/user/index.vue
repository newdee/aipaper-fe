<template>
  <div class="dashboard-editor-container">
    <!-- <el-button
      size="mini"
      type="primary"
      :disabled="!!userInfo.sub_domain"
      plain
      @click="showDialog"
      >设置域名</el-button
    > -->
    <el-descriptions class="margin-top" title="您的信息" :column="2" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="getList">刷新</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          名称
        </template>
        {{ agentData.agent_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          编号
        </template>
        {{ agentData.agent_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          二级域名
        </template>
        {{ agentData.sub_domain }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          加入时间
        </template>
        <el-tag size="small"> {{ agentData.active_time }} </el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          等级
        </template>

        <el-tag>{{ agentData.agent_level }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <div class="mgt">
      <userlist />
    </div>
    <div class="mgt">
      <line-chart />
    </div>

    <el-row class="secondLine" :gutter="32">
      <el-col :xs="24" :sm="12" :lg="12">
        <!-- 图表2: 新增注册用户/新订单数/月付费转化率 (每日) -->
        <line-chart2 />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">
        <!-- 图表3: 生成大纲/生成正文 (每日) -->
        <line-chart3 />
      </el-col>
    </el-row>
    <el-row class="secondLine" :gutter="32">
      <!-- 图表3: 生成大纲/生成正文 (每日) -->
      <line-chart4 />
    </el-row>

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
        <el-form-item label="域名前缀" prop="sub_domain">
          <el-input
            v-model.number="subFrom.sub_domain"
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
import LineChart2 from "./components/LineChart2";
import LineChart3 from "./components/LineChart3";
import LineChart4 from "./components/LineChart4";
// import RaddarChart from "./components/RaddarChart";
import userlist from "./userlist/index.vue";
import { userProxy, agentInfo } from "@/api/user";
import { mapGetters } from "vuex";
import { getList } from "@/api/table";

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
    LineChart2,
    LineChart3,
    LineChart4,
    userlist,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    "userInfo.sub_domain": {
      handler(newPermission, oldPermission) {
        // 在这里你可以执行需要的操作，比如更新界面或触发其他逻辑
        if (!newPermission) {
          this.dialogVisible = true;
        } else {
          this.dialogVisible = false;
        }
      },
      deep: true, // 深度监听
      immediate: true, // 组件创建时立即触发监听器
    },
  },

  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("域名前缀不能为空"));
      }
      var regex = /^[a-z]+$/;
      setTimeout(() => {
        if (!regex.test(value)) {
          callback(new Error("域名前缀仅支持小写字母"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      value1: "",
      // lineChartData: lineChartData.newVisitis,
      dialogVisible: true,
      subFrom: {
        sub_domain: "",
      },
      rules: {
        sub_domain: [{ validator: checkAge, trigger: "blur" }],
      },
      chartFrom: {
        agent_id: "",
        count_type: "month", // month/ daily
        begin_month: "2024-01", // 2024-01
        end_month: "2024-10", // 2024-01
        begin_day: "", // 2024-01-31
        end_day: "", // 2024-01
        chart_type: "chart1", // chart1/2/3
      },
      chartData: {},
      agentData: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let data = {
        ...this.chartFrom,
      };
      agentInfo().then((res) => {
        this.agentData = res.result;
        this.$store.dispatch("paper/setSelectorItem", res.result.selector_item);
      });
    },
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
            sub_domain: this.subFrom.sub_domain,
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

.flexHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.secondLine {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
