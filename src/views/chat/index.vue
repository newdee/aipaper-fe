<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div
        v-for="(msg, index) in chatMessages"
        :key="index"
        :class="['message', msg.type]"
      >
        <div
          :class="[
            'infoList',
            msg.type == 'user' ? 'userTitle' : 'answerTitle',
          ]"
        >
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
    this.addCopyAndToggleListeners();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    renderMarkdown(text) {
      const renderer = new marked.Renderer();
      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language)
          ? language
          : "plaintext";
        const highlighted = hljs.highlight(validLanguage, code).value;

        return `
          <div class="code-block">
            <div class="code-header">
              <span class="language-label">${validLanguage.toUpperCase()}</span>
              <button class="toggle-btn">⌄</button>
              <button class="copy-btn">⧉</button>
            </div>
            <pre><code class="language-${validLanguage}">${highlighted}</code></pre>
          </div>
        `;
      };

      marked.setOptions({
        renderer,
        highlight: (code, lang) => {
          const validLanguage = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(validLanguage, code).value;
        },
        gfm: true,
        langPrefix: "language-",
        mangle: false,
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
    addCopyAndToggleListeners() {
      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("copy-btn")) {
          const code = event.target
            .closest(".code-block")
            .querySelector("code").textContent;
          navigator.clipboard.writeText(code).then(() => {
            alert("代码已复制！");
          });
        }

        if (event.target.classList.contains("toggle-btn")) {
          const pre = event.target.closest(".code-block").querySelector("pre");
          pre.style.display = pre.style.display === "none" ? "block" : "none";
          event.target.textContent = pre.style.display === "none" ? "⌄" : "⌃";
        }
      });
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
  background-color: #fff;
  color: #e0e0e0;
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
  background-color: #d1e7dd;
  align-self: flex-start;
  color: #000;
}

.message.response {
  background-color: rgba(255, 243, 205, 0.5);
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
  background-color: #f5f5f5;
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
  background-color: #fff;
  color: #333;
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
  background-color: #d8d8d8;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: background-color 0.3s;
}

.chat-input:hover button {
  background-color: #35f;
  color: #fff;
}

.code-block {
  position: relative;
  border: 1px solid #333;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #2d2d2d;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #444;
  padding: 5px 10px;
  color: #ccc;
  font-size: 12px;
}

.language-label {
  font-weight: bold;
  color: #ffcc00;
}

.copy-btn,
.toggle-btn {
  margin-left: 5px;
  padding: 3px 8px;
  border: none;
  background-color: transparent;
  color: #ccc;
  cursor: pointer;
  border-radius: 3px;
  font-size: 14px;
}

.copy-btn:hover,
.toggle-btn:hover {
  color: #fff;
}

pre {
  margin: 0;
  padding: 10px;
  background-color: #2d2d2d !important;
  color: #cccccc !important;
  border-radius: 5px !important;
  overflow-x: auto !important;
}
</style>
