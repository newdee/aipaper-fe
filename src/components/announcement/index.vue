<template>
  <div>
    <!-- 公告管理 -->

    <el-dialog
      title="公告"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleDialogClose"
    >
      <span
        >尊敬的用户，近期请求过多导致服务过载了一小段时间，为了表达歉意，我们为您准备了补偿礼包，请添加客服微信领取。</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Announcement",
  data() {
    return {
      dialogVisible: false,
      announcementKey: "announcement_seen", // localStorage key
      startDate: new Date("2024-12-12"), // 公告开始日期
    };
  },
  created() {
    this.checkAnnouncement();
  },
  methods: {
    checkAnnouncement() {
      const currentDate = new Date();
      const seen = localStorage.getItem(this.announcementKey);

      // 判断当前日期是否在三天以内
      const isWithinThreeDays =
        currentDate >= this.startDate &&
        currentDate <=
          new Date(this.startDate.getTime() + 3 * 24 * 60 * 60 * 1000);

      // 如果在三天内并且用户没有看过弹窗，就显示弹窗
      if (isWithinThreeDays && !seen) {
        this.dialogVisible = true;
      }
    },
    handleDialogClose() {
      // 弹窗关闭时，记录用户已经看过
      localStorage.setItem(this.announcementKey, "true");
    },
  },
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
