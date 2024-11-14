<template>
  <div :class="device == 'mobile' ? 'ifooterMain' : 'pfooterMain'">
    <div :class="device == 'mobile' ? 'input-card-item scalple' : 'input-card-item'">
      <transition v-if="gptStatus == 4" name="el-fade-in-linear">
        <span v-show="breakSpanStatus" class="breakRequestSpan" @click="breakSend">
          <i class="el-icon-video-pause"></i>
          中断回答
        </span>
      </transition>
      <!-- <transition name="el-fade-in-linear">
        <span v-show="!breakSpanStatus" class="breakRequestSpan" @click="refreshSend">
          <i class="el-icon-refresh"></i>
          刷新回答
        </span>
      </transition> -->
       <input  v-model.trim="text" placeholder="输入开始对话..." type="text" @keyup.enter="send()" />
      <!-- <input v-if="device == 'mobile'" v-model.trim="text" placeholder="输入开始对话..." type="text" @keyup.enter="send()" />

      <el-input v-else type="textarea" :autosize="{ minRows: 1, maxRows: 3}" class="textMin"
        @keydown.enter.native="carriageReturn()" placeholder="请输入内容" v-model="text"></el-input> -->
      <el-button type="primary" :disabled="text.length <= 0
        " class="baseSendBtn" id="message" plain :loading="loading" @click="send()">发送
      </el-button>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  export default {
    props: {
      "breakSpanStatus": {
        type: Boolean,
        require: true
      },
      "loading": {
        type: Boolean,
        require: true
      },
      "gptStatus": {
        type: Number,
        require: true,
        default: 3
      },
    },
    data() {
      return {
        text: '',
      }
    },
    computed: {
      ...mapState({
        device: state => state.app.device,
      }),
    },
    methods: {
      breakSend() {
        this.$emit('childBreakSend')

      },
      clearText() {
        this.text = ""

      },
      carriageReturn(event) {
        //TODO: 用来触发回车, 启用将无法回车换行,现有功能,回车请求, shift + enter换行

        // let e = window.event || arguments[0];
        // console.log(e,e.keyCode)
        // if (e.key == "Enter" || e.code == "Enter" || e.keyCode == 13) {
        // e.returnValue = false;
        this.send();
        return false;
        // }
      },
      send() {
        this.$emit('childSend', this.text)
      },
    }
  }

</script>
<style lang="scss">
  @import "@/style/chart4.scss";

  .scalple {
    // transform: scaleY(0.5); /* 缩小到原来的50% */
    // transform: scale(2, 0.5);
    height: 30px;
    padding: 0 15px;
    font-size: 15px;

    &>input {
      font-size: 15px !important;
      height: 30px !important;
    }

    .breakRequestSpan {

      font-size: 15px;
    }

    .baseSendBtn {
      font-size: 15px;
      width: 80px;

      span,
      i {
        font-size: 15px;
        position: relative;
        top: -3px;
      }
    }
  }

  .ifooterMain {
    height: 15px;
  }

  .pfooterMain {
    height: 50px;
  }

</style>
