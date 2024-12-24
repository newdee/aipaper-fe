<template>
  <el-dialog
    title="新增优惠券"
    :visible.sync="visible"
    width="40%"
    @close="handleClose"
  >
    <el-form
      label-width="120px"
      :model="couponForm"
      ref="couponForm"
      :rules="rules"
    >
      <el-form-item label="优惠折扣" prop="discount_rate">
        <el-select
          v-model="couponForm.discount_rate"
          placeholder="请选择优惠折扣"
        >
          <el-option
            v-for="rate in discountRates"
            :key="rate.value"
            :label="rate.label"
            :value="rate.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="过期时间" prop="expire_time">
        <el-date-picker
          v-model="couponForm.expire_time"
          type="datetime"
          placeholder="请选择过期时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="datePickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券数量" prop="create_counts">
        <el-input-number
          v-model="couponForm.create_counts"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="渠道" prop="channel">
        <el-select v-model="couponForm.channel" placeholder="请选择渠道">
          <el-option
            v-for="channel in channels"
            :key="channel.channel"
            :label="channel.display_name"
            :value="channel.channel"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { channels } from "@/api/user";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      couponForm: {
        discount_rate: 0.1, // 默认值
        expire_time: "",
        create_counts: 1,
        channel: "",
      },
      discountRates: [
        { label: "0%", value: 0 },
        { label: "10%", value: 0.1 },
        { label: "20%", value: 0.2 },
        { label: "30%", value: 0.3 },
        { label: "40%", value: 0.4 },
        { label: "50%", value: 0.5 },
        { label: "60%", value: 0.6 },
        { label: "70%", value: 0.7 },
        { label: "80%", value: 0.8 },
        { label: "90%", value: 0.9 },
      ],
      channels: [
        { display_name: "淘宝", channel: "tb" },
        { display_name: "B站", channel: "bili" },
        { display_name: "抖音", channel: "dy" },
        { display_name: "小红书", channel: "xhs" },
        { display_name: "微商", channel: "wx1" },
        { display_name: "微信视频号", channel: "wx2" },
        { display_name: "其他", channel: "other" },
      ],
      rules: {
        discount_rate: [
          { required: true, message: "请选择优惠折扣", trigger: "change" },
        ],
        expire_time: [
          { required: true, message: "请选择过期时间", trigger: "change" },
        ],
        create_counts: [
          { required: true, message: "请输入优惠券数量", trigger: "blur" },
        ],
        channel: [{ required: true, message: "请选择渠道", trigger: "change" }],
      },
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      channels().then((res) => {
        console.log("res", res);
        this.channels = res.result;
      });
    },
    handleClose() {
      this.$emit("update:visible", false); // 关闭弹窗
      this.resetForm();
    },
    submitForm() {
      this.$refs.couponForm.validate((valid) => {
        if (valid) {
          this.$emit("add-coupon", { ...this.couponForm });
          this.handleClose();
        } else {
          this.$message.error("请填写完整的优惠券信息");
        }
      });
    },
    resetForm() {
      this.couponForm = {
        discount_rate: 0.1,
        expire_time: "",
        create_counts: 1,
        channel: "",
      };
    },
  },
};
</script>
