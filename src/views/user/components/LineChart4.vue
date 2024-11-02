<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="flexHeader">
        <span>总用户数 (每日)</span>
        <el-date-picker
          v-model="value2"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="setParams"
        >
        </el-date-picker>
      </div>
      <div class="text item">
        <div
          class="lineChart3"
          ref="lineChart3"
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
      value2: "",
      chartFrom: {
        agent_id: "",
        count_type: "daily", // month/ daily
        begin_month: "", // 2024-01
        end_month: "", // 2024-01
        begin_day: "", // 2024-01-31
        end_day: "", // 2024-01
        chart_type: "chart4", // chart1/2/3
      },
      chartData: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  watch: {
    "userInfo.agent_id": {
      immediate: true,

      handler(val) {
        this.chartFrom.agent_id = val;

        this.getList(this.chartFrom);
      },
    },
  },
  mounted() {},
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.lineChart3, "lineChart3");
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
          data: ["总用户数"],
        },
        series: [
          {
            name: "总用户数",
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
            data: this.chartData.date_data.daily_total_nums,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
    getList(data) {
      agentCount(data).then((res) => {
        console.log("999---", res);
        let data = res.result;
        if (Object.keys(data).length > 0) {
          this.chartData = data;
          this.initChart();
        }
      });
    },
    setParams(date) {
      this.chartFrom.begin_day = date[0];
      this.chartFrom.agent_id = this.userInfo.agent_id;

      this.chartFrom.end_day = date[1];
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
</style>
