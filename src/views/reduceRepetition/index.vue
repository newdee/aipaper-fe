<template>
  <div class="reduceRepetiton">
    <header class="center">
      <h1>智能降重、降AIGC率</h1>
      <h1>只需一键，既可降低重复率，也可降低AIGC率</h1>
    </header>
    <div class="edit flex">
      <div class="edit-1">
        <el-input
          type="textarea"
          :rows="15"
          placeholder="请输入文章段落，待降重、待降AIGC率均可，每次最多1000字"
          maxlength="1000"
          show-word-limit
          v-model="textareaIn"
          :autosize="{ minRows: 7 }"
        >
        </el-input>
      </div>
      <div class="edit-2 flex align-center">
        <el-button type="primary" round
          >降低重复率
          <span class="edTwoIcon">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-a-icondanxiangjiantou1"></use>
            </svg>
          </span>
        </el-button>
        <el-button type="primary" round
          >降低AIGC率
          <span class="edTwoIcon">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-a-icondanxiangjiantou1"></use>
            </svg>
          </span>
        </el-button>
        <el-radio-group v-model="language">
          <el-radio :label="'zh'">中文</el-radio>
          <el-radio :label="'en'">英文</el-radio>
        </el-radio-group>
      </div>
      <div class="edit-3">
        <!-- <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="textareaOut">
                </el-input> -->
        <textarea readonly v-model="textareaOut" placeholder=''></textarea>
        <div class="absolute" v-if="!textareaOut">
            请在左侧输入待降重复率、或待降AIGC率的文章段落，点击“一键降”按钮，稍等片刻，成品会显示在这里
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      logo: require("@/assets/images/logo_paper.png"),
      drawer: false,
      direction: "rtl", //抽屉方向
      language: "zh",
      textareaIn: "",
      textareaOut: "",
    };
  },
  computed: {},
  methods: {},
};
</script>



<style lang="scss" scoped>
@import "@/styles/variables.scss";

.center {
  text-align: center;
}

header.center h1:first-child {
  font-size: 30px;
  line-height: 2em;
  margin-top: 2em;
}

header.center h1:last-child {
  font-size: 18px;
  font-weight: 400;
}

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
  padding: 0 30px;
  margin-top: 30px;
}

.edit-1,
.edit-3 {
  flex: 1 1 0%;
  height: auto;
  font-size: 14px;
}

.edit-2 {
  justify-content: center;
}

.edit-2 .el-button {
  width: 125px;
  margin: 0 10px 15px 10px;
}

.edit-2 .el-radio-group {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.edit-2 .el-radio {
  margin-right: 0px;
}

.edit-3 {
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  position: relative;
}

.edit-3 >>> .el-textarea textarea.el-textarea__inner {
  border: none;
}

.edit-3 textarea {
  border: none;
  outline: none;
  /*边线不显示*/
  resize: none;
  /*禁止拉伸*/
  appearance: none;
  width: 100%;
  height: 100%;
  background: transparent;
  padding: 5px 15px;
}
.edTwoIcon {
  // font-size: 20px;
  color: red;
}
.edit-3 .absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    color: #999;
    user-select: none;
}
</style>