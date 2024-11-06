<template>
  <div class="wrapper">
    <div class="topBar">
      <i class="el-icon-arrow-left" @click="goBack"></i>
      账号设置
    </div>
    <div class="userInfoBox">
      <!-- 页面名称 -->
      <div class="info">
        <div class="info_left imgBox">
          <!-- <span class="userNameIcon">{{ user.name.slice(0,1) }}</span> -->
          <img
            class="userNameIcon"
            v-if="userInfo.photo"
            :src="userInfo.photo"
            alt=""
          />
          <img class="userNameIcon" v-else :src="avatar" alt="" />
          <div class="imgEdit" @click="dialogVisible = true">编辑</div>
        </div>
        <div class="info_right"></div>
      </div>
      <div class="info">
        <div class="info_left">
          <p class="infoLabel">用户名</p>
          <p class="InfoValue">{{ name }}</p>
        </div>
        <div class="info_right">
          <el-button @click="$devf">编辑</el-button>
        </div>
      </div>
      <div class="info">
        <div class="info_left">
          <p class="infoLabel">手机号</p>
          <p class="InfoValue">{{ userInfo.phone }}</p>
        </div>
        <div class="info_right">
          <el-button @click="$devf">编辑</el-button>
        </div>
      </div>
      <div class="info">
        <div class="info_left">
          <p class="infoLabel">密码</p>
          <p class="InfoValue">******</p>
        </div>
        <div class="info_right">
          <el-button @click="$devf">编辑</el-button>
        </div>
      </div>
      <div class="info">
        <el-button @click="loginOut">退出登录</el-button>
      </div>
    </div>
    <el-dialog
      title="编辑头像"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="uploadImg"
    >
      <div class="imgEditBox">
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="true" :src="avatar" class="avatar" />
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>支持jpg、jpeg、png格式的图片，大小不超过2M</p>
        </div>
        <div class="preView">
          <div class="imgPre">
            <img v-if="true" :src="avatar" class="avatar" />
          </div>
          <p>头像预览</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
import { getToken, removeToken } from "@/utils/auth"; // get token from cookie

export default {
  name: "UserInfo",
  data() {
    return {
      // 定义变量
      dialogVisible: false,
      imageUrl: "",
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // 页面初始化
  },

  computed: {
    ...mapGetters(["avatar", "name", "userInfo"]),
  },
  methods: {
    // 定义方法
    goBack() {
      // 使用 history.back() 方法返回上一页
      history.back();
    },
    loginOut() {
      removeToken();
      this.$router.push("/home");
      // location.reload();
    },
    uploadImg() {
      console.log("91---", "上传图片");
    },
    handleSuccess(res, file) {
      this.$message.success("上传成功!");
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleError(err, file, fileList) {
      this.$message.error("上传失败!");
    },
    beforeAvatarUpload(file) {
      const isImage = ["image/jpeg", "image/jpg", "image/png"].includes(
        file.type
      );
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error("上传头像图片只能是 JPG、JPEG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
* p {
  margin: 0px;
}

.wrapper .topBar {
  line-height: 3em;
  padding: 0 2em;
  border-bottom: 1px solid #0000001f;
  user-select: none;
}

.wrapper .topBar i {
  margin-right: 20px;
}

.userInfoBox {
  min-width: 400px;
  max-width: 600px;
  margin: 0 auto;
  // background: rgb(136, 134, 134);
  padding: 20px 0;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #0000001f;
  padding: 10px;
}

.info:first-child {
  border-bottom: 0px;
}

.info:last-child {
  border-bottom: 0px;
  padding: 20px 0;
}
.imgBox {
  position: relative;
  overflow: hidden;
  border-radius: 25px;
  cursor: pointer;
}
.info_left .userNameIcon {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  background: pink;
  color: #fff;
}

.info_left .infoLabel {
  line-height: 2em;
  font-size: 16px;
  color: #000;
}

.info_left .InfoValue {
  line-height: 2em;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
.imgEdit {
  display: none;
}
.info_left:hover .imgEdit {
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #00000099;
  line-height: 50px;
  font-size: 14px;
  color: #fff;
  text-align: center;
}
// 上传头像
.imgEditBox {
  display: top;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
}
.upload {
  flex: none;
}
.imgbox {
}
.avatar-uploader {
  display: inline-block;
  width: 300px;
  height: 300px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader ::v-deep .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 298px;
  height: 298px;
  line-height: 298px;
  text-align: center;
}
.avatar {
  width: 298px;
  height: 298px;
  display: block;
}
.preView {
  flex: none;
  color: #2f2e3f;
  opacity: 0.65;
  font-size: 14px;
  line-height: 19px;
  width: 70px;
  text-align: center;
}
.imgPre {
  width: 70px;
  height: 70px;
  background: #f1f1f5;
  border-radius: 35px;
  overflow: hidden;
  margin: 10px 0;
}
</style>
