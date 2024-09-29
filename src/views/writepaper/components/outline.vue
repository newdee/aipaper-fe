<template>
  <div class="outlineMain">
    <!-- 页面名称 -->
    <div class="outlineTab">
      <div class="outLeft">
        <p
          @click="checkoutPaper(1)"
          :class="['outLeftTitle', index == 1 ? 'activeLT' : '']"
        >
          万象专业版
          <span class="underLeft"></span>
        </p>
        <p
          @click="checkoutPaper(2)"
          :class="['outLeftTitle', 'paperClass', index == 2 ? 'activeLT' : '']"
        >
          万象学术版
          <span class="underLeft"></span>
        </p>
      </div>
      <div class="outRight g_poin">
        <p>范文样例</p>
      </div>
    </div>
    <!-- 用户输入页面 -->
    <div class="uesrInputBox">
      <div class="selectLang formItem">
        <p class="formItemLabel">生成语言</p>
        <div class="formItemCon">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 论文类型 -->
      <div class="selectLang formItem">
        <p class="formItemLabel">论文类型</p>
        <div class="formItemCon">
          <el-radio-group v-model="requestForm.radio">
            <el-radio
              v-for="item in homeData.category_list"
              :key="item.name"
              :label="item.name"
              >{{ item.name }}({{ item.description }})
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 科目与题目 -->
      <div class="selectLang formItem">
        <p class="formItemLabel">科目与题目</p>
        <div class="formItemCon">
          <el-cascader
            placeholder="请选择科目"
            v-model="requestForm.selectValue"
            :options="homeData.subject_list"
            :props="carProp"
            @change="handleChange"
          >
          </el-cascader>
          <div class="userInputCon">
            <el-input
              v-model="requestForm.title"
              maxlength="50"
              show-word-limit
              placeholder="请输入完整题目，题目越完整大纲越准确"
            ></el-input>
          </div>
        </div>
      </div>
      <!-- 三级大纲 -->
      <div class="selectLang formItem">
        <p class="formItemLabel">
          三级大纲
          <span class="switchBox">
            <el-switch v-model="requestForm.threeCon" active-text="开启">
            </el-switch>
          </span>
        </p>
      </div>
      <!-- 生成大纲 -->
      <div class="outlineBtn">
        <p>生成大纲</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";
import { getHomeInfo } from "@/api/user";

export default {
  name: "outline",
  data() {
    return {
      // 定义变量
      requestForm: {
        title: "",
        threeCon: "",
        radio: "",
        selectValue: "",
      },
      index: 1,
      carProp: {
        value: "code",
        label: "name",
        children: "subcategories",
        expandTrigger: "hover",
      },
      options: [
        {
          value: "简体中文",
          label: "简体中文",
        },
        {
          value: "英文",
          label: "英文",
        },
        {
          value: "德语",
          label: "德语",
        },
        {
          value: "法语",
          label: "法语",
        },
        {
          value: "西班牙语",
          label: "西班牙语",
        },
      ],
      value: "简体中文",
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
  computed: {
    // 计算属性
    ...mapGetters(["homeData"]),
  },
  methods: {
    // 定义方法
    handleChange(value) {
      console.log(value);
    },
    checkoutPaper(val) {
      this.index = val;
      console.log("homeData", this.homeData);
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.outlineMain {
  max-width: 1200px;
  height: 769px;
  background: #ffffff;
  border-radius: 0px 0px 12px 12px;
  margin-bottom: 20px;
}
.outlineTab {
  width: 100%;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  padding: 0 40px;
  .outLeft {
    display: flex;
    align-items: center;
  }
  .outLeftTitle {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    margin-right: 40px;
    font-size: 22px;
    color: #000000;
    line-height: 30px;
    text-align: left;
    font-style: normal;
    position: relative;
  }
  .paperClass {
    @include center-content(22px);
  }
  .activeLT {
    span {
      position: absolute;
      bottom: -10px;
      right: 0;
      left: 0;
      width: 110px;
      height: 4px;
      background: #3355ff;
    }
  }
}
.outRight {
  width: 117px;
  height: 40px;
  background: #3355ff;
  border-radius: 20px;
  line-height: 40px;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  font-style: normal;
}
.formItem {
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
  .formItemLabel {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #000000;
    display: flex;
    line-height: 25px;
    text-align: left;
    font-style: normal;
  }
  .formItemCon {
    margin-top: 25px;
    display: flex;
    width: 100%;
    align-items: center;
  }
  .switchBox {
    margin-left: 26px;
  }
  .userInputCon {
    margin-left: 16px;
    max-width: 670px;
    flex: 1;
  }
}
.outlineBtn {
  width: auto;
  height: 44px;
  background: #3355ff;
  border-radius: 24px;
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #ffffff;
  margin-left: 40px;
}
</style>
