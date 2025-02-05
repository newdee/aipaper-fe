<template>
  <div class="title-input-wrapper" @click.stop>
    <div style="position: relative">
      <div class="titleTip">
        <i class="el-icon-warning"></i>
        <span>不知道怎么选题？只需要输入要求，点击AI推荐题目！</span>
      </div>
      <div @click="toggleDropdown" class="recomBtn" icon="el-icon-guide">
        <span class="starSpan">
          <img src="@/assets/images/index/icon_32_star.png" alt="" />
        </span>
        AI推荐论文题目
      </div>
      <el-input
        v-model="innerValue"
        maxlength="60"
        placeholder="输入5~50字论文题目，如果不知道写什么，可以填写想法关键词后，使用AI推荐哦~"
        @focus="showDropdown = true"
      >
      </el-input>
    </div>

    <div v-if="showDropdown" class="title-dropdown" @click.stop>
      <div class="info-section">
        <div class="sectionTitle">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAV5JREFUOE9jZMAELAwMDO0MDAwKDAwMNQwMDDexqIELMWKRjAiwE17ubSPEkNp2ewMDA0MgqQYk1KfIzU/wFmdQDDx9gIGBwXFADXjBwMCwA+oCEL0S3TXoYcDBwMBQXZ8iV1MaKc5w9CxIPwMDExsXQ8WMpwxnb3zZw8DAMIOBgWEtzCBkAzhYmBjO22kyaLjbyzEUhIkzfPv0CayOi4+P4enTtwx333IxpLXf/nP/+U9VBgaGByA5ZANsrNUZDs9MZWAQlpFjkFCQZ/j37x/EBUxMDF8/fmDg5hdgSGy+ybBg6ytQwIICGMUAHnYWhtuz0xkkQC4Qk5PHGvj4DABp0OBmZ9i/sUVOwtmWPAPAhvByMe3f1q8jYaPPj+EKQi6AaQAbsmuSroSFDh+KIcQaANLk4GEhuH/7BB2yDVBwMOK/v3+aHtkGyDAwMBzGkQ8iGRgYTqBHI748g1MOAOOTdRF13MzUAAAAAElFTkSuQmCC"
            alt=""
          />
          输入内容后再点击推荐，结果更精准哦~
        </div>
        <div class="info-item">
          <div class="info-title">选择科目</div>
          <div class="info-title">选择论文语言</div>
          <div class="info-title">选择论文类型</div>
        </div>
        <div class="arrow">
          <i class="el-icon-right"></i>
        </div>
        <div class="info-item">
          <div class="info-title">题目相关信息</div>
          <div class="info-content">
            <div>输入您的想法关键词</div>
          </div>
        </div>
        <div class="arrow">
          <i class="el-icon-right"></i>
        </div>
        <div class="info-item">
          <div class="info-title">生成题目</div>
          <div class="info-content">
            <div>趋势贴合度分析<br />500亿文献对比</div>
          </div>
        </div>
      </div>
      <div class="recommendation-section">
        <div class="recommendation-header">
          智能推荐标题
          <p><i class="el-icon-warning-outline"></i>点击题目确认</p>
        </div>
        <div v-loading="loading" class="recommendation-content">
          <div
            v-for="(recommendation, index) in recommendations"
            :key="index"
            type="primary"
            class="recommendation-item"
            @click="selectRecommendation(recommendation)"
          >
            <div class="itemParen">
              {{ recommendation }}
            </div>
            <div class="itemBtn">
              <i class="el-icon-circle-plus-outline"></i>
              <span style="margin-left: 3px">采纳</span>
            </div>
          </div>
        </div>
        <div class="generate-button">
          <el-button type="text" size="mini" @click="getList"
            >不满意? 换一组</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { title_recommend } from "@/api/paper";
export default {
  name: "TitleInputWithRecommendations",
  props: {
    value: {
      type: String,
      default: "",
    },
    requestForm: {
      type: Object,
      default: "",
    },
  },
  data() {
    return {
      innerValue: this.value,
      loading: false,
      showDropdown: false,
      recommendations: [
        "用自然辩证法看待科技创新",
        "磁电耦合传感器的微弱磁场测量及实时检测研究",
        "集成微流通道的微波/红外隐身超材料吸波器研究",
      ],
    };
  },
  watch: {
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = true;
      this.getList();
    },
    getList() {
      Ming(this.requestForm);
      let data = {
        language: this.requestForm.language,
        field: this.requestForm.field[0],
        type: this.requestForm.type,
        user_idea: this.requestForm.title,
      };
      this.loading = true;
      title_recommend(data)
        .then((res) => {
          this.loading = false;
          Ming(res);
          this.recommendations = res.result;
        })
        .catch((err) => {});
    },
    selectRecommendation(recommendation) {
      this.innerValue = recommendation;
      this.showDropdown = false;
    },

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style lang="scss" scoped>
.title-input-wrapper {
  position: relative;
}

.title-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 10000;
  border-radius: 5px;
  padding: 20px;
}

.info-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(#f0f8ff, #f2f2ff);
  padding: 10px 30px;
  border-radius: 8px;
  margin-bottom: 10px;
  padding-top: 60px;
  padding-bottom: 20px;
  position: relative;
  .sectionTitle {
    position: absolute;
    font-size: 13px;
    font-weight: bold;
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}

.info-item {
  text-align: center;
  width: 25%;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.info-title {
  font-weight: bold;
  margin-bottom: 5px;
  background: linear-gradient(
    270deg,
    rgba(84, 125, 255, 0),
    #eaefff 34%,
    #eaefff 68%,
    rgba(84, 125, 255, 0)
  );
}

.info-content {
  color: #606266;
}

.arrow {
  /* background-color: #dcdfe6; */
  font-size: 18px;
  margin: 0 10px;
  color: #999;
}

.recommendation-section {
  padding: 10px;
}

.recommendation-header {
  font-weight: bold;
  font-size: 14px;
  color: #f56c6c;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: #909399;
    font-weight: 200;
    font-size: 12px;
    left: 100px;
  }
}

.recommendation-content {
  display: flex;
  flex-direction: column;
}

.recommendation-item {
  padding: 5px 0;
  cursor: pointer;
  color: #606266;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f6f7f7;
  width: 66%;
  height: 30px;
  padding-right: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  .itemBtn {
    font-size: 13px;
    color: #547dff;
    margin-left: 6px;
    display: none;
  }
  .itemParen {
    // flex: 1;
    width: calc(100% - 63px);
  }
  .itemParen {
    height: 28px;
    padding: 0 14px;
    width: 380px;
    color: #2b2f36;
    flex: 1;
    font-size: 13px;
    line-height: 30px;
    color: #547dff;
    margin-left: 6px;
    // display: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 13px;
    color: #2b2f36;
    cursor: pointer;
  }
  &:hover {
    cursor: pointer;
    // color: #409eff;
    // background-color: #409eff;
    background-color: rgba(64, 158, 255, 0.1);
    // color: #fff;
    .itemBtn {
      display: block;
    }
  }
}

.generate-button {
  text-align: right;
  margin-top: 10px;
}
.recomBtn {
  position: absolute;
  width: 135px;
  height: 32px;
  background: #f4f4fe;
  border-radius: 6px 6px 6px 6px;
  text-align: center;
  line-height: 32px;
  font-weight: 400;
  color: #fff;
  right: 3px;
  z-index: 2;
  top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: PingFangSC-SNaNpxibold;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  letter-spacing: 0;
  background: url("../../../../assets/images/index/btn_aiznmt.png") no-repeat 0
    0 / 100% 100%;
  cursor: pointer;

  .starSpan {
    display: inline-block;
    width: 32px;
    height: 32px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &:hover {
    .g-svg-icon {
      color: #fff;
    }
  }
}
.g-svg-icon {
  font-size: 20x;
  color: #3355ff;
  margin-right: 5px;
}
.titleTip {
  width: 340px;
  height: 32px;
  background: #0066ff1a;
  border-radius: 8px 12px 0 8px;
  position: absolute;
  top: -32px;
  left: 0px;
  padding-left: 10px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #0066ff;
  line-height: 32px;
  span {
    font-size: 12px;
    margin-left: 8px;
  }
}
</style>
