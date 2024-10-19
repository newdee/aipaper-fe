<template>
  <div class="reduceRepetiton">
    <swiper-one class="topSwiper"></swiper-one>
    <div class="outlineTab">
      <div class="outLeft">
        <p
          @click="checkoutPaper(1)"
          :class="['outLeftTitle', activeIndex == 1 ? 'activeLT' : '']"
        >
          降低重复率
          <span class="underLeft"></span>
        </p>
        <p
          @click="checkoutPaper(2)"
          :class="['outLeftTitle', activeIndex == 2 ? 'activeLT' : '']"
        >
          降低AIGC率
          <span class="underLeft"></span>
        </p>
      </div>
    </div>
    <div class="edit flex">
      <div class="edit-1">
        <el-input
          type="textarea"
          :rows="15"
          :placeholder="placeText[activeIndex - 1]"
          maxlength="1000"
          show-word-limit
          v-model="textareaIn"
          resize="false"
          :autosize="{ minRows: 7 }"
        >
        </el-input>
        <div class="btns">
          <el-button for="reduceRR" v-if="activeIndex == 1" type="primary" round
            >开始生成</el-button
          >
          <el-button
            for="reduceAIGC"
            v-if="activeIndex == 2"
            type="primary"
            round
            >开始生成</el-button
          >
        </div>
      </div>
      <!-- <div class="edit-2 flex align-center">
        <el-button type="primary" round>降低重复率
          <span class="edTwoIcon">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-a-icondanxiangjiantou1"></use>
            </svg>
          </span>
        </el-button>
        <el-button type="primary" round>降低AIGC率
          <span class="edTwoIcon">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-a-icondanxiangjiantou1"></use>
            </svg>
          </span>
        </el-button>
      </div> -->
      <div class="edit-3">
        <textarea
          readonly
          v-model="textareaOut"
          :placeholder="reduceText[activeIndex - 1]"
        ></textarea>
        <div class="btns">
          <el-button for="copyRes" type="primary" round>复制结果</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiperOne from "@/views/writepaper/components/swiperOne.vue";

export default {
  name: "reduceRepetition",
  components: {
    swiperOne,
  },
  data() {
    return {
      logo: require("@/assets/images/logo_paper.png"),
      drawer: false,
      direction: "rtl", //抽屉方向
      textareaIn: "",
      textareaOut: "",
      activeIndex: 1,
      placeText: [
        "请输入文章段落，待降重均可，每次最多1000字",
        "请输入文章段落，待降AIGC率，每次最多1000字",
      ],
      reduceText: [
        "请在左侧输入待降重复率的文章段落，点击“开始生成”按钮，稍等片刻，成品会显示在这里",
        "请在左侧输入待降AIGC率的文章段落，点击“开始生成”按钮，稍等片刻，成品会显示在这里",
      ],
    };
  },
  computed: {},
  methods: {
    checkoutPaper(val) {
      this.activeIndex = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.reduceRepetiton {
  position: relative;
  border-top: 1px solid transparent;
}

.reduceRepetiton::before {
  position: absolute;
  z-index: -1;
  content: "";
  display: block;
  width: 100%;
  min-width: 400px;
  height: 300px;
  top: 0px;
  left: 0px;
  background-image: radial-gradient(
    circle at 0% -230%,
    #e4f4fe 30%,
    transparent 55%
  );
}

.flex {
  display: flex;
}

.flex.align-center {
  flex-direction: column;
  align-items: center;
}

.edit {
  width: 100%;
  gap: 16px;
  padding-bottom: 16px;
  flex-wrap: wrap;

  > div {
    background: #fff;
    border-radius: 12px;
    padding: 35px 35px 75px;
    flex: 1 1 0%;
    height: auto;
    font-size: 14px;
    position: relative;
    min-width: 300px;
    min-height: 280px;

    &::v-deep .el-textarea textarea.el-textarea__inner {
      resize: none;
      border: none;
      padding: 0px;
      font-size: 16px;

      &::placeholder {
        color: #999;
        font-size: 16px;
      }
    }

    textarea {
      border: none;
      outline: none;
      /*边线不显示*/
      resize: none;
      /*禁止拉伸*/
      appearance: none;
      width: 100%;
      background: transparent;
      padding: 0px;
      font-size: 16px;

      &::placeholder {
        color: #999;
        font-size: 16px;
      }
    }

    .btns {
      width: 100%;
      text-align: right;
      padding-top: 10px;
      position: absolute;
      bottom: 30px;
      right: 30px;

      button {
        width: 116px;
        height: 40px;
        background: #3355ff;
        border-radius: 20px;
      }
    }
  }
}

// .edit-2 {
//   justify-content: center;
// }

// .edit-2 .el-button {
//   width: 125px;
//   margin: 0 10px 15px 10px;
// }

// .edit-2 .el-radio-group {
//   display: flex;
//   width: 100%;
//   justify-content: space-evenly;
// }

// .edit-2 .el-radio {
//   margin-right: 0px;
// }
// .edTwoIcon {
//   // font-size: 20px;
//   color: red;
// }

.topSwiper ::v-deep .sliderImgBox img {
  width: 100%;
  height: 100%;
}

.topSwiper ::v-deep .swiperBox {
  margin-top: 0px;
}

.outlineMain {
  max-width: 1200px;
  padding-bottom: 40px;
  background: #ffffff;
  border-radius: 0px 0px 12px 12px;
}

.outlineTab {
  width: 100%;
  height: 96px;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  margin-top: 16px;
  margin-bottom: 16px;

  .outLeft {
    display: flex;
    align-items: center;
  }

  .outLeftTitle {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
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
    font-weight: 600;

    span {
      position: absolute;
      bottom: -10px;
      right: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #3355ff;
    }
  }
}
</style>
