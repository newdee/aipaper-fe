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
            :type="dayStatus ? 'daterange' : 'monthrange'"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            :picker-options="pickerOptions"
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
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      dayStatus: "",
      value2: "",
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
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
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
          data: ["新增注册用户", "新增付费用户"],
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
            data: expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "新增付费用户",
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
            data: actualData,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
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
