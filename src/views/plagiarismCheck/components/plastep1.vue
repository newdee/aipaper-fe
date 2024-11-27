<template>
  <div class="mainContentSec bgWhite">
    <!-- 页面名称 -->
    <div class="plaCheckHeader">
      <div
        :class="{ plaItem: true, activeItem: activeItem == index }"
        v-for="(item, index) in paperList"
        :key="index + 'pla'"
        @click="selectItem(index, item)"
      >
        <div class="activeIcon">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAWCAYAAACcy/8iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERERERjIxQUIwNzgxMUVBOEQyRUI5QTM4NDQzRjRBQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERERERjIxQkIwNzgxMUVBOEQyRUI5QTM4NDQzRjRBQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRERERGMjE4QjA3ODExRUE4RDJFQjlBMzg0NDNGNEFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRERERGMjE5QjA3ODExRUE4RDJFQjlBMzg0NDNGNEFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TeyztgAAAMJJREFUeNpiZLOuYsAC2IA4AIotgVgKKjbkAQsWsUAg7gJiFYZhCJiQ2MxA3AnE64arZ9E93AbEZQzDHMA8HDISPAvzMKgw6mcYIQDk4VAglhlJHg5gGEEA5GHTkeZhiZHmYfaR5mGGkebhHyPIv/9BHv43gjz8gmm49IKIBMeYcPSYhivYMJIKradAvHokebgQiH+OFA93g2J3pNTDU4G4ciQ0PO5Ae4I5QPwXJjicSujf0ILpLBCvhybhX+iKAAIMALbmGe1e8B6KAAAAAElFTkSuQmCC"
            alt=""
          />
          <span>已选中</span>
        </div>
        <p class="plaTitle">{{ item.name }}</p>
        <p class="plaPrice">
          <span v-if="item.unit == 0"> 1篇 </span>
          <span v-else> {{ item.sellingPrice }} 元/ {{ item.unit }} 字 </span>
        </p>
        <div class="plaBottom">
          <p>期刊论文专用</p>
        </div>
      </div>
    </div>
    <!-- form -->
    <div class="formCon">
      <el-form
        v-loading="fileLoading"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章题目" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="文章作者" prop="autor">
          <el-input v-model="ruleForm.autor"></el-input>
        </el-form-item>

        <el-form-item label="提交方式" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox
              label="单篇上传"
              name="file"
              value="file"
            ></el-checkbox>
            <el-checkbox
              label="文本粘贴"
              name="content"
              value="content"
            ></el-checkbox>
          </el-checkbox-group>
          <div class="fileUpload">
            <el-upload
              class="upload-demo"
              action="##"
              drag
              :http-request="customUploadRequest"
              :before-upload="beforeUpload"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <div class="uploadDesc">
              <li>支持的格式：txt,doc,docx,pdf</li>
              <li>pdf格式不稳定，容易乱码，请确认后再提交</li>
              <li>文档中不得包含批注</li>
              <li>文档大小不超过30M</li>
            </div>
            <div class="uploadIntro">
              计费方式：
              <span class="red">
                <b v-if="currentItem.unit == 0"> 1篇 </b>
                <b v-else>
                  {{ currentItem.sellingPrice }} 元/ {{ currentItem.unit }} 字
                </b>
              </span>
              <p v-if="paperDetail.word_nums > 0">
                当前输入:
                <span class="red">{{ paperDetail.word_nums }}字</span> 应付金额:
                <span class="red">{{ paperDetail.pay_amount }}元</span>
              </p>
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            下一步
          </el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import { product, pre_create, passOrder } from "@/api/paper";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "plastep1",
  data() {
    return {
      // 定义变量
      headerList: [
        {
          name: "期刊版",
        },
      ],
      fileLoading: false,
      ruleForm: {
        name: "",
        autor: "",
        type: "file",
      },
      activeItem: 0,
      rules: {
        name: [
          { required: true, message: "请输入文章名称", trigger: "blur" },
          {
            min: 5,
            max: 50,
            message: "长度在 5 到 50 个字符",
            trigger: "blur",
          },
        ],
        autor: [
          { required: true, message: "请输入文章名称", trigger: "blur" },
          {
            min: 5,
            max: 50,
            message: "长度在 5 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
      paperList: [],
      currentItem: {},
      fileBackKey: "",
      loading: true,
      expired: false,
      lastFetchTime: null,
      intervalId: null,
      paperDetail: {
        word_nums: 0,
        pay_amount: 0,
      },
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // zhuge.track(`用户查看大纲`, {
    //   大纲标题: row.title,
    //   大纲key: row.key1,
    // });
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
    this.getList();
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  computed: {
    // 计算属性
  },
  methods: {
    fetchData() {
      this.loading = true;
      let data = {
        fileBackKey: this.fileBackKey,
      };
      passOrder(data).then((res) => {
        console.log("res", res);
        if (res.result.api_file_parse_status == 0) {
          clearInterval(this.intervalId);
          this.paperDetail.pay_amount = res.result.pay_amount;
          this.paperDetail.word_nums = res.result.word_nums;
        }
        // if(res)
      });
    },
    checkExpiration() {
      if (this.lastFetchTime) {
        const now = new Date();
        const diff = (now - this.lastFetchTime) / 1000; // Difference in seconds
        if (diff > 120) {
          // 120 seconds = 2 minutes
          this.fileLoading = false;
          this.expired = true;
          clearInterval(this.intervalId);
          this.fileLoading = false;

          this.$message("已超时");
        }
      }
    },
    beforeUpload(file) {
      // 需要先填写名字及坐着
      const isTxtDocDocxPdf = [
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
      ].includes(file.type);
      const isLt30M = file.size / 1024 / 1024 < 30;

      if (!isTxtDocDocxPdf) {
        this.$message.error("上传文件只能是 txt, doc, docx, pdf 格式!");
      }
      if (!isLt30M) {
        this.$message.error("上传文件大小不能超过 30MB!");
      }
      return isTxtDocDocxPdf && isLt30M;
    },
    customUploadRequest({ file }) {
      this.fileLoading = true;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jane_name", this.currentItem.janeName);

      pre_create(formData)
        .then((response) => {
          this.$message.success("上传成功");
          console.log(response);
          this.fileBackKey = response.result;
          // 开启轮询
          // this.intervalId = setInterval(this.fetchData, 5000);
          this.intervalId = setInterval(() => {
            this.fetchData();
            this.checkExpiration();
          }, 5000);
        })
        .catch((error) => {
          this.$message.error("上传失败");
          console.error(error);
        });
    },
    selectItem(index, item) {
      this.activeItem = index;
      this.currentItem = item;
    },
    getList() {
      product().then((res) => {
        this.$log(res);
        this.paperList = res.result;
        this.currentItem = res.result[0];
      });
    },
    // 定义方法
    submitForm(formName) {
      this.$emit("stepNext", 2);

      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     // alert('submit!');
      //     this.$emit("stepNext", 2);
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
// @import "@/styles/variables.scss";
// @import "@/styles/mediaMain.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
// @media only screen and (max-width: 768px) {
// }
.plaItem {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  display: inline-block;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../../../assets/images/bg/system-bg.png");
  width: 180px;
  height: 98px;
  text-align: center;
  position: relative;
  margin: 9px;
  padding-top: 15px;
}
.activeIcon {
  display: none;
}
.plaTitle {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  text-align: center;
  color: #0c368a;
  font-size: 16px;
  font-weight: bold;
  margin: 0px 0px 5px 0px;
}
.plaPrice {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  text-align: center;
  font-size: 14px;
  color: #666;
  margin: 0px 0px 14px 0px;
}
.plaBottom {
  --totl-primary-background: rgba(255, 255, 255, 0.8);
  --totl-primary-font-color: #000;
  --totl-primate-font-descolor: #565656;
  text-align: center;
  height: 32%;
  margin: 1px;
  box-sizing: border-box;
  font-size: 12px;
  color: #063b7a;
  background: #deedff;
  line-height: 30px;
}
.activeIcon {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 60px;
  height: 22px;
  font-style: normal;
  color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: absolute;
    height: 100%;
    width: 100%;
    color: #fff;
    left: 0;
    top: 7px;
  }
}
.bgWhite {
  background: #fff;
}
.formCon {
  margin-top: 40px;
}
.fileUpload {
  display: flex;
  position: relative;
  .uploadIntro {
    position: absolute;
    display: flex;
    bottom: -20px;
    left: 0;
  }
  .red {
    color: #f56c6c;
  }
}
.activeItem {
  .activeIcon {
    display: block;
  }
  .plaBottom {
    --totl-primary-background: rgba(255, 255, 255, 0.8);
    --totl-primary-font-color: #000;
    --totl-primate-font-descolor: #565656;
    text-align: center;
    height: 32%;
    margin: 1px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 30px;
    background: #0c368a;
    color: #fff;
  }
  border: 1px solid #0c368a;
}
</style>
