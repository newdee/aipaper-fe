<template>
  <div class="input-card">
    <div class="chat" id="chat" @click="copyF"></div>

    <div class="input-card-item">
      <transition name="el-fade-in-linear">
        <span
          v-show="breakSpanStatus"
          class="breakRequestSpan"
          @click="breakSend"
        >
          <i class="el-icon-refresh"></i>
          中断回答
        </span>
      </transition>

      <input
        v-model="text"
        placeholder="输入开始对话..."
        type="text"
        @keyup.enter="send()"
        @keyup="removeSEkg()"
        style="border-radius: 10px; color: floralwhite"
      />

      <el-button
        type="primary"
        :disabled="text.length <= 0"
        class="baseSendBtn"
        id="message"
        plain
        :loading="loading"
        @click="send()"
        >发送
      </el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import marked from "marked";
import Vue from "vue";
import Item from "@/components/copy.vue";
export default {
  name: "Index",
  components: {},
  computed: {},
  data: function () {
    return {
      visible: false,
      loading: false,
      text: "",
      uuid_str: "",
      sendCount: 0,
      breakSpanStatus: false,
      connectStatus: true,
    };
  },
  created() {},
  mounted() {},
  methods: {
    copyF(even) {
      // console.log('复制',even )
      // console.log('复制',even.target.id )
      // console.log('复制',document.getElementById(even.target.id) )
      // console.log('复制',document.getElementById("s"+even.target.id).innerText )
      let content = document.getElementById("s" + even.target.id).innerText;
      const textarea = document.createElement("textarea"); // 创建文本域对象
      textarea.value = content; // 设置复制内容
      document.body.appendChild(textarea); // 添加临时实例
      textarea.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(textarea); // 删除临时实例
      this.$notify({
        message: "复制成功",
        type: "success",
      });
    },
    appendIcon(answerID) {
      var Profile = Vue.extend({
        template: `
          <div>
            <el-tooltip class="item" effect="dark" content="复制回答" placement="bottom">
              <span class="copyBtn  ">
                <i  id="id${answerID}" class="el-icon-document-copy elicon"></i>
              </span>
            </el-tooltip>
          </div>
              `,
      });
      // 创建 Profile 实例，并挂载到一个元素上。
      return new Profile().$mount("#id" + answerID + "");
    },
    btnClick() {
      alert("点击按钮触发当时vue实例成功");
    },
    removeSEkg() {
      if (this.text.length) {
        while (this.text.startsWith(" ") || this.text.startsWith("　")) {
          this.text = this.text.substr(1, this.text.length);
        }
      }
    },
    async setHtml(text, uuid_str) {
      let content = document.getElementById("sid" + uuid_str);
      // content.innerHTML = marked(text);
      console.log("text", text);
      marked.setOptions({
        headerIds: false,
        async: false,
        baseUrl: null,
        breaks: false,
        extensions: null,
        gfm: true,
        headerPrefix: "",
        highlight: null,
        hooks: null,
        langPrefix: "language-",
        mangle: false,
        pedantic: false,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartypants: false,
        tokenizer: null,
        walkTokens: null,
        xhtml: false,
      });
      content.innerHTML = marked.parse(text);
    },
    async setText(text, uuid_str) {
      let content = document.getElementById("sid" + uuid_str);
      // content.innerHTML = marked(text);
      marked.setOptions({
        headerIds: false,
        async: false,
        baseUrl: null,
        breaks: false,
        extensions: null,
        gfm: true,
        headerPrefix: "",
        highlight: null,
        hooks: null,
        langPrefix: "language-",
        mangle: false,
        pedantic: false,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartypants: false,
        tokenizer: null,
        walkTokens: null,
        xhtml: false,
      });
      content.innerHTML = marked.parse(text);
    },
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      let uuid = s.join("");
      return uuid;
    },
    breakSend() {
      this.connectStatus = false;
    },
    send() {
      this.connectStatus = true;

      if (!(this.roles.includes("admin") || this.roles.includes("vip"))) {
        this.$message({
          type: "warning",
          message: ` 因GPT-4成本高昂,需开通使用，详见菜单<GPT4开通流程>,3.5版本永久免费！`,
        });
        return false;
      }

      //获取用户的头像
      var avatar = this.$store.getters.avatar;
      avatar =
        avatar == "" || avatar == null
          ? require("@/assets/images/profile.png")
          : avatar;

      if (this.loading) {
        return;
      }
      if (this.text == "") {
        return;
      }
      this.loading = true;
      let chat = document.getElementById("chat");
      let sse;
      this.sendCount++;
      if (!this.uuid_str) {
        this.uuid_str = this.uuid();
      }
      let answerID = this.uuid_str + this.sendCount;

      // const eventSource = new EventSourcePolyfill('http://localhost:8080/chat?message=' + this.text, {
      const eventSource = new EventSourcePolyfill(
        "https://www.wandou.online/gpt4chat?message=" +
          encodeURIComponent(this.text),
        {
          headers: {
            uid: this.uuid_str,
          },
        }
      );

      eventSource.onopen = (event) => {
        // let pic = "https://www.wandou.online" + avatar;
        // let textTemp = '<img src="' + pic + '" style="width: 20px; height: auto; margin-right: 15px;">' + this.text;
        // console.log("onopen", event.readyState, event.target);
        sse = event.target;
        // chat.innerHTML += "<dd class='atarDd'>" + textTemp + "</dd>";
        //新增答案框
        // chat.innerHTML += '<dd class="markdown-body">&nbsp;<article id="' + answerID + '"></article></dd>';

        chat.innerHTML += `
          <dd class='atarDd' >
            <img src="https://www.wandou.online${avatar}" style="width: 20px; height: auto; margin-right: 15px;position: relative;top: 4px;"> ${this.text}
          </dd>
          <dd class="markdown-body">
            &nbsp;
            <article id="sid${answerID}"></article>
            <span id="id${answerID}"></span>
          </dd>
          `;
        this.text = "";

        this.setHtml("...", answerID);
        chat.scrollTop = chat.scrollHeight;
      };

      let resText = "";
      eventSource.onmessage = (event) => {
        this.breakSpanStatus = true;
        if (event.data == "[DONE]" || !this.connectStatus) {
          resText = "";
          if (sse) {
            sse.close();
          }
          this.loading = false;
          this.appendIcon(answerID);
          this.breakSpanStatus = false;

          return;
        }
        let json_data = JSON.parse(event.data);
        if (json_data.content == null || json_data.content == "null") {
          json_data.content = "";
          return;
        }
        resText = resText + json_data.content;
        this.setText(resText, answerID);

        if (resText.length < 7 || resText.length % 100 == 0) {
          chat.scrollTop = chat.scrollHeight;
        }
      };
      eventSource.onerror = (event) => {
        alert("服务异常请重试并联系开发者！");
        this.loading = false;
        if (event.readyState === EventSource.CLOSED) {
          console.log("connection is closed");
        } else {
          console.log("Error occured", event);
        }
        event.target.close();
      };
      eventSource.addEventListener("customEventName", (event) => {
        console.log("Message id is " + event.lastEventId);
      });
    },
  },
};
</script>

<style lang="scss">
.elicon {
  position: relative;
  left: -10px;
}

@import "@/style/chart4.scss";
</style>
