<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div
        v-for="(msg, index) in chatMessages"
        :key="index"
        :class="['message', msg.type]"
      >
        <div
          c
          :class="[
            'infoList',
            msg.type == 'user' ? 'userTitle' : 'answerTitle',
          ]"
        >
          <template v-if="msg.type == 'user'">
            <span class="userInfo">
              <i class="el-icon-s-custom"></i>
            </span>
          </template>
          <!-- <div v-html="renderMarkdown(msg.text)"></div> -->
          <div v-html="renderMarkdown(msg.text)"></div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input
        v-model="message"
        placeholder="请输入您的问题"
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">
        <i class="el-icon-search"></i>
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getToken } from "@/utils/auth";
import { marked } from "marked";
import hljs from "highlight.js";
// import "highlight.js/styles/magula.css";

import "highlight.js/styles/atom-one-dark.css"; // 确保路径和样式名称正确

export default {
  data() {
    return {
      message: "",
      chatMessages: [],
      token: getToken(),
      sseSource: null,
      reconnectInterval: 5000,
    };
  },
  mounted() {
    this.establishConnection();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    renderMarkdown(text) {
      marked.setOptions({
        highlight: function (code, lang) {
          // 确保语言是有效的，如果不是则默认为 'plaintext'
          const validLanguage = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(validLanguage, code).value;
        },
      });
      return marked.parse(text);
    },
    establishConnection() {
      const url = `/chat-api/createSse?token=${encodeURIComponent(this.token)}`;

      this.sseSource = new EventSource(url);

      let currentMessage = "";

      this.sseSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          currentMessage = "";
        } else {
          try {
            const parsedData = JSON.parse(event.data);
            if (parsedData.content) {
              currentMessage += parsedData.content;

              if (
                this.chatMessages.length &&
                this.chatMessages[this.chatMessages.length - 1].type ===
                  "response"
              ) {
                this.chatMessages[this.chatMessages.length - 1].text =
                  currentMessage;
              } else {
                this.chatMessages.push({
                  text: currentMessage,
                  type: "response",
                });
              }
            }
          } catch (error) {
            console.error("Error parsing SSE data:", error);
          }
        }
      };

      this.sseSource.onerror = () => {
        console.error("SSE Error: attempting to reconnect");
        this.sseSource.close();
        setTimeout(this.establishConnection, this.reconnectInterval);
      };
    },
    sendMessage() {
      if (!this.message.trim()) return;

      this.chatMessages.push({ text: this.message, type: "user" });

      const url = `/chat-api/chat?token=${encodeURIComponent(this.token)}`;

      axios
        .post(
          url,
          { msg: this.message },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log("Message sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          this.$message({
            type: "error",
            message: "请求失败,请重试!",
          });
          if (error.response && error.response.status === 401) {
            this.token = getToken();
            this.sendMessage();
          }
        });

      this.message = "";
    },
    scrollToBottom() {
      const container = this.$el.querySelector(".chat-messages");
      container.scrollTop = container.scrollHeight;
    },
  },
  beforeDestroy() {
    if (this.sseSource) {
      this.sseSource.close();
    }
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  background-color: #fff; /* Dark background */
  color: #e0e0e0; /* Light text color */
  position: relative;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 1000px;
}

.message.user {
  background-color: #d1e7dd; /* Slightly lighter for user messages */
  align-self: flex-start;
  color: #000;
}

.message.response {
  background-color: rgba(
    255,
    243,
    205,
    0.5
  ); /* Slightly darker for responses */
  color: #000;
  align-self: flex-end;
}

.userInfo {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #3e3f4b;
  color: #fff;
  margin-right: 10px;
}
.infoList {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  line-height: 22px;
}
.userTitle {
  font-size: 16px;
}
.chat-input {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  padding: 10px;
  background-color: #f5f5f5; /* Light background color */
  margin: 10px;
  height: 56px;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 12px 24px -16px rgba(54, 54, 73, 0.04),
    0 12px 40px 0 rgba(51, 51, 71, 0.08), 0 0 1px 0 rgba(44, 44, 54, 0.02);
  box-sizing: border-box;
  position: relative;
  border: 1px solid #fff;
}

.chat-input input {
  flex: 1;
  padding: 10px 15px;
  border-radius: 30px;
  border: none;
  background-color: #fff; /* White background */
  color: #333; /* Dark text color */
  outline: none;
  margin-right: 10px;
  font-size: 14px;
  border: 1px solid #fff;
}
.chat-input:hover {
  border-color: #35f;
}
.chat-input button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #d8d8d8; /* Light gray button background */
  color: #666; /* Icon color */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: background-color 0.3s;
}

.chat-input:hover button {
  background-color: #35f; /* Darker gray on hover */
  color: #fff;
}

/deep/ pre {
  background-color: #2d2d2d !important;
  color: #cccccc !important;
  padding: 10px !important;
  border-radius: 5px !important;
  overflow-x: auto !important;
}
pre {
  background-color: #2d2d2d !important;
  color: #cccccc !important;
  padding: 10px !important;
  border-radius: 5px !important;
  overflow-x: auto !important;
}
</style>
