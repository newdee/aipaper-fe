<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="">
        <span>新增注册用户/新订单数/月付费转化率 (每日)</span>
        <div class="flexHeader line2Top">
          <el-switch
            style="display: block"
            v-model="dayStatus"
            active-color="#13ce66"
            inactive-color="#E6A23C"
            active-text="查询每日"
            inactive-text="查询每月"
          >
          </el-switch>
          <el-date-picker
            size="mini"
            v-model="value2"
            :value-format="dayStatus ? 'yyyy-MM-dd' : 'yyyy-MM'"
            :type="dayStatus ? 'daterange' : 'monthrange'"
            align="right"
            unlink-panels
            range-separator="至"
            :start-placeholder="dayStatus ? '开始日期' : '开始月份'"
            :end-placeholder="dayStatus ? '结束日期' : '结束月份'"
            @change="setParams"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="text item">
        <div
          class="lineChart2"
          ref="lineChart2"
          style="height: 350px; width: 100%"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { mapGetters } from "vuex";
import { agentCount } from "@/api/user";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      chart: null,
      dayStatus: false,
      value2: "",
      chartFrom: {
        agent_id: "",
        count_type: "month", // month/ dayily
        begin_month: "2024-01", // 2024-01
        end_month: "2024-10", // 2024-01
        begin_day: "", // 2024-01-31
        end_day: "", // 2024-01
        chart_type: "chart2", // chart1/2/3
      },
      chartData: {},
    };
  },
  // watch: {
  //   chartData: {
  //     deep: true,
  //     handler(val) {
  //       this.setOptions(val);
  //     },
  //   },
  // },
  mounted() {
    this.chartFrom.agent_id = this.userInfo.agent_id;
    this.getList(this.chartFrom);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.lineChart2, "lineChart2");
      this.setOptions(this.chartData);
    },
    setOptions() {
      this.chart.setOption({
        xAxis: {
          data: this.chartData.date,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          data: ["新增注册用户", "新订单数", "月付费转化率"],
        },
        series: [
          {
            name: "新增注册用户",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: this.chartData.date_data.new_users_num,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "新订单数",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData.date_data.new_orders_num,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
          {
            name: "月付费转化率",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#fa7838",
                lineStyle: {
                  color: "#fa7838",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData.date_data.pay_rates,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
    getList(data) {
      agentCount(data).then((res) => {
        console.log("97---", res);
        let data = res.result;
        if (Object.keys(data).length > 0) {
          this.chartData = data;
          this.initChart();
        }
      });
    },
    setParams(date) {
      if (this.dayStatus) {
        this.chartFrom.begin_day = date[0];
        this.chartFrom.end_day = date[1];
        this.chartFrom.begin_month = "";
        this.chartFrom.end_month = "";
      } else {
        this.chartFrom.begin_month = date[0];
        this.chartFrom.end_month = date[1];
        this.chartFrom.begin_day = "";
        this.chartFrom.end_day = "";
      }
      this.getList(this.chartFrom);
    },
  },
};
</script>
<style>
.flexHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.line2Top {
  margin-top: 10px;
}
</style>
