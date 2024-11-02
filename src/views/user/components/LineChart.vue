<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="flexHeader">
        <span>付费订单/总收益 (每月)</span>
        <el-date-picker
          v-model="value2"
          value-format="yyyy-MM"
          type="monthrange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          :picker-options="pickerOptions"
          @change="setParams"
        >
        </el-date-picker>
      </div>
      <div class="text item">
        <div
          class="lineChart1"
          ref="lineChart1"
          :style="{ height: height, width: width }"
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
      value2: "",
      chartFrom: {
        agent_id: "",
        count_type: "month", // month/ dayily
        begin_month: "2024-01", // 2024-01
        end_month: "2024-10", // 2024-01
        begin_day: "", // 2024-01-31
        end_day: "", // 2024-01
        chart_type: "chart1", // chart1/2/3
      },
      chartData: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            },
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
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
      this.chart = echarts.init(this.$refs.lineChart1, "lineChart1");
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
          data: ["付费订单", "总收益"],
        },
        series: [
          {
            name: "付费订单",
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
            data: this.chartData.date_data.pay_orders_num,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "总收益",
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
            data: this.chartData.date_data.total_income,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
    getList(data) {
      agentCount(data).then((res) => {
        let data = res.result;
        if (Object.keys(data).length > 0) {
          this.chartData = data;
          this.initChart();
        }
      });
    },
    setParams(date) {
      this.chartFrom.begin_month = date[0];
      this.chartFrom.end_month = date[1];
      this.getList(this.chartFrom);
    },
  },
};
</script>
<style lang="scss" scoped>
.flexHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
