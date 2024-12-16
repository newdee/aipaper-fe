<template>
  <div>
    <div class="workItem" @click="triggerFileUpload">
      <i class="el-icon-paperclip"></i>
    </div>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleUploadFile"
    />
  </div>
</template>

<script>
import { uploadFile } from "@/api/gpt";

export default {
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    async handleUploadFile(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await uploadFile(formData);
        console.log("resp", response);

        if (response.code === 200) {
          const resultData = {
            fileName: file.name,
            result: response.result,
          };
          this.$emit("changeFile", resultData);
        } else {
          console.error("上传失败:", response.message);
        }
      } catch (error) {
        console.error("请求错误:", error);
      } finally {
        // 重置文件输入的值
        this.$refs.fileInput.value = "";
      }
    },
  },
};
</script>

<style scoped>
.workItem {
  cursor: pointer;
}
</style>
