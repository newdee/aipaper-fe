<template>
  <el-dialog
    title="新增优惠券"
    :visible.sync="visible"
    width="30%"
    @close="handleClose"
  >
    <el-form :model="couponForm" ref="couponForm">
      <el-form-item
        label="优惠折扣"
        :rules="[
          { required: true, message: '请输入优惠折扣', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="couponForm.discount"
          placeholder="请输入优惠折扣"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="过期时间"
        :rules="[
          { required: true, message: '请选择过期时间', trigger: 'change' },
        ]"
      >
        <el-date-picker
          v-model="couponForm.expiryDate"
          type="date"
          placeholder="请选择过期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        label="优惠券数量"
        :rules="[
          { required: true, message: '请输入优惠券数量', trigger: 'blur' },
        ]"
      >
        <el-input-number
          v-model="couponForm.quantity"
          :min="1"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
        discount: "",
        expiryDate: "",
        quantity: 1,
      },
    };
  },
  methods: {
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
        discount: "",
        expiryDate: "",
        quantity: 1,
      };
    },
  },
};
</script>
